import { cn } from "@/helpers/utils";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface CommentInputProps {
  commentId: number;
  content: string;
  onSave: (commentId: number, content: string) => void;
  onCancel: () => void;
}

const CommentInput: FC<CommentInputProps> = ({ commentId, content, onSave, onCancel }) => {
  const [newContent, setNewContent] = useState<string>(content);

  const handleSave = () => {
    if (newContent.trim() !== "") {
      onSave(commentId, newContent);
    }
  };

  return (
    <div className="border rounded-2xl">
      <TextareaAutosize
        autoFocus
        value={newContent}
        onChange={e => setNewContent(e.target.value)}
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
          onClick={handleSave}
          className="rounded-full p-2 bg-orange-800 text-white text-xs"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
