import { pick } from "lodash";
import { Client } from "./client";

interface GetOptions {
  domain?: string;
  ip?: string;
  path: string;
  timeout?: number;
}

export class Base {
  _client: Client;
  api: string;
  version: number;

  constructor(client: Client) {
    this._client = client;
  }

  get(path: string, options: GetOptions) {
    let query = pick(options, ["domain", "ip", "webhookUrl", "webhookId"]);

    return this._client._request({
      method: "get",
      url: this._client._buildUrl(this.api, path, this.version),
      query: query,
      timeout: options.timeout || null,
    });
  }
}
