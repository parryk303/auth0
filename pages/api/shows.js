import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function shows(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['read:shows']
    });
    const apiPort = process.env.API_PORT || 3001;
    const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const shows = await response.json();

    res.status(200).json(shows);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-yfgnkyvu.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://ssa-coral.vercel.app/api/collection',
    issuer: 'https://dev-yfgnkyvu.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);
