import Footer from "../components/footer";
import supabase from "../lib/supabase";

const Cart = (props) => {
  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col items-center">
      <div className="pb-20"></div>
      <h1>Cart</h1>
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

export default Cart;
