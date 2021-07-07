bigpicture-node
===============

Node library for querying the [BigPicture](https://bigpicture.io) APIs. Currently supports:

* [Company API](https://bigpicture.io/docs/api/#company-api) - Enables you to lookup company data based on a domain name.
* [IP API](https://bigpicture.io/docs/api/#ip-api) - Takes an IP address and returns the company associated with that IP, also known as IP to company

## Installation
```bash
$ npm install bigpicture-node
```

## Usage

Using ES6 modules and async/await:
```js
import BigPicture from 'bigpicture-node';
const bigPicture = BigPicture('api_key');
// or
import { Client } from 'bigpicture-node';
var bigPicture = new Client('api_key');

let Company = bigPicture.Company;
let company = await Company.find({domain: 'stripe.com'});

console.log(company);
```

Or using commonjs modules:
```js
const bigpicture = require('bigpicture-node').default('api_key');
// or
const { Client } = require('bigpicture-node');
const bigPicture = new Client('api_key');

let Company = bigPicture.Company;
Company.find({domain: 'stripe.com'})
  .then(company => console.log(company.id))
  .catch(error => console.error(error));
```

## Quering the API

### Company API

#### `Company.find(options)` -> `Promise`
  * `domain` *String*: The company domain to look up **(required)**
  * `webhookUrl` *String*: A webhook URL the results will be sent to.
  * `webhookId` *String*: An optional identifier for webhook request.
  * `stream` *Boolean*: Set to `true` to use the [streaming API](https://clearbit.com/docs?shell#streaming) instead of webhooks
  * `timeout` *Integer*: The timeout in milliseconds after which a socket closed error will be thrown.

```js
(async () => {
  let Company = bigPicture.Company;
  let company = await Company.find({domain: 'stripe.com'});

  console.log(company);
})();
```

### IP API

#### `IP.find(options)` -> `Promise`
  * `ip` *String*: The company domain to look up **(required)**
  * `timeout` *Integer*: The timeout in milliseconds after which a socket closed error will be thrown.

```js
(async () => {
  let Ip = bigPicture.Ip;
  let response = await Ip.find({ip: '204.4.143.118'});

  console.log(response);
})();
```

## Handling Errors

Your BigPicture integration might have to deal with [errors](https://bigpicture.io/docs/api/#errors) at some point when making requests to the BigPicture API. Here is how you can handle them:

```js
let Company = bigPicture.Company;
let company = await Company.find({domain: 'stripe.com'});
.catch(err => {

  switch (err.type) {
    case 'async_created':
      // Your lookup has been queued. You can then either poll the endpoint, or make another request in a few minutes once we've had some time to process the data.
      err.message; // => e.g. "Lookup queued"
      break;
    case 'rate_limit':
      // Too many requests made to the API too quickly
      break;
    case 'bad_request':
      // Invalid parameters were supplied to BigPicture's API
      break;
    case 'api_error':
      // An error occurred internally with BigPicture's API
      break;
    case 'not_found':
      // The record was not found
      break;
    default:
      // Handle any other types of unexpected errors
      break;
  }
  }
})
```

## Development

Run all the tests:
```bash
$ npm install
$ npm test
```

Run prettier:
```bash
$ npm run format
```