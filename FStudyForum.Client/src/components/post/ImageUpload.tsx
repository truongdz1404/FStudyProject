import { forwardRef } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/helpers/utils";
import React from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/helpers/storage";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { FileWithURL } from "./FileInput";
interface ImageUploadProps extends React.HTMLAttributes<HTMLTableRowElement> {
  file: FileWithURL;
  onRemove: () => void;
  onLoaded: (url: string) => void;
}

const ImageUpload = forwardRef<HTMLTableRowElement, ImageUploadProps>(
  ({ file, className, onRemove, onLoaded, ...props }, imageRef) => {
    const [progess, setProgess] = React.useState(file.get ? 100 : 0);
    const [uploaded, setUploaded] = React.useState(false);

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onRemove();
    };

    React.useEffect(() => {
      if (uploaded || file.get) return;
      const startUpload = async () => {
        setUploaded(true);
        const storageRef = ref(
          storage,
          `images/attachment_${crypto.randomUUID()}_${Date.now()}`
        );
        const metadata = {
          contentType: "image/jpeg"
        };
        const uploadTask = uploadBytesResumable(
          storageRef,
          file.data,
          metadata
        );
        uploadTask.on(
          "state_changed",
          snapshot => {
            setProgess(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            );
          },
          error => {
            toast.error(error.message);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            onLoaded(url);
          }
        );
      };

      startUpload();
    }, [file.data, file.get, uploaded, onLoaded]);

    return (
      <tr ref={imageRef} {...props} className={cn("", className)}>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <div
            className={cn(
              progess != 100 && "opacity-60",
              "relative flex h-12 w-20 justify-center overflow-hidden rounded-sm"
            )}
          >
            <img
              src={file.preview}
              alt={file.data.name}
              className="scale-125 absolute top-1/2 left-0 object-cover opacity-30 -translate-y-1/2 blur-xl w-full"
              loading="lazy"
            />
            <img
              className="object-contain"
              src={file.preview}
              alt={file.data.name}
            />
            <div
              className={cn(
                "absolute flex w-full h-full justify-center items-center",
                progess == 100 && "hidden"
              )}
            >
              <CircularProgressbar
                value={progess}
                strokeWidth={50}
                className="w-3 h-3"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "gray"
                })}
              />
            </div>
          </div>
        </td>
        <td className="px-6 py-4 truncate whitespace-normal text-sm font-medium dark:text-slate-400 ">
          <div className="">
            <p
              className={cn(
                "w-[10rem] text-ellipsis whitespace-nowrap overflow-hidden"
              )}
            >
              {file.data.name}
            </p>
          </div>
        </td>
        <td
          className={cn(
            "px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400"
          )}
        >
          {(file.data.size / 1000).toFixed(0)} KB
        </td>

        <td className="px-6 py-4 h-full whitespace-nowrap text-sm ">
          <button
            type="button"
            className="flex p-2 items-center justify-center cursor-pointer"
            onClick={handleRemove}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </td>
      </tr>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
