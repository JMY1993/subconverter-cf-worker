
type ClashYaml = {
	proxies: ClashProxy[];
	['proxy-groups']: {
		name: string;
		type: string;
		proxies: string[];
		url?: string;
		interval?: number;
		tolerance?: number;
	}[];
	rules: string[];
	['rule-providers']: Record<string, Record<string, string | number>>;
};

type ClashProxy = {
	name: string;
	type: string;
	server: string;
	port: number;
} & (
	| {
			type: 'vmess';
			uuid: string;
			alterId: number;
			cipher: string;
			tls: boolean;
	  }
	| {
			type: 'ss';
			password: string;
			cipher: string;
	  }
);

// type Vmess = {
// 	v?: string;
// 	ps: string;
// 	add: string;
// 	port: string;
// 	id: string;
// 	aid: string;
// 	net: string;
// 	type: string;
// 	host: string;
// 	path?: string;
// 	tls: string;
// };

// type SS = {
// 	cipher: string;
// 	password: string;
// 	server: string;
// 	port: number;
// 	name: string;
// };

export type {
    ClashYaml,
    ClashProxy,
}