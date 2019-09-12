import environment from './base';

const baseApi = 'http://api.tvmaze.com';
const env = environment(baseApi);

export default {
  ...env,
  // override anything that gets added from base.
  isProduction: false,
  isDevelopment: true,
  isTesting: true,
};
