import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/helpers/utils";
import { FC} from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { CircleAlert } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import Code from "@tiptap/extension-code";
import FileInput, { FileWithURL } from "./FileInput";
import React from "react";
import { Button } from "@material-tailwind/react";
import { CreatePost } from "@/types/post";
import PostService from "@/services/PostService";
import { useNavigate } from "react-router-dom";
import { Attachment } from "@/types/attachment";
import { AxiosError } from "axios";
import { Response } from "@/types/response";


const validation = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be longer than 3 characters")
    .max(128, "Title must be shorter than 128 characters")
});
interface PostCreationRequest {
  title: string;
  content?: string;
}
interface EditorProps {
  topicName: string | undefined;
  banner: string | undefined;
}

export interface FileInputContextType {
  files: FileWithURL[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithURL[]>>;
}

export const FileInputContext = React.createContext<FileInputContextType>({
  files: [],
  setFiles: () => null
});

const Editor: FC<EditorProps> = ({ topicName, banner }) => {
  console.log(banner);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostCreationRequest>({
    resolver: yupResolver(validation),
    defaultValues: {
      title: ""
    }
  });
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Bold,
      Code,
      Placeholder.configure({
        placeholder: "Write something …",
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:opacity-50 "
      })
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none  min-h-12"
      }
    }
  });
  const [files, setFiles] = React.useState<FileWithURL[]>([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleCreate = async (data: PostCreationRequest) => {
    if (!topicName) {
      setError("Topic name is required");
      return;
    }
    if (!isFileLoaded) {
      setError("Wait until the files are uploaded");
      return;
    }
    if (!editor) return;
    const json = editor.getJSON();
    setLoading(true);

    const payload: CreatePost = {
      title: data.title,
      content: JSON.stringify(json),
      topicName: topicName,
      attachments: files.map<Attachment>(file => {
        return {
          type: file.data.type,
          url: file.get!
        };
      })
    };
    try {
      const createPost = await PostService.createPost(payload);
      files.map(file => URL.revokeObjectURL(file.preview));
      navigate(`/topic/${topicName}/comments/${createPost.id}`);
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const isFileLoaded = files.every(file => file.get);
  if (!editor) return null;
  

  return (
    <>
      <FileInputContext.Provider value={{ files, setFiles }}>
        <form
          id="create-post-form"
          className="w-full p-4 pt-2 bg-zinc-50 rounded-lg shadow-sm border border-zinc-200 text-blue-gray-700"
          onSubmit={handleSubmit(handleCreate)}
        >
          <TextareaAutosize
            placeholder="Title"
            className={cn(
              "w-full  resize-none appearance-none overflow-hidden bg-transparent",
              "text-md focus:outline-none font-semibold"
            )}
            {...register("title")}
          />
          {errors.title && (
            <span
              className={cn(
                "text-red-500 text-xs ml-1 mb-1 flex gap-x-1 items-center"
              )}
            >
              <CircleAlert className="w-3 h-3" /> {errors.title.message}
            </span>
          )}
          <hr className="border-b" />
          <EditorContent editor={editor} className="text-sm my-2" />
          <FileInput />
          {error && (
            <span className="flex items-center tracking-wide text-xs text-red-500 mt-1 ml-1 gap-x-1 ">
              <CircleAlert className="w-3 h-3" /> {error}
            </span>
          )}
        </form>
      </FileInputContext.Provider>
      <div className="flex items-center justify-end">
        <Button
          variant="gradient"
          color="deep-orange"
          type="submit"
          className="mt-6 w-full lg:w-fit normal-case text-sm"
          form="create-post-form"
          disabled={topicName == undefined || loading || !isFileLoaded || banner !== ""}
        >
          Post
        </Button>
      </div>
    </>
  );
};

export default Editor;
