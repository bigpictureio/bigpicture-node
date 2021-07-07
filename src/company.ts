import assert from "assert";
import { Base } from "./base";
import { Client } from "./client";

const TIMEOUT_STREAM = 200 * 1000; // 200 seconds

interface CompanyFindParams {
  domain: string;
  webhookUrl: string;
  webhookId?: string;
  stream?: boolean;
  timeout?: number;
}

export default class Company extends Base {
  constructor(client: Client) {
    super(client);
    this.version = 1;
    this.api = "company";
  }

  find(options: CompanyFindParams | any = {}) {
    assert(options.domain, "A domain must be provided");

    let path = "/companies/find";
    if (options.stream) {
      path = `${path}/stream`;
      options.timeout = options.timeout || TIMEOUT_STREAM;
    }

    return this.get(path, options);
  }
}
