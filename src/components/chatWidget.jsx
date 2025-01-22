"use client";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleActionWrapper,
  ChatBubbleAction,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Check, Copy, Edit, Reply, RotateCcw, Trash } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ReplyAndEditBox } from "./replyAndEditBox";
import { FileIcon, defaultStyles } from "react-file-icon";
import { formatDate } from "@/utils/formater";

export default function ChatWidget() {
  // a dummy conversation
  const [messages, setMessages] = useState([
    {
      id: 1,
      isSender: false,
      user: "Sam",
      content: "Welcome to Sam's Website Support. What is your name?",
      replyTo: null,
      file: null,
      date: formatDate(new Date()),
    },
  ]);

  // file icon styles
  const styledIcons = Object.keys(defaultStyles);

  // edit message state
  const [editMessageId, setEditMessageId] = useState(null);

  // reply to message state
  const [replyToMessage, setReplyToMessage] = useState(null);

  // copied message state
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  // contact methods
  const [availableContacts, setAvailableContacts] = useState([
    { id: "whatsapp", label: "WhatsApp", icon: "/whatsapp.svg" },
    { id: "telegram", label: "Telegram", icon: "/telegram.svg" },
    { id: "livechat", label: "Live Chat", icon: "/livechatColor.svg" },
  ]);

  // agent availability
  const [isAgentAvailable, setIsAgentAvailable] = useState(false);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // dialog state
  const [open, setOpen] = useState(false);

  // dialog action state
  const [action, setAction] = useState(null);

  // handle dialog action
  const handleDialogAction = () => {
    setMessages([
      {
        id: 1,
        isSender: false,
        user: "Sam",
        content: "Welcome to Sam's Website Support. What is your name?",
        replyTo: null,
        file: null,
        date: formatDate(new Date()),
      },
    ]);

    setOpen(false);
    setIsAgentAvailable(false);
  };

  // handle contact selection
  const handleContactSelection = (contactMethod) => {
    if (contactMethod === "WhatsApp" || contactMethod === "Telegram") {
      // Show the selected contact method
      const newMessages = [
        ...messages,
        {
          id: messages.length + 1,
          isSender: true,
          user: "User",
          content: contactMethod,
          replyTo: null,
          file: null,
          date: formatDate(new Date()),
        },
        {
          id: messages.length + 2,
          isSender: false,
          user: "Sam",
          content: `Click here to start ${contactMethod}`,
          replyTo: null,
          file: null,
          date: formatDate(new Date()),
        },
      ];
      setMessages(newMessages);
    } else if (contactMethod === "Live Chat") {
      // Show the selected contact method
      const newMessages = [
        ...messages,
        {
          id: messages.length + 1,
          isSender: true,
          user: "User",
          content: contactMethod,
          replyTo: null,
          file: null,
          date: formatDate(new Date()),
        },
        {
          id: messages.length + 2,
          isSender: false,
          user: "Sam",
          content:
            "Thanks for the details! Connecting you to a support agent now... 🎧 Please hold on for a moment!",
          replyTo: null,
          file: null,
          date: formatDate(new Date()),
        },
      ];
      setMessages(newMessages);
      setIsLoading(true);

      // a dummy agent availability check
      setTimeout(() => {
        const isAvailable = !isAgentAvailable;
        setIsAgentAvailable(isAvailable);
        if (isAvailable) {
          // Reset the messages and show the agent's greeting message
          setMessages([
            {
              id: 1,
              isSender: false,
              user: "Agent",
              content:
                "Hi, this is your support agent. How can I assist you today?",
              replyTo: null,
              file: null,
              date: formatDate(new Date()),
            },
            {
              id: 2,
              isSender: true,
              user: "User",
              content: "Hi, this is example user message",
              replyTo: null,
              file: null,
              date: formatDate(new Date()),
            },
            {
              id: 3,
              isSender: false,
              user: "Agent",
              content: "this is example reply from agent",
              replyTo: {
                id: 2,
                isSender: true,
                user: "User",
                content: "Hi, this is example user message",
                replyTo: null,
                file: null,
                date: formatDate(new Date()),
              },
              file: null,
              date: formatDate(new Date()),
            },
            {
              id: 4,
              isSender: true,
              user: "User",
              content: "Nice, this is example I'm replying to the agent",
              replyTo: {
                id: 3,
                isSender: false,
                user: "Agent",
                content: "this is example reply from agent",
                replyTo: {
                  id: 2,
                  isSender: true,
                  user: "User",
                  content: "Hi, this is example user message",
                  replyTo: null,
                  file: null,
                  date: formatDate(new Date()),
                },
                file: null,
                date: formatDate(new Date()),
              },
              file: null,
              date: formatDate(new Date()),
            },
          ]);
        } else {
          // set the messages to show the agent is busy
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              isSender: false,
              user: "Sam",
              content:
                "All agents are currently busy for your selected contact method. Please try one of the following available options:",
              replyTo: null,
              file: null,
              date: formatDate(new Date()),
            },
          ]);
        }
        setIsLoading(false); // Reset the loading state
      }, 2000); // delay for 2 seconds
    }
  };

  useEffect(() => {
    if (messages.length === 2 && !isAgentAvailable) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          isSender: false,
          user: "Sam",
          content: "What is your email?",
          replyTo: null,
          file: null,
          date: formatDate(new Date()),
        },
      ]);
    } else if (messages.length === 4 && !isAgentAvailable) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          isSender: false,
          user: "Sam",
          content: "How do you want to contact us?",
          replyTo: null,
          file: null,
          date: formatDate(new Date()),
        },
      ]);
    }
  }, [messages.length, isAgentAvailable]);

  const actionUserIcons = [
    {
      icon: Edit,
      type: "edit",
    },
    {
      icon: Trash,
      type: "delete",
    },
  ];

  const actionAgentIcons = [
    {
      icon: Reply,
      type: "reply",
    },
    {
      icon: Copy,
      type: "copy",
    },
  ];

  const handleSendMessage = (content) => {
    if (editMessageId !== null) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editMessageId ? { ...msg, content } : msg
        )
      );
      setEditMessageId(null);
    } else {
      const newMessage = {
        id: messages.length + 1,
        isSender: true,
        user: "User",
        content,
        replyTo: replyToMessage,
        file: null,
        date: formatDate(new Date()),
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const handleSendFile = (file) => {
    const newMessage = {
      id: messages.length + 1,
      isSender: true,
      user: "User",
      content: null,
      replyTo: null,
      file,
      date: formatDate(new Date()),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleEditMessage = (messageId) => {
    const message = messages.find((msg) => msg.id === messageId);
    if (message) {
      setEditMessageId(messageId);
    }
    setReplyToMessage(null); // Reset replyToMessage
  };

  const handleDeleteMessage = (messageId) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    setMessages(updatedMessages); // Update messages state
  };

  const handleCopyMessage = (message, messageId) => {
    navigator.clipboard.writeText(message); // copy message to clipboard
    setCopiedMessageId(messageId); //
    setTimeout(() => setCopiedMessageId(null), 1000); // Reset copiedMessageId after 1 second
  };

  const handleReplyMessage = (messageId) => {
    const message = messages.find((msg) => msg.id === messageId);
    if (message) {
      setReplyToMessage(message); // Set replyToMessage
    }
    setEditMessageId(null); // Reset editMessageId
  };

  return (
    <ExpandableChat size="sm" position="bottom-right">
      <ExpandableChatHeader className="flex justify-start gap-2">
        <>
          <Image
            aria-hidden
            src="/livechatColor.svg"
            alt="File icon"
            width={20}
            height={20}
          />
          <h1 className="text-lg">Sam's Website Support</h1>
        </>
      </ExpandableChatHeader>
      {messages.find(
        (message) =>
          message.content ===
          "Hi, this is your support agent. How can I assist you today?"
      ) && (
        <div className="flex bg-white w-full justify-center items-center shadow">
          <Button
            variant="none"
            size="defaultWithNoRound"
            className="w-full border-b border-input text-xs"
            onClick={() => {
              setAction("restart");
              setOpen(true);
            }}
          >
            <RotateCcw className="size-1" />
            Restart Chat
          </Button>
          <Button
            variant="none"
            size="defaultWithNoRound"
            className="w-full border-b border-l border-input text-red-500 hover:text-red-500 text-xs"
            onClick={() => {
              setAction("end");
              setOpen(true);
            }}
          >
            <Trash className="size-1" />
            End Chat
          </Button>
        </div>
      )}
      <ExpandableChatBody>
        <ChatMessageList>
          {/* divider */}
          {messages.find(
            (message) =>
              message.content ===
              "Hi, this is your support agent. How can I assist you today?"
          ) && (
            <div className="flex justify-center items-center gap-2">
              <hr className="w-1/5 border-t-1 border-[#E9EAEB]" />
              <p className="text-xs text-gray-500">
                You're now connected with agent
              </p>
              <hr className="w-1/5 border-t-1 border-[#E9EAEB]" />
            </div>
          )}

          {/* This is the chat messages start here */}
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.isSender ? "sent" : "received"}
              className="text-xs"
            >
              {!message.isSender && (
                <ChatBubbleAvatar
                  fallback={message.user.charAt(0)}
                  user={message.user}
                />
              )}
              {message.content === "How do you want to contact us?" ? (
                <div className="flex flex-col gap-2">
                  <ChatBubbleMessage
                    variant={message.isSender ? "sent" : "received"}
                    isSender={message.isSender}
                    user={!message.isSender ? message.user : ""}
                    time={message.date}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                  <div className="p-3 bg-[#FAFAFA] border border-[#E9EAEB] text-[#181D27] rounded-lg">
                    <div className="flex flex-col gap-2">
                      {availableContacts.map((contact) => (
                        <Button
                          key={contact.id}
                          variant="bgWhite"
                          size="sm"
                          className="flex items-center justify-start gap-2"
                          onClick={() => handleContactSelection(contact.label)}
                        >
                          <Image
                            aria-hidden
                            src={contact.icon}
                            alt="File icon"
                            width={20}
                            height={20}
                          />
                          {contact.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : message.content ===
                  "All agents are currently busy for your selected contact method. Please try one of the following available options:" &&
                isAgentAvailable === false ? (
                <div className="flex flex-col gap-2">
                  <ChatBubbleMessage
                    variant={message.isSender ? "sent" : "received"}
                    isSender={message.isSender}
                    user={!message.isSender ? message.user : ""}
                    time={message.date}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                  <div className="p-3 bg-[#FAFAFA] border border-[#E9EAEB] text-[#181D27] rounded-lg">
                    <div className="flex flex-col gap-2">
                      {availableContacts.map((contact) => (
                        <Button
                          key={contact.id}
                          variant="bgWhite"
                          size="sm"
                          className="flex items-center justify-start gap-2"
                          onClick={() => handleContactSelection(contact.label)}
                        >
                          <Image
                            aria-hidden
                            src={contact.icon}
                            alt="File icon"
                            width={20}
                            height={20}
                          />
                          {contact.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (message.content === "Click here to start Telegram") |
                (message.content === "Click here to start WhatsApp") ? (
                <div className="flex flex-col gap-2">
                  <ChatBubbleMessage
                    variant={message.isSender ? "sent" : "received"}
                    isSender={message.isSender}
                    user={!message.isSender ? message.user : ""}
                    time={message.date}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                  <div className="p-3 bg-[#FAFAFA] border border-[#E9EAEB] text-[#181D27] rounded-lg">
                    <div className="flex flex-col w-full gap-2">
                      {availableContacts
                        .filter(
                          (contact) =>
                            contact.label.toLowerCase() ===
                            message.content.split(" ").pop().toLowerCase()
                        )
                        .map((contact) => (
                          <Button
                            key={contact.id}
                            variant="bgWhite"
                            size="sm"
                            className="flex items-center justify-start gap-2"
                            // open link whatsapp or telegram
                            onClick={() =>
                              window.open(
                                contact.label === "WhatsApp"
                                  ? "https://wa.me/6281234567890"
                                  : "https://t.me/username",
                                "_blank"
                              )
                            }
                          >
                            <Image
                              aria-hidden
                              src={contact.icon}
                              alt="File icon"
                              width={20}
                              height={20}
                            />
                            {contact.label}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <ChatBubbleMessage
                  variant={message.isSender ? "sent" : "received"}
                  user={!message.isSender ? message.user : ""}
                  isSender={message.isSender}
                  className="border"
                  time={message.date}
                >
                  {message?.replyTo && (
                    <ReplyAndEditBox
                      replyToMessage={message.replyTo}
                      onCancel={() => setReplyToMessage(null)}
                      type="reply"
                      replayTo
                      isSender={message.isSender}
                    />
                  )}
                  {message.file ? (
                    message.file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(message.file)}
                        alt={message.file.name}
                        className="max-w-[250px] max-h-[250px] object-contain rounded"
                      />
                    ) : (
                      <div
                        onClick={() => {
                          const url = URL.createObjectURL(message.file);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = message.file.name;
                          a.click();
                        }}
                        className="flex items-center gap-2 border bg-white rounded p-2 cursor-pointer"
                      >
                        <div className="w-[32px] h-[32px]">
                          <FileIcon
                            extension={message.file.name.split(".").pop()}
                            {...styledIcons}
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 font-medium truncate w-[160px]">
                            {message.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(message.file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    message.content
                  )}
                </ChatBubbleMessage>
              )}
              <ChatBubbleActionWrapper>
                {!message?.isSender &&
                  actionAgentIcons.map(({ icon: Icon, type }) => (
                    <ChatBubbleAction
                      className="size-7"
                      key={type}
                      icon={
                        type === "copy" && copiedMessageId === message.id ? (
                          <Check className="size-4" />
                        ) : (
                          Icon && <Icon className="size-4" />
                        )
                      }
                      onClick={() => {
                        if (type === "copy")
                          handleCopyMessage(message.content, message.id);
                        if (type === "reply") handleReplyMessage(message.id);
                      }}
                    />
                  ))}

                {message?.isSender &&
                  actionUserIcons.map(({ icon: Icon, type }) => (
                    <ChatBubbleAction
                      className={`size-7`}
                      key={type}
                      icon={Icon && <Icon className="size-4" />}
                      onClick={() => {
                        if (type === "edit") handleEditMessage(message.id);
                        if (type === "delete") handleDeleteMessage(message.id);
                      }}
                    />
                  ))}
              </ChatBubbleActionWrapper>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </ExpandableChatBody>
      <div className="flex justify-center items-center gap-2">
        <p className="text-xs text-gray-500">
          {isLoading && "Connecting you to an agent..."}
        </p>
      </div>

      <ExpandableChatFooter className="border-0 flex flex-col gap-2">
        <ChatInput
          onSend={handleSendMessage}
          onSendFile={handleSendFile}
          replyToMessage={replyToMessage}
          setReplyToMessage={setReplyToMessage}
          editMessageId={editMessageId}
          setEditMessageId={setEditMessageId}
          messages={messages}
          editMessage={
            editMessageId !== null
              ? messages.find((msg) => msg.id === editMessageId).content
              : ""
          }
        />
      </ExpandableChatFooter>
      {open && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <div className="bg-white space-y-4 rounded-lg p-4 w-[80%] max-w-md">
            <Dialog>
              <DialogHeader>
                <DialogTitle className="text-left">
                  {action === "restart" ? (
                    <div className="flex items-center gap-2 bg-[#2970FF] rounded w-fit p-2 mb-3">
                      <RotateCcw className="p-1" color="#ffffff" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-red-500 rounded w-fit p-2 mb-3">
                      <Trash className="p-1" color="#ffffff" />
                    </div>
                  )}
                  {action === "restart" ? "Restart Chat" : "End Chat"}
                </DialogTitle>
                <DialogDescription className="mb-4 text-left">
                  {action === "restart"
                    ? "Are you sure you want to restart? Your current conversation will be lost."
                    : "Are you sure you want to end this conversation? You can't undo this action."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2 border-t border-gray-100">
                <Button
                  className={`w-full ${
                    action === "restart"
                      ? "bg-[#2970FF] text-white hover:bg-[#2C7DFF]"
                      : "bg-destructive text-destructive-foreground hover:bg-destructive/95"
                  }`}
                  onClick={handleDialogAction}
                >
                  {action === "restart" ? "Restart Chat" : "End Chat"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </Dialog>
          </div>
        </div>
      )}
    </ExpandableChat>
  );
}
