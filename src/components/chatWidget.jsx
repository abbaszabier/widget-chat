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
import { useState } from "react";
import { EllipsisVertical, X } from "lucide-react";
import Image from "next/image";

export default function ChatWidget() {
  // a chat conversation
  const [messages, setMessages] = useState([
    {
      id: 1,
      isSender: false,
      user: "Sam",
      content: "Welcome to Sam's Website Support. What is your name?",
    },
    { id: 2, isSender: true, user: "User", content: "John Doe" },
    { id: 3, isSender: false, user: "Sam", content: "What is your email?" },
    { id: 4, isSender: true, user: "User", content: "john.doe@example.com" },
    {
      id: 5,
      isSender: false,
      user: "Sam",
      content: "How do you want to contact us?",
    },
  ]);

  // contact methods
  const [availableContacts, setAvailableContacts] = useState([
    { id: "whatsapp", label: "WhatsApp", icon: "/whatsapp.svg" },
    { id: "telegram", label: "Telegram", icon: "/telegram.svg" },
    { id: "livechat", label: "Live Chat", icon: "/livechatColor.svg" },
  ]);

  const [isAgentAvailable, setIsAgentAvailable] = useState(null);

  const handleContactSelection = (contactMethod) => {
    const newMessages = [
      ...messages,
      {
        id: messages.length + 1,
        isSender: true,
        user: "User",
        content: contactMethod,
      },
      {
        id: messages.length + 2,
        isSender: false,
        user: "Sam",
        content:
          "Thanks for the details! Connecting you to a support agent now... 🎧 Please hold on for a moment!",
      },
    ];

    setMessages(newMessages);

    // Simulate agent availability check
    setTimeout(() => {
      const agentAvailable = Math.random() > 0.5; // Simulate a 50% chance
      setIsAgentAvailable(agentAvailable);
      if (!agentAvailable) {
        const updatedContacts = availableContacts.filter(
          (contact) => contact.id !== contactMethod.toLowerCase()
        );
        setAvailableContacts(updatedContacts);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            isSender: false,
            user: "Sam",
            content:
              "All agents are currently busy for your selected contact method. Please try one of the following available options:",
          },
        ]);
      }
    }, 2000); // Simulate network delay
  };

  const actionIcons = [
    {
      icon: EllipsisVertical,
      type: "close",
    },
  ];

  return (
    <ExpandableChat size="lg" position="bottom-right">
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
      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.isSender ? "sent" : "received"}
              className="text-xs"
            >
              {!message.isSender && (
                <ChatBubbleAvatar fallback="S" user={message.user} />
              )}
              {message.content === "How do you want to contact us?" ? (
                <div className="flex flex-col gap-2">
                  <ChatBubbleMessage
                    variant={message.isSender ? "sent" : "received"}
                    isSender={message.isSender}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                  <ChatBubbleMessage variant="received2" isSender={true}>
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
                  </ChatBubbleMessage>
                </div>
              ) : message.content ===
                  "All agents are currently busy for your selected contact method. Please try one of the following available options:" &&
                isAgentAvailable === false ? (
                <div className="flex flex-col gap-2">
                  <ChatBubbleMessage
                    variant={message.isSender ? "sent" : "received"}
                    isSender={message.isSender}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                  <ChatBubbleMessage variant="received2" isSender={true}>
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
                  </ChatBubbleMessage>
                </div>
              ) : (
                <ChatBubbleMessage
                  variant={message.isSender ? "sent" : "received"}
                  isSender={message.isSender}
                >
                  {message.content}
                </ChatBubbleMessage>
              )}
              <ChatBubbleActionWrapper>
                {actionIcons.map(({ icon: Icon, type }) => (
                  <ChatBubbleAction
                    className="size-7"
                    key={type}
                    icon={<Icon className="size-4" />}
                    onClick={() =>
                      console.log("Action " + type + " clicked for message ")
                    }
                  />
                ))}
              </ChatBubbleActionWrapper>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter className="border-0">
        <ChatInput />
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
