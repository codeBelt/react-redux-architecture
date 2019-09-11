declare module 'redux-freeze';
declare module 'lodash.groupby';

declare module 'environment' {
  const value: {
    api: {
      shows;
      episodes;
      cast;
    };
    isDevelopment: boolean;
    isProduction: boolean;
    isTesting?: boolean;
  };

  export default value;
}
