var assert = require("chai").assert;
const nock = require("nock");
const { QueuedError, NotFoundError } = require("../dist/errors");
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
    mock.get("/v1/companies/ip?ip=204.4.143.118").reply(200, ip);
    return Ip.find({ ip: "204.4.143.118" }).then(function (ip) {
      return assert.isNotNull(ip.company.id);
    });
  });

  it("should throw queue error on 404", function () {
    mock.get("/v1/companies/ip?ip=204.4.143.118").reply(404, {
      type: "async_created",
      message: "Your request has been received and is being processed.",
    });

    return Ip.find({ ip: "204.4.143.118" }).catch((err) => {
      return assert.instanceOf(err, NotFoundError);
    });
  });
});
