// this source file contains the rules for the clash proxy
// it is a json file converted from yaml, the original yaml file is located at https://github.com/Loyalsoldier/clash-rules
// this approach is to avoid the need to parse yaml in the worker and ensure the worker is as fast as possible and still leverage the typescript type checking

export default ['DOMAIN,clash.razord.top,DIRECT', 'DOMAIN,yacd.haishan.me,DIRECT', 'GEOIP,LAN,DIRECT', 'GEOIP,CN,DIRECT', 'MATCH,PROXY'];

export const ruleSet = {
	rules: [
		'RULE-SET,applications,DIRECT',
		'RULE-SET,private,DIRECT',
		'RULE-SET,reject,REJECT',
		'RULE-SET,icloud,DIRECT',
		'RULE-SET,apple,DIRECT',
		'RULE-SET,google,PROXY',
		'RULE-SET,proxy,PROXY',
		'RULE-SET,direct,DIRECT',
		'RULE-SET,lancidr,DIRECT',
		'RULE-SET,cncidr,DIRECT',
		'RULE-SET,telegramcidr,PROXY',
	],
	'rule-providers': {
		reject: {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt',
			path: './ruleset/reject.yaml',
			interval: 86400,
		},
		icloud: {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt',
			path: './ruleset/icloud.yaml',
			interval: 86400,
		},
		apple: {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt',
			path: './ruleset/apple.yaml',
			interval: 86400,
		},
		google: {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt',
			path: './ruleset/google.yaml',
			interval: 86400,
		},
		proxy: {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt',
			path: './ruleset/proxy.yaml',
			interval: 86400,
		},
		direct: {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt',
			path: './ruleset/direct.yaml',
			interval: 86400,
		},
		private: {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt',
			path: './ruleset/private.yaml',
			interval: 86400,
		},
		gfw: {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt',
			path: './ruleset/gfw.yaml',
			interval: 86400,
		},
		'tld-not-cn': {
			type: 'http',
			behavior: 'domain',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt',
			path: './ruleset/tld-not-cn.yaml',
			interval: 86400,
		},
		telegramcidr: {
			type: 'http',
			behavior: 'ipcidr',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt',
			path: './ruleset/telegramcidr.yaml',
			interval: 86400,
		},
		cncidr: {
			type: 'http',
			behavior: 'ipcidr',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt',
			path: './ruleset/cncidr.yaml',
			interval: 86400,
		},
		lancidr: {
			type: 'http',
			behavior: 'ipcidr',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt',
			path: './ruleset/lancidr.yaml',
			interval: 86400,
		},
		applications: {
			type: 'http',
			behavior: 'classical',
			url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt',
			path: './ruleset/applications.yaml',
			interval: 86400,
		},
	},
};
