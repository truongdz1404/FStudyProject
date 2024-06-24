import { FC, useState, useRef, useEffect } from "react";

interface CommentInputProps {
  onSubmit: (content: string) => void;
}

const CommentInput: FC<CommentInputProps> = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [isCommentInputFocused, setIsCommentInputFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputFocus = () => {
    setIsCommentInputFocused(true);
  };

  const handleInputBlur = () => {
    if (!newComment) {
      setIsCommentInputFocused(false);
    }
  };

  const handleSubmit = () => {
    onSubmit(newComment);
    setNewComment("");
    setIsCommentInputFocused(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newComment]);

  return (
    <div className="relative mt-4">
      <textarea
        ref={textareaRef}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className={`border p-2 w-full ${isCommentInputFocused ? "rounded-t-lg" : "rounded-full"} text-sm transition-all duration-200 resize-none overflow-hidden`}
        placeholder="Add a comment..."
        rows={isCommentInputFocused ? 4 : 1}
        style={{ minHeight: isCommentInputFocused ? "4rem" : "2.5rem", maxHeight: "10rem" }}
      />
      {isCommentInputFocused && (
        <div className="absolute right-2 bottom-2 flex space-x-2">
          <button
            onClick={() => {
              setIsCommentInputFocused(false);
              setNewComment("");
            }}
            className="border rounded-full p-2 bg-gray-300 text-black text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="border rounded-full p-2 bg-red-800 text-white text-sm"
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
