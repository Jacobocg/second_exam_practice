exports.server = {
  host: process.env.EXPERTS_SERVER_URL || 'localhost',
  port: process.env.EXPERTS_SERVER_PORT || 8080,
};

exports.client = {
  port: process.env.EXPERTS_CLIENT_PORT || 3000,
};
