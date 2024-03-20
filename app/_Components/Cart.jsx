import React, { useContext, useEffect } from "react";
import { CartContext } from "../_Context/cartContext";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  return (
    <div className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md border shadow-sm absolute right-20 top-[60px] overflow-auto p-4">
      <div className="space-y-6">
        <ul className="space-y-4">
          {cart?.map((item) => (
            <li className="flex items-center gap-4">
              <Image
                src={item?.product?.attributes?.banner?.data?.attributes?.url}
                alt="product-banner"
                width={60}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">
                  {item?.product?.attributes?.title}
                </h3>
                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Category:</dt>
                    <dd className="inline">
                      {item?.product?.attributes?.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline">
                      {item?.product?.attributes?.price}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 text-center">
        <Link
          href="/cart"
          className="block rounded bg-gray-700 px-5 py-3 mt-5 text-sm text-gray-100 transition hover:bg-gray-600"
        >
          View my cart ({cart.length})
        </Link>

        <a
          href="#"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Continue shopping
        </a>
      </div>
    </div>
  );
};

export default Cart;
