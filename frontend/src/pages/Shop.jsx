import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchAllCategoryQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
  setRadio
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";

const Shop = () => {
  const dispatch = useDispatch();
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
  }, [checked, radio, dispatch, priceFilter]);

  const handleBrandCLick = (brand) => {
    const productByBrand = fillteredProductQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productByBrand));
  };

  const handleCheck = (value, id) => {
    const updateChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updateChecked));
  };

  // add all brand option
  const uniqueBrands = [
    ...Array.from(
      new Set(
        fillteredProductQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-slate-300 rounded p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-slate-100 text-black rounded-full mb-2">
              Filter By Category
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.value, c._id)}
                    />
                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-black dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {/* Brands */}
            <h2 className="h4 text-center py-2 bg-slate-100 text-black rounded-full mb-2">
              Filter By Brand
            </h2>
            <div className="p-5 w-[15rem]">
              {uniqueBrands?.map((brand, index) => (
                <div key={index} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandCLick(brand)}
                    />
                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-black dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {/* price */}
            <h2 className="h4 text-center py-2 bg-slate-100 text-black rounded-full mb-2">
              Filter By Brand
            </h2>
            <div className="p-5 w-[15rem]">
              <input type="text" placeholder="Enter Price" value={priceFilter} onChange={handlePriceChange} className="w-full px-3 py-2 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
