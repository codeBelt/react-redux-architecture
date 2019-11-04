/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function(baseApi: string) {
  return {
    route: {
      baseRoute: '',
    },
    api: {
      shows: `${baseApi}/shows/:showId`,
      episodes: `${baseApi}/shows/:showId/episodes`,
      cast: `${baseApi}/shows/:showId/cast`,
      errorExample: 'https://httpstat.us/520',
    },
    isProduction: true,
    isDevelopment: false,
  };
}
