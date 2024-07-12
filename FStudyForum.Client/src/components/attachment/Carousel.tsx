import { FC } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { cn } from "@/helpers/utils";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "yet-another-react-lightbox/styles.css";

type Props = {
  index: number;
  expand?: boolean;
  onExpand?: () => void;
  sliders?: SlideImage[];
  className?: string;
};

const Carousel: FC<Props> = ({
  index,
  sliders,
  expand = false,
  onExpand,
  className
}) => {
  const hideArrow = (sliders?.length ?? 0) <= 1;
  return (
    <Lightbox
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, .8)" },
        button: { filter: "none" }
      }}
      toolbar={{
        buttons: [
          <button
            key="my-button"
            type="button"
            className="yarl__button !filter-none"
            onClick={onExpand}
          >
            <div className="rounded-full bg-gray-900/50  hover:bg-gray-900/60 p-2.5 text-white">
              {!expand ? (
                <Maximize2 strokeWidth={3} className="w-4 h-4" />
              ) : (
                <Minimize2 strokeWidth={3} className="w-4 h-4" />
              )}
            </div>
          </button>
        ]
      }}
      plugins={[Zoom, Inline]}
      carousel={{ finite: hideArrow }}
      className={cn(className)}
      render={{
        iconPrev: () => (
          <div className="rounded-full bg-gray-900/40 hover:bg-gray-900/50 text-gray-400 hover:text-white  p-2 hidden md:block">
            <ChevronLeft strokeWidth={2} className={cn("w-6 h-6")} />
          </div>
        ),
        iconNext: () => (
          <div className="rounded-full bg-gray-900/40 hover:bg-gray-900/50 text-gray-400 hover:text-white  p-2 hidden md:block">
            <ChevronRight strokeWidth={2} className={cn("w-6 h-6")} />
          </div>
        ),
        iconZoomIn: () => (
          <div className="rounded-full bg-gray-900/40 hover:bg-gray-900/50 p-1.5 text-white">
            <ZoomIn strokeWidth={2} className={cn("w-6 h-6")} />
          </div>
        ),
        iconZoomOut: () => (
          <div className="rounded-full bg-gray-900/40 hover:bg-gray-900/50 p-1.5 text-white">
            <ZoomOut strokeWidth={2} className={cn("w-6 h-6 ")} />
          </div>
        ),
        buttonPrev: hideArrow ? () => null : undefined,
        buttonNext: hideArrow ? () => null : undefined
      }}
      zoom={{
        maxZoomPixelRatio: 5
      }}
      index={index}
      slides={sliders}
    />
  );
};

export default Carousel;
