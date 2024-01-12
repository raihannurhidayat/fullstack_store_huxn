import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";

import {
  addProduct,
  updateProductDetail,
  removeProduct,
  fetchProduct,
  fetchProductById,
  fetchAllProduct,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";

router
  .route("/")
  .get(fetchProduct)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProduct);

router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, checkId, addProductReview);

router.route("/top").get(fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetail)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
