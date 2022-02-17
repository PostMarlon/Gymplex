import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white w-full py-4 flex shadow">
      <div>
        <span className="text-black no-underline tracking-wider font-bold uppercase text-sm pl-16 ">
          <Link className="text-black no-underline tracking-wider font-bold uppercase text-sm pl-20 " href={"/shop"} passHref>
            About
          </Link>
        </span>
        <span className="text-black no-underline tracking-wider font-bold uppercase text-sm pl-16 ">
          <Link href={"/"} passHref>
            Get Help
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
