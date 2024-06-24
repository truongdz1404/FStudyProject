import { FC, useState, useRef, useEffect } from "react";

interface ReplyInputProps {
  commentId: number;
  onSubmit: (commentId: number, content: string) => void;
  onCancel: () => void;
}

const ReplyInput: FC<ReplyInputProps> = ({ commentId, onSubmit, onCancel }) => {
  const [newReply, setNewReply] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (newReply.trim() !== "") {
      onSubmit(commentId, newReply);
      setNewReply("");
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newReply]);

  return (
    <div className="relative mt-2">
      <textarea
        ref={textareaRef}
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        className={`border p-2 w-full rounded-t-lg text-sm transition-all duration-200 resize-none overflow-hidden`}
        placeholder="Reply to comment..."
        rows={4}
        style={{ minHeight: "4rem", maxHeight: "10rem" }}
      />
      <div className="absolute right-2 bottom-2 flex space-x-2">
        <button
          onClick={onCancel}
          className="border rounded-full p-2 bg-gray-300 text-black text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="border rounded-full p-2 bg-red-800 text-white text-sm"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;
