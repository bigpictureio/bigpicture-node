import assert from "assert";
import { Base } from "./base";
import { Client } from "./client";

interface IpFindParams {
  ip: string;
  timeout?: number;
}

export default class Ip extends Base {
  constructor(client: Client) {
    super(client);
    this.version = 1;
    this.api = "ip";
  }

  find(options: IpFindParams | any = {}) {
    assert(options.ip, "An ip must be provided");
    return this.get("/companies/ip", options);
  }
}
