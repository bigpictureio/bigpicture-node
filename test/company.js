var assert = require("chai").assert;
const nock = require("nock");
const { QueuedError, NotFoundError } = require("../dist/errors");
var Company = require("../dist").default("key").Company;
var company = require("./fixtures/company.json");

describe("Calling Company API", function () {
  var mock;
  before(function () {
    mock = nock("https://company.bigpicture.io");
  });
  after(nock.cleanAll);
  afterEach(function () {
    mock.done();
  });

  it("should throw error if domain is missing", function () {
    assert.throws(Company.find, Error);
  });

  it("is able to find a company by domain", function () {
    mock.get("/v1/companies/find?domain=uber.com").reply(200, company);
    return Company.find({ domain: "uber.com" }).then(function (company) {
      return assert.isNotNull(company.id);
    });
  });

  it("should throw queue error on 202", function () {
    mock.get("/v1/companies/find?domain=uber.com").reply(202, {
      type: "async_created",
      message: "Your request has been received and is being processed.",
    });

    return Company.find({ domain: "uber.com" }).catch((err) => {
      return assert.instanceOf(err, QueuedError);
    });
  });

  it("should throw queue error on 404", function () {
    mock.get("/v1/companies/find?domain=uber.com").reply(404, {
      type: "async_created",
      message: "Your request has been received and is being processed.",
    });

    return Company.find({ domain: "uber.com" }).catch((err) => {
      return assert.instanceOf(err, NotFoundError);
    });
  });
});
