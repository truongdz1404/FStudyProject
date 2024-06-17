import { OutputBlockData } from "@editorjs/editorjs";
import { FC } from "react";

const Output = (await import("editorjs-react-renderer")).default;
interface Props {
  content: string;
}
const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem"
  }
};

const CustomImageRenderer = ({ data }: OutputBlockData<string>) => {
  const src = data.file.url;
  return (
    <div className="relative w-full min-h-[15rem]">
      <img className="w-full h-full object-cover" src={src} />
    </div>
  );
};

const CustomCodeRenderer = ({ data }: OutputBlockData<string>) => {
  const src = data.file.url;
  return (
    <div className="relative w-full min-h-[15rem]">
      <img className="w-full h-full object-cover" src={src} />
    </div>
  );
};

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer
};
const EditorOutput: FC<Props> = () => {
  return <Output style={style} className="text-sm" renderer={renderers} />;
};

export default EditorOutput;
