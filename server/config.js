exports.db = {
  host: process.env.EXPERTS_DB_URL || process.env.RETHINKDB_SERVICE_HOST || 'localhost',
  port: process.env.EXPERTS_DB_PORT || process.env.RETHINKDB_SERVICE_PORT_28015_TCP || 28015,
  db: 'expertsdb',
};

exports.server = {
  host: process.env.EXPERTS_SERVER_URL || process.env.BPWJS_SERVER_SERVICE_HOST || 'localhost',
  port: process.env.EXPERTS_SERVER_PORT || process.env.BPWJS_SERVER_PORT_8080_TCP_PORT || 8080,
};

exports.client = {
  host: process.env.EXPERTS_CLIENT_URL || process.env.BPWJS_CLIENT_SERVICE_HOST || 'localhost',
  port: process.env.EXPERTS_CLIENT_PORT || process.env.BPWJS_CLIENT_PORT_9000_TCP_PORT || 3000,
};

exports.auth = {
  passwordSalt: process.env.EXPERTS_AUTH_PASS_SALT ||
    'Gq0twQYeoP6YWZY7iBc!NyhVavauPHB5Q6jPU$LMzCxw@SM&y$udLVnmF0qu!%XR',
  sessionSecret: process.env.EXPERTS_AUTH_SESS_SECRET ||
    'RGP84d%XZ$tck7TPpQ^zn#7Q$i&duxS2K!8ZR!87!9vJ2yZe@ZFqSMIvdvv4EseS',
  jwtSecret: process.env.EXPERTS_AUTH_JWT_SECRET ||
    'uaeldt!2D9iVrOv1KEH#KRuaiEdJty6rRXJij$FN&D$oYKITos14Utok6W0kt83@',
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || 'b31b524fd5e239d5dc68',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'f3406b120ca51a3c90d542f76f2e761b71f3ebb9',
    callbackURL: process.env.GITHUB_CALLBACK_URL ||
                `http://${process.env.BPWJS_SERVER_SERVICE_HOST}:${process.env.BPWJS_SERVER_PORT_8080_TCP_PORT}/api/github/callback` ||
                'http://localhost:8080/api/github/callback',
    scope: process.env.GITHUB_SCOPE || 'user:email',
  },
};
