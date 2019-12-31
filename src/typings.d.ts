declare module 'redux-freeze';
declare module 'lodash.groupby';

declare module 'environment' {
  import baseEnv from './environments/base';
  const value: ReturnType<typeof baseEnv>;

  export default value;
}
