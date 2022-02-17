import Footer from "../components/footer";
import Product from "../components/product";
import supabase from "../lib/supabase";

import { BsTrash } from "react-icons/bs";

const Shop = (props) => {
  const Products = [
    {
      name: "Weights",
      price: 50,
      image: "https://cdn.manomano.com/images/images_products/8853268/P/21574289_1.jpg",
    },
    {
      name: "Yoga Ball",
      price: 20,
      image: "https://images.houseoffraser.co.uk/images/imgzoom/76/76141490_xxl.jpg",
    },
    {
      name: "Protein",
      price: 30,
      image: "https://images.hollandandbarrettimages.co.uk/productimages/HB/724/099183_A.jpg",
    },
    {
      name: "Gym bands",
      price: 5,
      image: "http://cdn.shopify.com/s/files/1/0728/8355/products/image_1024x.png?v=1570517775",
    },
    {
      name: "Skipping rope",
      price: 5,
      image: "https://images.sportsdirect.com/images/products/76113703_l.jpg",
    },
    {
      name: "Gym bottle",
      price: 10,
      image: "https://images.dunelm.com/30688552.jpg?$standardplayerdefault$&img404=noimagedefault",
    },
    {
      name: "Boxing gloves",
      price: 20,
      image: "https://euro.venum.com/media/catalog/product/cache/3d6373dfdbd8bf7042581a31874a0831/c/5/c54801b4d4544c299abb61162b56d244c553c13e_BG_SKULL_BLACK_SD_01.jpg",
    },
    {
      name: "Gym shirt Male",
      price: 25,
      image: "https://images.sportsdirect.com/images/products/62001020_3pl.jpg",
    },
  ];

  return (
    <div>
      <div className="bg-gray-100 flex flex-col items-center px-4 pt-20 min-h-screen h-full md:px-20 lg:pt-32">
        <div className="flex flex-col items-center relative w-full">
          <div className="w-full flex flex-col">
            <h1 className="font-bold pb-8" style={{ fontSize: 32 }}>
              SHOP
            </h1>
            <div className="w-full grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 ">
              {Products.map((product) => (
                <Product name={product.name} price={product.price} image={product.image} key={product.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 bg-gray-800 bg-opacity-50 h-screen w-screen flex justify-center ">
        <div className="absolute top-20 bg-white shadow-sm border w-11/12 lg:top-22 lg:right-0 lg:w-2/5 xl:w-1/3">
          <div className="p-4 w-full">
            <div className="flex bg-gray-50 rounded-sm">
              <div className="p-2">
                <img src="https://cdn.manomano.com/images/images_products/8853268/P/21574289_1.jpg" width={200} />
              </div>
              <div className="p-4 w-full">
                <div className="w-full">
                  <h3>Weights</h3>
                  <p>8 weighted dumbbells 10kg each</p>
                  <p className="mt-2">£10.00</p>
                </div>
                <div className="flex justify-between items-center">
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-2 block w-1/3 rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-black-800 focus:outline-none focus:ring-1 focus:ring-black-800 sm:text-sm"
                  />
                  <BsTrash className="mt-1" />
                </div>
              </div>
            </div>
          </div>
          <h2 className="pr-4 text-right">Total: £28.00</h2>
          <div className="p-4">
            <button className="items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent text-white bg-black hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black-900 flex w-full justify-center">
              Continue to payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/account/signin" } };
  }
  return { props: { user } };
}

export default Shop;
