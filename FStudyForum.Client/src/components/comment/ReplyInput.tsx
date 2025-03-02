import { cn } from "@/helpers/utils";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface ReplyInputProps {
  commentId: number;
  onSubmit: (commentId: number, content: string) => void;
  onCancel: () => void;
}

const ReplyInput: FC<ReplyInputProps> = ({ commentId, onSubmit, onCancel }) => {
  const [newReply, setNewReply] = useState<string>("");

  const handleSubmit = () => {
    if (newReply.trim() !== "") {
      onSubmit(commentId, newReply);
      setNewReply("");
    }
  };

  return (
    <div className="border rounded-2xl reply-input">
      <TextareaAutosize
        autoFocus
        value={newReply}
        onChange={e => {setNewReply(e.target.value); console.log(commentId)}}
        className={cn(
          "w-full appearance-none overflow-hidden bg-transparent",
          "text-sm focus:outline-none py-3 px-4"
        )}
      />
      <div className="w-full flex justify-end gap-x-2 px-2 py-1">
            <button
              onClick={onCancel}
              className="rounded-full p-2 bg-gray-300 text-black text-xs"
            >
              Cancel
            </button>
            <button
              disabled={!newReply.trim()}
              onClick={handleSubmit}
              className={cn(
                "rounded-full p-2 text-white text-xs",
                newReply.trim() ? "bg-orange-800" : "bg-gray-400 cursor-not-allowed"
              )}
            >
              Comment
            </button>
          </div>
    </div>
  );
};

export default ReplyInput;
