import { eslint } from '@mkas3/eslint';

export default eslint({
  next: false,
  typescript: {
    filesTypeAware: [''],
    tsconfigPath: 'tsconfig.app.json',
    parserOptions: {
      project: ['./tsconfig.app.json'],
      tsconfigRootDir: './'
    }
  }
});
