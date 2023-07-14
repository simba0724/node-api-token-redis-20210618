const validator = require('../helpers/validation_schema')

const client = require('../helpers/init_redis')
const auth0Service = require('../helpers/auth0');

module.exports = {
  requesttoken: async (req, res, next) => {
    try {
      const { errors, isValid } = validator(req.body);

      if (!isValid) {
        return res.status(400).json({"data": {"error":"access_denied","error_description":"Mandatory field not provided"}});
      }

      // generate and take token
      const auth0Token = await auth0Service.generateAccessToken(req.body);

      if(auth0Token == "error") {
        return res.status(400).json({"data": {"error":"access_denied","error_description":"Unauthorized"}});
      }

      const clockTimestamp = Math.floor(Date.now() / 1000);

      let cache = JSON.stringify({
        token: {...req.body},
        data: {
          access_token: auth0Token.access_token,
          token_type: auth0Token.token_type
        }
      });

      client.SET(req.body.client_id, cache, 'EX', auth0Token.expires_in - process.env.TOKEN_EXPIRATION_DELTA, function(err, reply) {
        res.status(200).json({"data": auth0Token})
      })
    } catch (error) {
      console.log(error)
    }
  },

  flushlogin: async (req, res, next) => {
    if(!req.params.client_id){
      client.flushdb( function (err, succeeded) {
        console.log(succeeded);
        res.status(200).json({"data": {flush: "ok"}})
      });
    } else {
      client.del(req.params.client_id);
      res.status(200).json({"data": {flush: "ok"}})
    }
  }
}
