import List from "../../models/list";

export const checkIfListExists = async (listId: string) => {
  try {
    const list = await List.find({ _id: listId });
    if (list.length > 0) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
