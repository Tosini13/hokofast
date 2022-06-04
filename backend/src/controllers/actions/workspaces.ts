import Workspace from "../../models/workspace";

export const checkIfWorkspaceExists = async (workspaceId: string) => {
  try {
    const workspace = await Workspace.find({ _id: workspaceId });
    if (workspace.length > 0) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
