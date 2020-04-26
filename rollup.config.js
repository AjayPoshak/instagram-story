import babel from 'rollup-plugin-babel';
import cssbundle from 'rollup-plugin-css-bundle';

import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
		},
		{
			file: pkg.module,
			format: 'esm',
		},
	],
	external: Object.keys(pkg.peerDependencies) || {},
	plugins: [
		cssbundle(),
		babel({
			exclude: 'node_modules/**',
		}),
	],
};
