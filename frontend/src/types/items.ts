import { Id } from "./utils";

export type TItem = {
  id: Id;
  name: string;
  taken: boolean;
  qty?: string;
  workspace: Id;
  category?: Id;
};
