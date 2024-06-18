import { cn } from "@/helpers/utils";
import { FC } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import React from "react";
import type EditorJS from "@editorjs/editorjs";
import { storage } from "@/helpers/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CircleAlert } from "lucide-react";
import { Attachment } from "@/types/attachment";
import { CreatePost } from "@/types/post";
import PostService from "@/services/PostService";
import { AxiosError } from "axios";
import { Response } from "@/types/response";
import { useNavigate } from "react-router-dom";

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
  onLoading: (loading: boolean) => void;
}
const Editor: FC<EditorProps> = ({ topicName, onLoading }) => {
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
  const editorRef = React.useRef<EditorJS>();
  const [isMounted, setIsMounted] = React.useState(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",

        onReady: () => {
          editorRef.current = editor;
        },
        placeholder: "Type here write your post...",
        inlineToolbar: true,
        data: {
          blocks: []
        },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `${import.meta.env.VITE_API_BASE_URL}/link`
            }
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const storageRef = ref(
                    storage,
                    `images/post${crypto.randomUUID()}`
                  );
                  const metadata = {
                    contentType: "image/jpeg"
                  };

                  const uploadTask = uploadBytesResumable(
                    storageRef,
                    file,
                    metadata
                  );
                  return new Promise((resolve, reject) => {
                    uploadTask.on(
                      "state_changed",
                      () => {},
                      error => {
                        reject(error);
                      },
                      async () => {
                        const downloadURL = await getDownloadURL(
                          uploadTask.snapshot.ref
                        );
                        const res = {
                          success: 1,
                          file: {
                            url: downloadURL
                          }
                        };
                        resolve(res);
                      }
                    );
                  });
                }
              }
            }
          },
          inlineCode: InlineCode,
          embed: Embed,
          table: Table,
          list: List,
          code: Code
        }
      });
    }
  }, []);

  React.useEffect(() => {
    onLoading(false);
  }, [onLoading]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, [isMounted]);

  React.useEffect(() => {
    const init = async () => {
      await initializeEditor();
      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };
    if (isMounted) {
      init();
      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const _titleRef = React.useRef<HTMLTextAreaElement>(null);
  const { ref: titleRef, ...rest } = register("title");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleCreate = async (data: PostCreationRequest) => {
    setLoading(true);
    onLoading(true);
    if (!topicName) {
      console.error("Topic name is required");
      return;
    }
    const content = await editorRef.current?.save();
    const attachments: Attachment[] = [];
    if (content) {
      content.blocks.forEach(block => {
        if (block.type === "image") {
          attachments.push({
            type: block.type,
            url: block.data.file.url
          });
        }
      });
    }

    const payload: CreatePost = {
      title: data.title,
      content: JSON.stringify(content),
      topicName: topicName,
      attachments
    };
    try {
      await PostService.createPost(payload);
      navigate("/");
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  if (!isMounted) return null;
  return (
    <>
      <div className="w-full p-4 pt-2 bg-zinc-50 rounded-lg shadow-sm border border-zinc-200 text-blue-gray-700">
        <form
          id="create-post-form"
          className="w-full"
          onSubmit={handleSubmit(handleCreate)}
        >
          <TextareaAutosize
            ref={e => {
              titleRef(e);
              //@ts-expect-error i dont know
              _titleRef.current = e;
            }}
            placeholder="Title"
            className={cn(
              "w-full  resize-none appearance-none overflow-hidden bg-transparent",
              "text-md focus:outline-none font-semibold"
            )}
            disabled={loading}
            {...rest}
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

          <div id="editor" className="min-h-80 text-sm md:px-12" />
        </form>
        {error && (
          <span className="flex items-center tracking-wide text-xs text-red-500 mt-1 ml-1 gap-x-1">
            <CircleAlert className="w-3 h-3" /> {error}
          </span>
        )}
      </div>
    </>
  );
};

export default Editor;
