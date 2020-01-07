declare module 'environment' {
  import baseEnv from 'environments/base';
  const value: ReturnType<typeof baseEnv>;

  export default value;
}
