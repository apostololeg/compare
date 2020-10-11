// import { nodeResolve } from '@rollup/plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import optimizeJs from 'rollup-plugin-optimize-js';

const isProduction = !process.env.ROLLUP_WATCH;
const plugins = [];

if (isProduction) {
  plugins.push(
    buble(),
    uglify({
      compress: {
        negate_iife: false, // not required, similar optimization
        // omitted for brevity
      },
    }),
    optimizeJs() // occurs after uglify
  );
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'index.js',
      format: 'umd',
      name: 'compare',
    },
    plugins,
  },
];
