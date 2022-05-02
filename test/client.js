var assert = require("chai").assert;
const needle = require("needle");
const sinon = require("sinon");
const bigPicture = require("../dist").default;
const { Client } = require("../dist/client");
const pkg = require("../package.json");
const {
  QueuedError,
  NotFoundError,
  UnknownError,
  RateLimitError,
} = require("../dist/errors");
var company = require("./fixtures/company.json");

const API_KEY = "API_KEY";

function buildRequest() {
  let opts = {
    method: "get",
    url: "https://company.bigpicture.io/v1/companies/find",
    query: {
      domain: "uber.com",
    },
  };
  return opts;
}

describe("BigPicture Client", function () {
  describe("Creating client", function () {
    it("should create client", function () {
      assert.instanceOf(bigPicture(API_KEY), Client);
    });

    it("should throw an error if key not defined", function () {
      assert.throws(bigPicture, Error);
    });

    it("should set host", function () {
      assert.exists(bigPicture(API_KEY).host);
    });

    it("should build url", function () {
      let client = bigPicture(API_KEY);
      let url = client._buildUrl("company", "/companies/find", 1);
      assert.equal(url, "https://company.bigpicture.io/v1/companies/find");
    });
  });

  describe("Making requests", function () {
    const client = bigPicture(API_KEY);
    const sandbox = sinon.createSandbox();
    let opts = buildRequest();

    beforeEach(function () {
      sandbox
        .stub(needle, "request")
        .yieldsRight(null, { statusCode: 200, body: company });
    });

    afterEach(function () {
      sandbox.restore();
    });

    it("should call needle", async function () {
      let body = await client._request(opts);
      assert.isTrue(needle.request.called);
      assert.exists(body.id);
    });

    it("should call needle with correct options", async function () {
      await client._request(opts);
      let [verb, url, query, options] = needle.request.args[0];
      assert.equal(verb, opts.method);
      assert.equal(url, opts.url);
      assert.equal(query, opts.query);
      assert.equal(options.timeout, 10000);
      assert.equal(options.headers.Authorization, API_KEY);
      assert.equal(options.user_agent, `BigPictureNode/v${pkg.version}`);
    });
  });

  describe("Handling 202", function () {
    const client = bigPicture(API_KEY);
    const sandbox = sinon.createSandbox();
    let opts = buildRequest();

    beforeEach(function () {
      sandbox.stub(needle, "request").yieldsRight(null, { statusCode: 202 });
    });

    afterEach(function () {
      sandbox.restore();
    });

    it("should call needle", async function () {
      return client._request(opts).catch((err) => {
        return assert.instanceOf(err, QueuedError);
      });
    });
  });

  describe("Handling 404", function () {
    const client = bigPicture(API_KEY);
    const sandbox = sinon.createSandbox();
    let opts = buildRequest();

    beforeEach(function () {
      sandbox.stub(needle, "request").yieldsRight(null, { statusCode: 404 });
    });

    afterEach(function () {
      sandbox.restore();
    });

    it("should call needle", async function () {
      return client._request(opts).catch((err) => {
        return assert.instanceOf(err, NotFoundError);
      });
    });
  });

  describe("Handling 429", function () {
    const client = bigPicture(API_KEY);
    const sandbox = sinon.createSandbox();
    let opts = buildRequest();

    beforeEach(function () {
      sandbox.stub(needle, "request").yieldsRight(null, { statusCode: 429 });
    });

    afterEach(function () {
      sandbox.restore();
    });

    it("should call needle", async function () {
      return client._request(opts).catch((err) => {
        return assert.instanceOf(err, RateLimitError);
      });
    });
  });

  describe("Handling 500", function () {
    const client = bigPicture(API_KEY);
    const sandbox = sinon.createSandbox();
    let opts = buildRequest();

    beforeEach(function () {
      sandbox.stub(needle, "request").yieldsRight(null, { statusCode: 500 });
    });

    afterEach(function () {
      sandbox.restore();
    });

    it("should call needle", async function () {
      return client._request(opts).catch((err) => {
        return assert.instanceOf(err, UnknownError);
      });
    });
  });
});
