import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchAllCategoryQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";

const Shop = () => {
  const dispatch = useDispatch;
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchAllCategoryQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const fillteredProductQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!fillteredProductQuery.isLoading) {
        // filter product based on bodth checked
        const filteredProducts = fillteredProductQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  });

  return <div>Shop</div>;
};

export default Shop;
