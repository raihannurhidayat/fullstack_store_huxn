import React from "react";
import { useGetTopPRoductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Slider from "react-slick";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopPRoductsQuery();

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, background: "black", borderRadius: "100%" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dats: false,
    infinity: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    color: "yellow",
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="error">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          d
          {...settings}
          className="text-black xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />

                <div className="flex justify-between w-[20rem]">
                  <div className="one">
                    <h2>{name}</h2>
                    <p>{price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}</p>
                    <br /> <br />
                    <p className="w-[25rem]">
                      {description.substring(0, 170)}...
                    </p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStore className="mr-2 text-black " /> Brand : {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaClock className="mr-2 text-black " /> Added :{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStar className="mr-2 text-black " /> Reviews :{" "}
                        {numReviews}
                      </h1>
                    </div>
                    <div className="two">
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStar className="mr-2 text-black" /> Rattings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaBox className="mr-2 text-black" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
