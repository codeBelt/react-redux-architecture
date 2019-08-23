import environment from './base';

/*
 * base.ts is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'http://api.tvmaze.com';
const env = environment(baseApi);

export default {
  ...env,
};
