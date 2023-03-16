import Link from 'next/link';

const Header = () => {
  return (
    <header className="my-8 font-extrabold">
      <Link href="/" className="text-xl text-orange-600">
        みかんめも
      </Link>
    </header>
  );
};

export default Header;
