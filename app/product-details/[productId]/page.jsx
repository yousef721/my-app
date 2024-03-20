"use client";

import { usePathname } from "next/navigation";
import ProductBanner from "./_Components/ProductBanner";
import ProductInfo from "./_Components/ProductInfo";
import { useEffect, useState } from "react";
import productApis from "@/app/_utils/productApis";
import BreadCrumb from "@/app/_Components/BreadCrumb";
import ProductList from "@/app/_Components/ProductList";

const ProductDetails = ({ params }) => {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductById_();
  }, [params?.productId]);

  const getProductById_ = () => {
    productApis.getProductById(params.productId).then((res) => {
      setProductDetails(res.data.data);
      getProductByCategory_(res.data.data);
    });
  };

  const getProductByCategory_ = (product) => {
    productApis
      .getProductByCategory(product?.attributes?.category)
      .then((res) => {
        setProductList(res.data.data);
      });
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6">
      <BreadCrumb path={path} title={productDetails?.attributes?.title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 mt-4 items-center">
        <ProductBanner productDetails={productDetails} />
        <ProductInfo productDetails={productDetails} />
      </div>
      <div>
        <h2 className="mt-10 mb-5 text-lg">Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default ProductDetails;
