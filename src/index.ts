import { Client } from "./client";

export default (key: string) => {
  return new Client(key);
};

export const BigPicture = Client;
