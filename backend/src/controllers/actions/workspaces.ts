import { Id } from "../../models/utils";
import Workspace from "../../models/workspace";

export const checkIfUserHasRightsToWorkspace = async (
  workspaceId: Id,
  userId: Id
) => {
  try {
    const workspace = await Workspace.findOne({ _id: workspaceId });
    if (
      workspace &&
      (workspace.author === userId || workspace.users.includes(userId))
    ) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getWorkspacesForUser = async (userId: Id) => {
  const workspaces = await Workspace.find({
    author: userId,
  }).sort({
    name: 1,
  });

  const guestWorkspaces = await Workspace.find({
    users: userId,
  }).sort({
    name: 1,
  });
  return [...workspaces, ...guestWorkspaces];
};
