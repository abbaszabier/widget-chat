import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export const ReplyAndEditBox = ({ replyToMessage, onCancel, type }) => {
  return (
    <div className="border-l-4 flex justify-between border-blue-500 bg-gray-100 mx-4 p-2 rounded">
      <div className="flex flex-col">
        <div className="text-sm font-bold text-blue-600">
          {type === "edit" ? "You" : replyToMessage.user}
        </div>
        <div className="text-xs text-gray-700 truncate max-w-[200px]">
          {replyToMessage.content}
        </div>
      </div>
      <Button
        onClick={onCancel}
        size="icon"
        variant="bgWhite"
        className="text-xs"
      >
        <X size={16} />
      </Button>
    </div>
  );
};
