var assert = require("chai").assert;
const nock = require("nock");
const { QueuedError, BadRequestError } = require("../dist/errors");
var Ip = require("../dist").default("key").Ip;
var ip = require("./fixtures/ip.json");

describe("Calling Ip API", function () {
  var mock;
  before(function () {
    mock = nock("https://ip.bigpicture.io");
  });
  // after(nock.cleanAll);
  afterEach(function () {
    mock.done();
  });

  it("should throw error if domain is missing", function () {
    assert.throws(Ip.find, Error);
  });

  it("is able to find a company by ip", function () {
    mock.get("/v2/companies/ip?ip=204.4.143.118").reply(200, ip);
    return Ip.find({ ip: "204.4.143.118" }).then(function (ip) {
      return assert.isNotNull(ip.company.id);
    });
  });

  it("should throw queue error on 400", function () {
    mock.get("/v2/companies/ip?ip=127.0.0.1").reply(400, {
      error: {
        type: "bad_request",
        message: "Private address 127.0.0.1",
      },
    });

    return Ip.find({ ip: "127.0.0.1" }).catch((err) => {
      return assert.instanceOf(err, BadRequestError);
    });
  });
});
