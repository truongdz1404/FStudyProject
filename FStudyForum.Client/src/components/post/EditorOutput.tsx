import { OutputData } from "@editorjs/editorjs";
import { FC } from "react";
import CustomImageOutput from "./CustomImageOutput";
import CustomEmbedOutput from "./CustomEmbedOutput";

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

const renderers = {
  image: CustomImageOutput,
  embed: CustomEmbedOutput
};
const EditorOutput: FC<Props> = ({ content }) => {
  return (
    <Output
      data={JSON.parse(content) as OutputData}
      style={style}
      className="text-sm"
      renderers={renderers}
    />
  );
};

export default EditorOutput;
