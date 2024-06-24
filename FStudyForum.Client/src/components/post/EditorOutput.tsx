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
import { cn } from "@/helpers/utils";

interface Props {
  className?: string;
  content: string;
  hide: boolean;
}

const EditorOutput: FC<Props> = ({ content, className, hide }) => {
  return (
    <div className={cn(className, hide && "max-h-16 overflow-hidden relative")}>
      <div className={cn("text-sm w-full")}>
        {parse(
          generateHTML(JSON.parse(content) as JSONContent, [
            Document,
            Dropcursor,
            Image,
            Paragraph.configure({
              HTMLAttributes: { className: "break-words" }
            }),
            Text,
            Bold,
            Placeholder,
            Code
          ])
        )}
      </div>
      {hide && (
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white/50 to-transparent" />
      )}
    </div>
  );
};

export default EditorOutput;
