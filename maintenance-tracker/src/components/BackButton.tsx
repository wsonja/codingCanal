import Link from 'next/link';

const BackButton = () => {
  return (
    <div className="absolute top-6 right-6">
      <Link href="/" passHref>
        <button className="hover:opacity-80">
          <img
            src="https://cdn-icons-png.flaticon.com/512/93/93634.png" // Replace with your image path
            alt="Back to Home"
            className="w-8 h-8"
          />
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
