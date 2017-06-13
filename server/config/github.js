const dev = {
  id: '17f3b8efaccd2b18d390',
  secret: 'd360a97ee3a02f8fce5b32a6c6e39c146847f3d9',
};

const prod = {
  id: '24a1410d57938ac7b849',
  secret: '962dccc1a55b4aa757131712e3a9d5276cf917c3',
};

const env = 'not-dev';

module.exports = {
  CLIENT_ID: env === 'dev' ? dev.id : prod.id,
  CLIENT_SECRET: env === 'dev' ? dev.secret : prod.secret,
};
