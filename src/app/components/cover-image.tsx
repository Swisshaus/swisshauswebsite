import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className="shadow-sm w-full h-full object-cover"
      width={1300}
      height={630}
      style={{
        objectPosition: 'center',
      }}
    />
  );
  
  // We're returning just the image without a link since the whole card is clickable now
  return (
    <div className="sm:mx-0 h-full">
      {image}
    </div>
  );
};

export default CoverImage;

