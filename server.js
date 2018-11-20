const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const Cookies = require('cookies');
const fetch = require('isomorphic-unfetch');

const bodyParser = require('body-parser');

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));

    const robotsOptions = {
      root: __dirname + '/static/',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
    };
    server.get('/robots.txt', (req, res) =>
      res.status(200).sendFile('robots.txt', robotsOptions),
    );

    server.get('/login', function(req, res) {
      fetchTokenWithRefresh(req, res).then(respons => {
        if (respons && respons.data && respons.data.access_token) {
          res.redirect('/');
        } else {
          res.redirect('/authfailed');
        }
      });
    });

    server.post('/api', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      handleAPIRequest(req, res).then(respons => {
        res.send(respons);
      });
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

async function handleAPIRequest(req, res) {
  const { endpoint } = req.body;

  const cookies = new Cookies(req, res);
  let karmaAccessToken = cookies.get('karmaAccessToken');

  if (endpoint === `locations`) {
    if (!karmaAccessToken) {
      return await fetchTokenWithRefresh(req, res).then(respons => {
        if (respons && respons.data && respons.data.access_token) {
          karmaAccessToken = respons.data.access_token;
          return fetchLocations(karmaAccessToken);
        }
      });
    } else {
      const locations = await fetchLocations(karmaAccessToken);
      return locations;
    }
  } else if (endpoint === `locationItems`) {
    const { location_id } = req.body;
    const locationItems = await fetchLocationItems(
      karmaAccessToken,
      location_id,
    );
    return locationItems;
  } else {
    return { status: 0 };
  }
}

async function fetchLocationItems(karmaAccessToken, location_id) {
  const url = `https://internal-api.karma.life/location/${location_id}/items`;

  const customHeaders = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-timezone': 'Europe/Stockholm',
      'x-platform': 'ios',
      'x-version': '1.8.1',
      Authorization: karmaAccessToken,
    },
  };

  const res = await fetch(url, customHeaders);
  const data = await res.json();

  return JSON.stringify(data);
}

async function fetchLocations(karmaAccessToken) {
  const url = `https://internal-api.karma.life/locations`;

  const customHeaders = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-timezone': 'Europe/Stockholm',
      'x-platform': 'ios',
      'x-version': '1.8.1',
      'x-longitude': '18.0620330572297',
      'x-latitude': '59.3462764146359',
      Authorization: karmaAccessToken,
    },
  };

  const res = await fetch(url, customHeaders);
  const locationsData = await res.json();

  /*
    Didnt fint any way for supercluser to take other name than
    lng and lat so adding that to array
  */
  locationsData.data.locations.forEach(item => {
    item.lat = item.latitude;
    item.lng = item.longitude;
  });

  return JSON.stringify(locationsData);
}

async function fetchTokenWithRefresh(req, res) {
  const url = `https://internal-api.karma.life/auth`;

  const auth = require('./auth.js');

  const postBody = auth.token;
  const customHeaders = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-timezone': 'Europe/Stockholm',
      'x-platform': 'ios',
      'x-version': '1.8.1',
    },
    body: postBody,
  };

  const response = await fetch(url, customHeaders);
  const data = await response.json();

  if (data && data.data && data.data.access_token) {
    var cookies = new Cookies(req, res);
    cookies.set('karmaAccessToken', data.data.access_token, {
      expires: new Date(Date.now() + data.data.expires_in * 1000),
      httpOnly: false,
    });
  }

  return data;
}
