import { Spinner } from "@material-tailwind/react";
import React, { FC } from "react";

interface Props {
  src: string;
  alt?: string | undefined;
  className?: string;
}

const ImageWithLoading: FC<Props> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setLoaded(true);
    };
  }, [src]);

  return (
    <div
      className={`relative ${
        loaded
          ? "w-auto h-auto"
          : `w-[${dimensions.width}px] h-[${dimensions.height}px]`
      }`}
    >
      {loaded ? (
        <img src={src} alt={alt} className={className} />
      ) : (
        <div className="absolute mt-2 inset-0 bottom-0 flex items-center justify-center">
          <Spinner className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default ImageWithLoading;
