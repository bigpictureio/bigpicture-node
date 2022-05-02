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
  let company = await Company.find({domain: 'uber.com'});

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
    "postalCode": "94158",
    "streetName": "3Rd Street",
    "subPremise": null,
    "countryCode": "US",
    "streetNumber": "1515"
  },
  "url": "https://www.uber.com/",
  "logo": "http://logo.bigpicture.io/logo/uber.com",
  "name": "Uber Technologies",
  "tags": [
    "Mobile Apps",
    "Public Transportation",
    "Ride Sharing",
    "Transportation"
  ],
  "tech": ["google_analytics", "wordpress"],
  "type": "public",
  "phone": "1-415-801-4068",
  "domain": "uber.com",
  "ticker": "UBER",
  "metrics": {
    "raised": 2400000000,
    "employees": 22200,
    "marketCap": 86561472512,
    "alexaUsRank": 680,
    "annualRevenue": 10794000384,
    "fiscalYearEnd": null,
    "employeesRange": "10K+",
    "alexaGlobalRank": 1153,
    "estimatedAnnualRevenue": "$10B+"
  },
  "twitter": {
    "id": "19103481",
    "bio": "We wear masks to help protect our neighbors, our families, and our communities. Please wear a face cover or mask.\n\nNo mask. No ride.",
    "site": "http://uber.com",
    "avatar": "https://pbs.twimg.com/profile_images/1045783102000230400/TPLLaqYR_normal.jpg",
    "handle": "Uber",
    "location": "Global",
    "followers": 1053046,
    "following": 55
  },
  "category": {
    "sector": "Technology",
    "industry": "Software & Computer Services",
    "subIndustry": "Software",
    "industryGroup": "Technology"
  },
  "facebook": {
    "handle": "uber"
  },
  "linkedin": {
    "handle": "company/uber-com"
  },
  "location": "1515 3Rd Street San Francisco, CA 94158 United States of America",
  "legalName": "Uber Technologies, Inc.",
  "utcOffset": null,
  "crunchbase": {
    "handle": "organization/uber"
  },
  "description": "Uber Technologies, Inc. develops and operates proprietary technology applications in the United States, Canada, Latin America, Europe, the Middle East, Africa, and the Asia Pacific. It connects consumers with independent providers of ride services for ridesharing services and other forms of transportation services, including public transit, as well as connect riders and other consumers with restaurants, grocers, other stores, and delivery service providers for meal preparation, grocery, and other delivery services. The company operates through four segments: Mobility, Delivery, Freight, and Advanced Technologies Group (ATG) and Other Technology Programs. The Mobility segment provides products that connect consumers with mobility drivers who provide rides in a range of vehicles, such as cars, auto rickshaws, motorbikes, minibuses, or taxis. It also offers Uber for Business, financial partnerships, transit, and vehicle solutions offerings. The Delivery segment allows consumers to search for and discover local restaurants, order a meal, and either pick-up at the restaurant or have the meal delivered, as well as offers grocery and convenience store delivery, and select other goods. The Freight segment connects carriers with shippers on the company's platform and enable carriers upfront, transparent pricing, and the ability to book a shipment. The ATG and Other Technology Programs segment engages in the development and commercialization of autonomous vehicle and ridesharing technologies, as well as Uber Elevate. The company was formerly known as Ubercab, Inc. and changed its name to Uber Technologies, Inc. in February 2011. Uber Technologies, Inc. was founded in 2009 and is headquartered in San Francisco, California.",
  "foundedYear": 2009,
  "domainAliases": ["uber-adsystem.com", "eng.uber.com", "decarta.com"],
  "emailProvider": false,
  "id": "4eec624c-c1b4-43c5-9a91-c96859353ccc"
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