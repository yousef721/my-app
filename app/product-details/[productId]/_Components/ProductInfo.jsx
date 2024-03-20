import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import SkeltonProductInfo from "./SkeltonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "@/app/_Context/cartContext";
import cartApis from "@/app/_utils/cartApis";
;

const ProductInfo = ({ productDetails }) => {
  const router = useRouter();
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const handelAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: productDetails.id,
        },
      };
      cartApis.addToCart(data).then((res) => {
        setCart((oldCart) => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            products: res?.data?.data?.products,
          },
        ]);
      });
    }
  };

  return (
    <>
      {productDetails.id ? (
        <div>
          <h1 className="text-[20px]">{productDetails?.attributes?.title}</h1>
          <h2 className="text-[15px] text-gray-400">
            {productDetails?.attributes?.category}
          </h2>
          <p className="text-[15px] mt-5">
            {productDetails?.attributes?.description[0]?.children[0]?.text}
          </p>
          <h5 className="text-[11px] text-gray-500 flex gap-2 items-center mt-1">
            {productDetails?.attributes?.instantDelivery ? (
              <BadgeCheck className="w-5 h-5 text-green-500" />
            ) : (
              <AlertOctagon />
            )}
            Eligible For Instant Delivery
          </h5>
          <span className="text-[30px] text-primary">
            ${productDetails?.attributes?.price}
          </span>
          <button
            onClick={() => handelAddToCart()}
            className="flex gap-2 bg-primary text-white rounded-lg hover:bg-primary_hover px-4 py-3 items-center"
          >
            <ShoppingCart /> Add To Cart
          </button>
        </div>
      ) : (
        <SkeltonProductInfo />
      )}
    </>
  );
};

export default ProductInfo;
