/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 */

export default function(baseApi: string) {
  return {
    api: {
      shows: `${baseApi}/shows/{showId}`,
      episodes: `${baseApi}/shows/{showId}/episodes`,
      cast: `${baseApi}/shows/{showId}/cast`,
    },
    isProduction: true,
    isDevelopment: false,
  };
}
