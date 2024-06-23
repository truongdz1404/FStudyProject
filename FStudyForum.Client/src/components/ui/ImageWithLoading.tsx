import React, { FC } from "react";
import { Icons } from "../Icons";

interface Props {
  src: string;
  alt?: string | undefined;
  className?: string;
}

const ImageWithLoading: FC<Props> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className}`}
        loading="lazy"
        style={{ display: !loaded ? "none" : "block" }}
      />
      <div
        className="w-full h-full animate-pulse bg-blue-gray-50"
        style={{ display: loaded ? "none" : "flex" }}
      >
        <Icons.picture className="h-10 w-10 text-gray-500 mx-auto my-auto" />
      </div>
    </>
  );
};

export default ImageWithLoading;
