/**
 * This is a Cloudflare Worker script that converts a JMS subscription link to a Clash YAML configuration.
 * The JMS subscription link should be passed as a query parameter `jms`.
 * The script fetches the JMS subscription link, decodes it, and parses the VMess and Shadowsocks links.
 * The script then generates a Clash YAML configuration with the parsed proxies and some default rules.
 * The generated Clash YAML configuration is returned as the response.
 * 
 * todo: feature to generate short links. (This requires a KV store or a database.)
 * todo: feature to provide custom rules.
 * todo: feature to provide custom proxy groups.
 * todo: feature to provide a ui to edit the generated configuration.
 */
import yaml from 'js-yaml';
import ruleSet from './rules';
import { ClashProxy, ClashYaml } from './types';


function parseVmess(vmess: string): ClashProxy {
	vmess = vmess.replace('vmess://', '');
	const decoded = atob(vmess);
	const json = JSON.parse(decoded);
	return {
		type: 'vmess',
		name: json.ps,
		server: json.add,
		port: parseInt(json.port),
		uuid: json.id,
		alterId: parseInt(json.aid),
		cipher: 'auto',
		tls: json.tls === 'none' ? false : true,
	};
}

function parseSS(ss: string): ClashProxy {
	ss = ss.replace('ss://', '');
	const [encoded, name] = ss.split('#');
	const decoded = atob(encoded);
	// split password and server delimited by @ or :
	const [cipher, password, server, port] = decoded.split(/[@:]/);
	return { cipher, password, server, port: parseInt(port), name, type: 'ss' };
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method !== 'GET') {
			return new Response('Method Not Allowed', { status: 405 });
		}
		const url = new URL(request.url);
		const searchParams = Object.fromEntries(url.searchParams.entries());

		if (!searchParams['jms']) {
			return new Response('Missing jms parameter', { status: 400 });
		}

		let jms_url = searchParams['jms'];
		for (let key in searchParams) {
			if (key !== 'jms') {
				jms_url += `&${key}=${searchParams[key]}`;
			}
		}

		const jms_response = await fetch(jms_url);
		const jms_text = await jms_response.text();
		if (!jms_response.ok) {
			return new Response(jms_text, { status: jms_response.status });
		}
		
		const jms_decoded = atob(jms_text);
		const jms_arr = jms_decoded.split('\n');
		jms_arr.forEach((line, index) => {
			if (!line.startsWith('ss://') || !line.startsWith('vmess://')) {
				return new Response(`Invalid jms format at line ${index + 1}`, { status: 400 });
			}
		});

		const proxies = jms_arr.map((line) => (line.startsWith('ss://') ? parseSS(line) : parseVmess(line)));
		const base_proxy_names = proxies.map((proxy) => proxy.name);
		const {rules, ['rule-providers']: ruleProviders} = ruleSet;
		const clashYaml: ClashYaml = {
			proxies,
			'proxy-groups': [
				{ name: 'PROXY', type: 'select', proxies: ['AUTO', ...base_proxy_names]},
				{ name: 'AUTO', type: 'url-test', proxies: base_proxy_names, url: 'http://www.gstatic.com/generate_204', interval: 300, tolerance: 1000 },
			],
			rules,
			'rule-providers': ruleProviders,
		};
		return new Response(yaml.dump(clashYaml), {
			headers: {
				'Content-Type': 'application/x-yaml',
			},
		});
	},
} satisfies ExportedHandler<Env>;
