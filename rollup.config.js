import esbuild from 'rollup-plugin-esbuild';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    'temporal-polyfill',
    '@js-temporal/polyfill',
  ],
  plugins: [
    esbuild({
      target: 'es2022',
      tsconfig: './tsconfig.json',
    }),
  ],
};
