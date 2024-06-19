import ImageWithLoading from "../ui/ImageWithLoading";
import { LazyLoadImage } from "react-lazy-load-image-component";

type ImageOutputData = {
  file: { url: string; bgColor?: string; width?: number; height?: number };
  caption?: string;
  stretched?: boolean;
  withBorder?: boolean;
  withBackground?: boolean;
};

type CustomImageProps = {
  data: ImageOutputData;
};
const CustomImageOutput = ({ data }: CustomImageProps): JSX.Element => {
  return !data.withBackground ? (
    <div
      className={"w-full max-h-[28rem] rounded-md overflow-hidden relative "}
    >
      <LazyLoadImage
        src={data.file.url}
        alt={data.caption}
        className="object-contain w-full"
      />
    </div>
  ) : (
    <div
      className={`max-h-[28rem] w-full object-contain relative overflow-hidden rounded-md h-[${Math.min(
        data.file.height ?? 0,
        448
      )}px]`}
    >
      <img
        src={data.file.url}
        alt={data.caption}
        className="scale-125 absolute top-1/2 left-0 object-cover opacity-30 -translate-y-1/2 blur-xl w-full"
        loading="lazy"
      />
      <ImageWithLoading
        src={data.file.url}
        alt={data.caption}
        className={`object-contain max-h-[28rem] w-full h-full relative`}
      />
    </div>
  );
};

export default CustomImageOutput;
