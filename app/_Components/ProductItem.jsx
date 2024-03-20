import { List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const ProductItem = ({ product }) => {
  return (
    <Link href={`/product-details/${product?.id}`}>
      <Image
        src={product?.attributes?.banner?.data?.attributes?.url}
        alt="banner-card"
        width={400}
        height={350}
        className="rounded-t-lg h-[170px] object-cover"
      />
      <div className="p-3 bg-gray-50 rounded-b-lg flex justify-between">
        <div>
          <h2 className="text-[12px] font-medium line-clamp-1">
            {product?.attributes?.title}
          </h2>
          <h2 className="text-[10px] text-gray-400 flex item-center gap-1">
            <List className="w-4 h-4" />
            {product?.attributes?.category}
          </h2>
        </div>
        <span>${product.attributes.price}</span>
      </div>
    </Link>
  );
};

export default ProductItem;
