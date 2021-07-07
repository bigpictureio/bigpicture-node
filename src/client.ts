import needle from "needle";
import { isNil } from "lodash";
import Company from "./company";
import Ip from "./ip";
import {
  QueuedError,
  NotFoundError,
  BadRequestError,
  UnknownError,
  RateLimitError,
} from "./errors";
const pkg = require("../package.json");

const DEFAULT_HOST = "bigpicture.io";
const TIMEOUT = 10000;

interface ClientRequestOptions {
  method: needle.NeedleHttpVerbs;
  url: string;
  body?: any;
  query?: { [key: string]: any };
  timeout?: number;
}

export class Client {
  key: string;
  host: string;
  Company: Company;
  Ip: Ip;
  QueuedError: QueuedError;

  constructor(key: string, config = {}) {
    this.key = key;
    this.host = DEFAULT_HOST;

    this.Company = new Company(this);
    this.Ip = new Ip(this);

    if (isNil(this.key)) {
      throw new Error("API key is not defined");
    }
  }

  _request(options: ClientRequestOptions) {
    var timeout = options.timeout || TIMEOUT;

    return needle(options.method, options.url, options.body || options.query, {
      timeout: timeout,
      headers: {
        Authorization: this.key,
      },
      user_agent: "BigPictureNode/v" + pkg.version,
    }).then(function (res) {
      if (res.statusCode === 200) {
        return res.body;
      } else if (res.statusCode === 202) {
        throw new QueuedError(res.body);
      } else if (res.statusCode === 404) {
        throw new NotFoundError(res.body);
      } else if (res.statusCode === 400) {
        throw new BadRequestError(res.body);
      } else if (res.statusCode === 429) {
        throw new RateLimitError(res.body);
      } else if (res.statusCode >= 500) {
        throw new UnknownError(res.body);
      }
    });
  }

  _buildUrl(subdomain: string, path: string, version: number) {
    return `https://${subdomain}.${this.host}/v${version}${path}`;
  }
}
