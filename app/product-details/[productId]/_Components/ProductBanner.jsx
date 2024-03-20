import Image from "next/image";

const ProductBanner = ({ productDetails }) => {
  return (
    <div className="m-auto">
      {productDetails?.attributes?.banner?.data.attributes?.url ? (
        <Image
          src={productDetails?.attributes?.banner?.data.attributes?.url}
          width={300}
          height={300}
          alt="product-banner"
          className="rounded-lg lg:w-[400px]"
        />
      ) : (
        <div className="w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
