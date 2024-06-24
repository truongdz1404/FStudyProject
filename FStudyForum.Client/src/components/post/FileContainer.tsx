import { Attachment } from "@/types/attachment";
import { FC } from "react";
import ImageWithLoading from "../ui/ImageWithLoading";
import { Carousel } from "@material-tailwind/react";
import React from "react";
import { cn } from "@/helpers/utils";
import useSize from "@react-hook/size";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LightBox from "./LightBox";
// import BoxComment from "../comment/BoxComment";

type Props = {
  files: Attachment[];
  onClick: (id?: number) => void;
};

const getSizeFromPath = (path: string): { width: number; height: number } => {
  const regex = /attachment[^_]+_width(\d+)_height(\d+)/;
  const match = path.match(regex);

  if (match && match[1] && match[2]) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10)
    };
  }
  return {
    width: 1,
    height: 1
  };
};

const getContainerHeight = (
  attachments: Attachment[],
  containerWidth: number
): number => {
  return Math.max(
    ...attachments.map(a => {
      const size = getSizeFromPath(a.url);
      return (size.height / size.width) * containerWidth;
    })
  );
};

const FileContainer: FC<Props> = ({ files, onClick }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width] = useSize(containerRef);
  const [open, setOpen] = React.useState(-1);
  if (files.length == 0) return null;
  const height = getContainerHeight(files, width);
  const handleViewDetail = (index?: number, id?: number) => {
    onClick(id);
    setOpen(index ?? 0);
  };
  return (
    <div className="action" ref={containerRef}>
      {files.length == 1 ? (
        <div
          style={{ height: height }}
          className={cn(
            "max-h-[16rem] md:max-h-[20rem] lg:max-h-[28rem] w-full object-contain relative overflow-hidden rounded-md "
          )}
          onClick={() => handleViewDetail()}
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
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 bg-blue-gray-900/50 p-1.5 rounded-lg">
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
          prevArrow={({ handlePrev, firstIndex }) => (
            <div
              onClick={handlePrev}
              className={cn(
                "!absolute p-1.5 top-2/4 !left-4 -translate-y-2/4 rounded-full bg-gray-900/50 text-white/50 hover:text-white hover:bg-gray-900/80",
                firstIndex && "!bg-transparent"
              )}
            >
              <ChevronLeft
                strokeWidth={3}
                className={cn(
                  "w-5 h-5 text-white",
                  firstIndex && "text-transparent"
                )}
              />
            </div>
          )}
          nextArrow={({ handleNext, lastIndex }) => (
            <div
              onClick={handleNext}
              className={cn(
                "!absolute p-1.5 top-2/4 !right-4 -translate-y-2/4 rounded-full bg-gray-900/50 text-white/50 hover:text-white hover:bg-gray-900/80",
                lastIndex && "!bg-transparent"
              )}
            >
              <ChevronRight
                strokeWidth={3}
                className={cn(
                  "w-5 h-5 text-white",
                  lastIndex && "text-transparent"
                )}
              />
            </div>
          )}
          className="overflow-hidden rounded-md text-sm"
        >
          {files.map((file, index) => (
            <div
              key={index}
              style={{ height: height }}
              className="max-h-[16rem] md:max-h-[20rem] lg:max-h-[28rem] object-contain relative overflow-hidden "
              onClick={() => handleViewDetail(index, file.id)}
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
      <LightBox
        index={open}
        hideArrow={files.length <= 1}
        sliders={files.map(file => ({ src: file.url }))}
        close={() => setOpen(-1)}
      />
      {/* <BoxComment id={open} /> */}
    </div>
  );
};

export default FileContainer;
