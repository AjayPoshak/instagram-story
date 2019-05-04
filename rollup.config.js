import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-css-only'

export default {
  input: './src/index.js',
  output: [
    {
      file: 'dist/cjs/story.js',
      format: 'cjs',
    }, {
      file: 'dist/esm/story.js',
      format: 'esm',
    }],
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    css({ output: 'dist/cjs/App.css' }),
  ],
}
