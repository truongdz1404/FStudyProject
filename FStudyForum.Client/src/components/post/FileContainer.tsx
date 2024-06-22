import { Attachment } from "@/types/attachment";
import { FC } from "react";
import ImageWithLoading from "../ui/ImageWithLoading";
import { Carousel } from "@material-tailwind/react";

type Props = {
  files: Attachment[];
};

const FileContainer: FC<Props> = ({ files }) => {
  if (files.length == 0) return null;

  return (
    <div className="action">
      {files.length == 1 ? (
        <div
          className={`h-[28rem] w-full object-contain relative overflow-hidden rounded-md bg-black/10`}
        >
          <img
            src={files[0].url}
            className="scale-125 absolute top-1/2 left-0 object-cover opacity-30 -translate-y-1/2 blur-xl w-full"
            loading="lazy"
          />
          <ImageWithLoading
            src={files[0].url}
            className={`object-contain w-full h-full relative`}
          />
        </div>
      ) : (
        <Carousel
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          className="overflow-hidden rounded-md"
        >
          {files.map((file, index) => (
            <div
              key={index}
              className="h-[28rem] object-contain relative overflow-hidden bg-black/10"
            >
              <img
                src={file.url}
                className="scale-125 absolute top-1/2 left-0 object-cover opacity-30 -translate-y-1/2 blur-xl w-full"
                loading="lazy"
              />
              <ImageWithLoading
                src={file.url}
                className={`object-contain w-full h-full relative`}
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default FileContainer;
