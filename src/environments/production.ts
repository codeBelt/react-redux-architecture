import environment, { Environment } from './base';

/*
 * base.ts is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'https://api.tvmaze.com';
const env = environment(baseApi);

const productionEnv: Environment = {
  ...env,
  route: {
    ...env.route,
    baseRoute: '/react-redux-architecture', // Fixes issue with Github Pages
  },
};

export default productionEnv;
