import { Id } from "./utils";

export type TWorkspace = {
  id: Id;
  name: string;
  author: Id;
  users: Id[];
};
