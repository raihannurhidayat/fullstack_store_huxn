import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("item Added", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2 py-0.5 rounded-full">
            {p?.brand}
          </span>
          <img
            src={p.image}
            alt={p.name}
            style={{ height: "170px", objectFit: "cover" }}
            className="cursor-pointer w-full"
          />
          <HeartIcon product={p} />
        </Link>
      </section>
      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-7 text-xl text-white">{p?.name}</h5>
          <p className="text-pink-500 font-semibold ">{p?.price}</p>
        </div>
        <div className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 60)}...
        </div>
        <section className="flex justify-between items-center">
          <Link
            className="px-3 py-2 rounded bg-pink-300"
            to={`/product/${p._id}`}
          >
            Read More
          </Link>
          <button
            className="p-2 rounded-full bg-white"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
