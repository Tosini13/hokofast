import { Id } from "./utils";

export type TItem = {
  id: Id;
  name: string;
  list: Id;
  qty?: string;
};
