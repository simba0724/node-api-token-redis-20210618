const auth0Service = require('../helpers/auth0');

module.exports = async (data, res, next) => {
  	try{
	  	console.info('Generating a new Auth0 token');
	  	const auth0Token = await auth0Service.generateAccessToken(data.body);
	  	console.info('New Auth0 token generated successfully');
	  	data.body.auth0Token = auth0Token;
  		return next();
  	}catch (error) {
  		data.body.error = error.response.body;
  		return next();
  	}
};
