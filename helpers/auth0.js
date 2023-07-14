const request = require('request-promise');

exports.generateAccessToken = async (data) => {
  try{
    const response = await request({
      url: `https://auth-av.eu.auth0.com/oauth/token`,
      method: 'POST',
      json: true,
      body: {
        grant_type: data.grant_type,
        client_id: data.client_id,
        client_secret: data.client_secret,
        audience: data.audience,
      },
      headers: { 'content-type': 'application/json' },
    });

    return response;
  }catch (error) {
    // console.log(error.response.body)
    return "error";
  }
};
