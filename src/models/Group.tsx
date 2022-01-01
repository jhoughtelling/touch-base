import { Contact } from "./Contact";

export type Group = {
  key: string;
  name: string;
  contacts: Array<Contact>;
};
