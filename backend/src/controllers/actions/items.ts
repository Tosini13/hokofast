import Item from "../../models/item";
import { Id } from "../../models/utils";

export const getWorkspaceItems = async (workspaceId: Id) =>
  await Item.find({ workspace: workspaceId });

export const getCategoryItems = async (workspacesId: Id[], categoryId: Id) =>
  await Item.find({ workspace: { $in: workspacesId }, category: categoryId });

export const getCategoryAndWorkspaceItems = async (
  workspaceId: Id,
  categoryId: Id
) => await Item.find({ workspace: workspaceId, category: categoryId });

export const getWorkspacesItems = async (workspacesId: Id[]) =>
  await Item.find({ workspace: { $in: workspacesId } });
