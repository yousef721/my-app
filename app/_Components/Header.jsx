"use client";
import { Biohazard, ShoppingBag } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../_Context/cartContext";
import cartApis from "../_utils/cartApis";
import Cart from "./Cart";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes("sign-in"));
  });
  useEffect(() => {
    user && getCartItems();
  }, [user]);

  const getCartItems = () => {
    cartApis
      .getUserCartItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        res?.data?.data.forEach((cartItem) => {
          setCart((oldCart) => {
            if (!Array.isArray(oldCart)) {
              // If oldCart is not an array, initialize it as an empty array
              oldCart = [];
            }
            return [
              ...oldCart,
              {
                id: cartItem?.id,
                product: cartItem?.attributes?.products?.data[0],
              },
            ];
          });
        });
      });
  };
  return (
    !isLoggedIn && (
      <header className="bg-white shadow-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Biohazard className="text-primary" size={40} strokeWidth={3} />
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Explore
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Projects
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary_hover"
                    href="/sign-in"
                  >
                    Login
                  </a>

                  <a
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-primary_hover sm:block"
                    href="#"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <>
                  <div
                    className="flex items-center cursor-pointer gap-1"
                    onClick={() => setOpenCart(!openCart)}
                  >
                    <ShoppingBag />({cart?.length})
                  </div>
                  <UserButton />
                  {openCart && <Cart />}
                </>
              )}

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
