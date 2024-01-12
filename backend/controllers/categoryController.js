import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name Is Required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: "Already Exists" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!name) res.status(500).json({ message: "Please Input Fields Name" });

    if (!category) {
      res.status(404).json({ message: "category id not found" });
    }

    category.name = name;
    const updatedCategory = await category.save();

    res.status(201).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.deleteOne({ _id: categoryId });
    res.status(201).json("deleted Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
