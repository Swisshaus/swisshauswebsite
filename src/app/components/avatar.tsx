import Link from 'next/link';

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <Link href="/about#team" aria-label={`Visit ${name}'s profile`}>
        <img 
          src={picture} 
          className="w-12 h-12 rounded-full mr-4 hover:opacity-80 transition-opacity avatar-image" 
          alt={name} 
        />
      </Link>
      <Link 
        href="/about#team" 
        className="text-xl font-bold hover:underline hover:text-red-600 transition-colors"
      >
        {name}
      </Link>
    </div>
  );
};

export default Avatar;
