import * as React from "react";
import { cn } from "@/lib/utils";
import { Delete, Send, Trash2, X } from "lucide-react";

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSend: (message: string) => void;
  editMessage?: string | null;
  replyTo?: string | null;
  onCancelEdit?: () => void;
  onCancelReply?: () => void;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      onSend,
      editMessage,
      replyTo,
      onCancelEdit,
      onCancelReply,
      className,
      ...props
    },
    ref
  ) => {
    const [input, setInput] = React.useState<string>(editMessage || "");

    const [file, setFile] = React.useState<File | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    };

    const handleFileDelete = () => {
      if (file) {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };

    React.useEffect(() => {
      if (editMessage) setInput(editMessage);
    }, [editMessage]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        onSend(input.trim());
        setInput("");
      }
    };

    return (
      <div className="relative flex flex-col w-full gap-2 z-1">
        {file && (
          <div className="w-full flex justify-between p-2 gap-2 border border-gray-300 rounded-md bg-gray-50">
            <p className="text-sm font-medium text-gray-700">
              File Selected: {file.name}
            </p>
            <span className="text-sm text-gray-500 cursor-pointer">
              <X size={20} onClick={handleFileDelete} />
            </span>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full z-1"
        >
          <button
            type="button"
            onClick={handleFileClick}
            className="absolute left-4 text-muted-foreground hover:text-foreground"
            aria-label="Attach file"
          >
            📎
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <textarea
            ref={ref}
            autoFocus={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
            className={cn(
              "pl-10 pr-12 h-[52px] bg-[#F5F5F5] text-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg resize-none border border-[#E9EAEB] flex items-center",
              className
            )}
            style={{
              paddingTop: "16px",
              paddingBottom: "16px",
              lineHeight: "1.2rem",
            }}
            {...props}
          />
          <button
            type="submit"
            className="absolute flex items-center justify-center bg-white border border-[#D1E0FF] w-[36px] h-[36px] rounded-lg right-4 text-blue-500 hover:text-blue-600 hover:border-[#2970FF]"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    );
  }
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
