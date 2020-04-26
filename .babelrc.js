/* if no targets are specified, @babel/preset-env
 * behaves exactly the same as @babel/preset-es2015, @babel/preset-es2016 and @babel/preset-es2017 together
 */
module.exports = {
	presets: ['@babel/preset-env', '@babel/preset-react'],
	env: {
		// Configuration for ES Modules
		esm: {
			presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
		},
	},
}