const client = require('../helpers/init_redis');

module.exports = async (req, res, next) => {
    let data = req.body

    client.get(data.client_id, function(err,token){
      if(!token) return next();
      res.status(200).json({"data": JSON.parse(token)})
    });
};
