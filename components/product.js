const Product = ({ image, name, price }) => (
  <div className="w-full bg-white flex flex-col justify-center items-center shadow">
    <div className="h-64 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }} />

    <div className="flex justify-center bg-gray-600 w-full text-white py-2">
      <p>
        {name} £{price}
      </p>
    </div>

    <div className="flex justify-center bg-gray-800 w-full text-white py-3.5 text-md">
      <button>Add to cart</button>
    </div>
  </div>
);

export default Product;
