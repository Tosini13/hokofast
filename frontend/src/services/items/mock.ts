import { TItem } from "../../types/items";
import { mockLists } from "../lists/mock";

export const mockItems: TItem[] = [
  {
    id: "1",
    list: mockLists[0].id,
    name: "Manzanas",
  },
  {
    id: "2",
    list: mockLists[0].id,
    name: "Rollos",
  },
  {
    id: "3",
    list: mockLists[0].id,
    name: "Queso",
  },
  {
    id: "3",
    list: mockLists[1].id,
    name: "Jamon",
  },
];
