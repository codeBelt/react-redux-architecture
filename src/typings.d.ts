declare module 'lodash.groupby';

declare module 'environment' {
  const value: {
    route: {
      baseRoute: string;
    };
    api: {
      shows: string;
      episodes: string;
      cast: string;
      errorExample: string;
    };
    isDevelopment: boolean;
    isProduction: boolean;
    isTesting?: boolean;
  };

  export default value;
}
