import Product from "./product";

const ShopItems = ({ Products }) => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full bg-blue-200">
      {Products.map((product) => (
        <Product name={product.name} price={product.price} image={product.image} key={product.name} />
      ))}
    </div>
  );
};

export default ShopItems;
