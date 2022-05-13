import { Id } from "./utils";

export type TItem = {
  id: Id;
  name: string;
  list: Id;
  taken: boolean;
  qty?: string;
};
