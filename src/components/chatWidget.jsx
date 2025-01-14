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
  // a dummy conversation
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

  // agent availability
  const [isAgentAvailable, setIsAgentAvailable] = useState(null);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

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
        },
        {
          id: messages.length + 2,
          isSender: false,
          user: "Sam",
          content: `Click here to start ${contactMethod}`,
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
      setIsLoading(true);

      // a dummy agent availability check
      setTimeout(() => {
        const agentAvailable = Math.random() > 0.5; // Randomly set agent availability
        setIsAgentAvailable(agentAvailable);

        if (agentAvailable) {
          // Reset the messages and show the agent's greeting message
          setMessages([
            {
              id: 1,
              isSender: false,
              user: "Agent",
              content:
                "Hi, this is your support agent. How can I assist you today?",
            },
          ]);
        } else {
          // Erase the selected contact method
          const updatedContacts = availableContacts.filter(
            (contact) =>
              contact.label.toLowerCase() !== contactMethod.toLowerCase()
          );

          // Update the available contacts
          setAvailableContacts(updatedContacts);

          // set the messages to show the agent is busy
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
        setIsLoading(false); // Reset the loading state
      }, 2000); // delay for 2 seconds
    }
  };

  const actionIcons = [
    {
      icon: EllipsisVertical,
      type: "close",
    },
  ];

  return (
    <ExpandableChat size="md" position="bottom-right">
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
        <div className="flex w-full mt-2 px-4 justify-center items-center gap-2">
          <Button variant="outline" size="sm" className="w-full">
            Switch Platform
          </Button>
          <Button variant="outline" size="sm" className="w-full">
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
              <hr className="w-1/4 border-t-1 border-[#E9EAEB]" />
              <p className="text-xs text-gray-500">
                You're now connected with agent
              </p>
              <hr className="w-1/4 border-t-1 border-[#E9EAEB]" />
            </div>
          )}
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
              ) : (message.content === "Click here to start Telegram") |
                (message.content === "Click here to start WhatsApp") ? (
                <div className="flex flex-col gap-2">
                  <ChatBubbleMessage
                    variant={message.isSender ? "sent" : "received"}
                    isSender={message.isSender}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                  <ChatBubbleMessage variant="received2" isSender={true}>
                    <div className="flex flex-col gap-2">
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
                  </ChatBubbleMessage>
                </div>
              ) : (
                <ChatBubbleMessage
                  variant={message.isSender ? "sent" : "received"}
                  isSender={message.isSender}
                  className="border"
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
      <div className="flex justify-center items-center gap-2">
        <p className="text-xs text-gray-500">
          {isLoading && "Connecting you to an agent..."}
        </p>
      </div>
      <ExpandableChatFooter className="border-0 flex flex-col gap-2">
        <ChatInput />
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
