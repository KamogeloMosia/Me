"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./page.module.css"
import ChatBubble from "@/components/ChatBubble"
import MessageInput from "@/components/MessageInput"
import FloatingBlob from "@/components/FloatingBlob"

// Dummy initial messages
const initialMessages = [
  {
    id: 1,
    text: "Hello! How can I assist you today?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 5),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Simple dummy AI response generator
  const getAIResponse = (userMessage: string) => {
    const responses = [
      "I understand what you're asking about. Let me help you with that.",
      "That's an interesting question! Here's what I think...",
      "I've analyzed your request and have some insights to share.",
      "Based on my knowledge, I can provide the following information.",
      "I'd be happy to assist with your query about this topic.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className={styles.chatPage}>
      <FloatingBlob />

      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message.text} isUser={message.isUser} timestamp={message.timestamp} />
          ))}

          {isTyping && (
            <div className={styles.typingIndicator}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
