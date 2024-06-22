import { FC } from "react";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Placeholder from "@tiptap/extension-placeholder";

import parse from "html-react-parser";
import Code from "@tiptap/extension-code";

interface Props {
  json: string;
}

const EditorOutput: FC<Props> = ({ json: content }) => {
  return (
    <div className="text-sm">
      {parse(
        generateHTML(JSON.parse(content) as JSONContent, [
          Document,
          Dropcursor,
          Image,
          Paragraph,
          Text,
          Bold,
          Placeholder,
          Code
        ])
      )}
    </div>
  );
};

export default EditorOutput;
