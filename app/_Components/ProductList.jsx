import ProductItem from "./ProductItem";

const ProductList = ({ productList }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {productList.map((item) => (
        <div key={item.id} className="p-1 hover:border border-primary_hover rounded-lg hover:shadow-md">
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
