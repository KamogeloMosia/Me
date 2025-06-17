"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import styles from "./MessageInput.module.css"

interface MessageInputProps {
  onSendMessage: (message: string) => void
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={styles.messageInput}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />

      <div className={styles.actions}>
        <button type="button" className={styles.actionButton} aria-label="Voice input">
          <span className="material-icons-outlined">mic</span>
        </button>

        <button
          type="submit"
          className={`${styles.actionButton} ${styles.sendButton}`}
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <span className="material-icons-outlined">send</span>
        </button>
      </div>
    </form>
  )
}
