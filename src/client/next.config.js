// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const nextConfig = {
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, './styles')],
    prependData: '@import "main.scss";',
  },
  publicRuntimeConfig: {
    url: process.env.BASE_URL,
  },
};
