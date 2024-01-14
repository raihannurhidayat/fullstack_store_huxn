import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-96 object-cover rounded"
        />
        {/* <HeartIcon product={product} /> */}
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              <div>{product.name}</div>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                {product.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;