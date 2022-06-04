import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Category, {
  ICategory,
  TCategory,
  TCategoryRes,
} from "../models/categories";

const getCategoryFromBody = (body: TCategory): TCategory => ({
  ...body,
});

export const convertCategory = ({
  _id,
  name,
}: LeanDocument<ICategory>): TCategoryRes => ({
  id: _id,
  name,
});

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.send(categories.map((category) => convertCategory(category)));
  } catch (e) {
    console.error(e);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await Category.create(req.body);
    const category = convertCategory(newCategory);
    res.send(category);
  } catch (e) {
    console.error(e);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    await Category.updateOne({ _id: req.params.categoryId }, req.body);
    res.send(req.body);
  } catch (e) {
    console.error(e);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await Category.findByIdAndRemove({
      _id: req.params.categoryId,
    });
    const category = convertCategory(deletedCategory);
    res.send(category);
  } catch (e) {
    console.error(e);
  }
};
