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

**Example Response**
```json
{
    "geo": {
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "stateCode": "CA",
        "postalCode": "94103",
        "streetName": "Townsend Street",
        "subPremise": null,
        "countryCode": "US",
        "streetNumber": "510"
    },
    "url": "https://stripe.com/",
    "logo": "http://logo.bigpicture.io/logo/stripe.com",
    "name": "Stripe",
    "tags": [
        "Finance",
        "FinTech",
        "Mobile Payments",
        "SaaS"
    ],
    "tech": [
        "google_analytics",
        "wordpress"
    ],
    "type": "private",
    "phone": "1-888-963-8955",
    "domain": "stripe.com",
    "ticker": null,
    "aliases": [],
    "metrics": {
        "raised": 2235000000,
        "employees": 3001,
        "marketCap": null,
        "trancoRank": 368,
        "alexaUsRank": 610,
        "annualRevenue": null,
        "fiscalYearEnd": null,
        "employeesRange": "1K-5K",
        "alexaGlobalRank": 1255,
        "estimatedAnnualRevenue": null
    },
    "twitter": {
        "id": "102812444",
        "bio": "Stripe is a global technology company that builds economic infrastructure for the internet. Status updates at @stripestatus.",
        "site": "https://stripe.com",
        "avatar": "https://pbs.twimg.com/profile_images/1422297335531376654/f0wnwzb-_normal.jpg",
        "handle": "stripe",
        "location": "San Francisco US + Dublin IE",
        "followers": 183768,
        "following": 517
    },
    "category": {
        "sector": "Financials",
        "industryGroup": "Financial Services",
        "industry": "Financial Services",
        "subIndustry": null
        
    },
    "facebook": {
        "handle": "StripeHQ"
    },
    "linkedin": {
        "handle": "company/stripe"
    },
    "location": "510 Townsend Street San Francisco, CA 94103 United States",
    "legalName": "Stripe, Inc.",
    "crunchbase": {
        "handle": "organization/stripe"
    },
    "description": "Stripe, Inc. provides payment software services and solutions. The Company designs and produces software to process online credit and debit card payments. Stripe serves customers worldwide.",
    "foundedYear": 2010,
    "domainAliases": [
        "privateultrasoundscan.org"
    ],
    "id": "fb8d47e2-5f62-4cd9-ae76-c98f844fd581",
    "emailProvider": false,
    "indexedAt": "2022-04-03T00:44:41.384Z"
}
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

**Example Response**
```json
{
  "ip": "204.4.143.118",
  "type": "business",
  "confidence": 0.95,
  "fuzzy": false,
  "countryCode": "GB",
  "company": {
    "geo": {
      "city": "New York",
      "state": "New York",
      "country": "United States of America",
      "stateCode": "NY",
      "postalCode": "10282",
      "streetName": "West Street",
      "subPremise": "29Th Floor",
      "countryCode": "US",
      "streetNumber": "200"
    },
    "url": "https://www.goldmansachs.com/",
    "logo": "http://logo.bigpicture.io/logo/goldmansachs.com",
    "name": "Goldman Sachs Group",
    "tags": ["Finance", "Financial Services", "FinTech"],
    "tech": [
      "facebook_connect",
      "facebook_custom_audiences",
      "google_analytics",
      "sizmek",
      "wordpress"
    ],
    "type": "public",
    "phone": "1-212-902-1000",
    "domain": "goldmansachs.com",
    "ticker": "GS",
    "metrics": {
      "raised": null,
      "employees": 40300,
      "marketCap": 126676885504,
      "alexaUsRank": 7345,
      "annualRevenue": 51429998592,
      "fiscalYearEnd": null,
      "employeesRange": "10K+",
      "alexaGlobalRank": 18015,
      "estimatedAnnualRevenue": "$10B+"
    },
    "twitter": {
      "id": "253167239",
      "bio": "Official Goldman Sachs Twitter account. Follow us for the latest in global and local economic progress, firm news, and thought leadership content.",
      "site": "http://www.goldmansachs.com",
      "avatar": "https://pbs.twimg.com/profile_images/1286311065966579713/JNU4bWC8_normal.png",
      "handle": "GoldmanSachs",
      "location": "",
      "followers": 844958,
      "following": 105
    },
    "category": {
      "sector": "Financials",
      "industry": "Financial Services",
      "subIndustry": null,
      "industryGroup": "Financial Services"
    },
    "facebook": {
      "handle": "goldmansachs"
    },
    "linkedin": {
      "handle": "company/goldman-sachs"
    },
    "location": "200 West Street 29Th Floor New York, NY 10282 United States of America",
    "legalName": "The Goldman Sachs Group, Inc.",
    "crunchbase": {
      "handle": "organization/gs-growth"
    },
    "description": "The Goldman Sachs Group, Inc., a financial institution, provides range of financial services for corporations, financial institutions, governments, and individuals worldwide. It operates through four segments: Investment Banking, Global Markets, Asset Management, and Consumer & Wealth Management. The company's Investment Banking segment provides financial advisory services, including strategic advisory assignments related to mergers and acquisitions, divestitures, corporate defense activities, restructurings, and spin-offs; and middle-market lending, relationship lending, and acquisition financing, as well as transaction banking services. This segment also offers underwriting services, such as equity underwriting for common and preferred stock and convertible and exchangeable securities; and debt underwriting for various types of debt instruments, including investment-grade and high-yield debt, bank and bridge loans, and emerging- and growth-market debt, as well as originates structured securities. Its Global Markets segment is involved in client execution activities for cash and derivative instruments; credit and interest rate products; and provision of equity intermediation and equity financing, clearing, settlement, and custody services, as well as mortgages, currencies, commodities, and equities related products. The company's Asset Management segment manages assets across various asset classes, including equity, fixed income, hedge funds, credit funds, private equity, real estate, currencies, and commodities; and provides customized investment advisory solutions, as well as invests in corporate, real estate, and infrastructure entities. Its Consumer & Wealth Management segment offers wealth advisory and banking services, including financial planning, investment management, deposit taking, and lending; private banking; and unsecured loans, as well as accepts saving and time deposits. The company was founded in 1869 and is headquartered in New York, New York.",
    "foundedYear": 1869,
    "domainAliases": ["frak.org", "gs.com"],
    "emailProvider": false,
    "id": "535384f0-e5f0-4a5c-9aeb-339e8304e18f"
  },
  "geo": {
    "city": "London",
    "postal": "SW1V",
    "stateCode": "ENG",
    "state": "England",
    "countryCode": "GB",
    "country": "United Kingdom",
    "continentCode": "EU",
    "continent": "Europe",
    "isEU": true,
    "lat": 51.5074,
    "lng": -0.12,
    "timeZone": "Europe/London"
  },
  "whois": {
    "domain": "ny.email.gs.com",
    "name": "The Goldman Sachs Group, Inc."
  },
  "asn": {
    "asn": "AS9084",
    "name": "European AS",
    "route": "204.4.143.0/24"
  }
}
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