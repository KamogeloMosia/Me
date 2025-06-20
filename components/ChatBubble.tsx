"use client"

import { useState } from "react"
import styles from "./ChatBubble.module.css"

interface ChatBubbleProps {
  message: string
  isUser: boolean
  timestamp: Date
}

export default function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState<boolean | null>(null)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={`${styles.bubbleContainer} ${isUser ? styles.userContainer : styles.aiContainer} animate-in`}>
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        <p>{message}</p>

        <div className={styles.bubbleFooter}>
          <span className={styles.timestamp}>{formatTime(timestamp)}</span>

          {!isUser && (
            <div className={styles.actions}>
              <button
                className={`${styles.actionButton} ${copied ? styles.actionActive : ""}`}
                onClick={copyToClipboard}
                aria-label="Copy message"
              >
                <span className="material-icons-outlined">{copied ? "check" : "content_copy"}</span>
              </button>

              <button
                className={`${styles.actionButton} ${liked === true ? styles.actionActive : ""}`}
                onClick={() => setLiked(true)}
                aria-label="Like message"
              >
                <span className="material-icons-outlined">thumb_up</span>
              </button>

              <button
                className={`${styles.actionButton} ${liked === false ? styles.actionActive : ""}`}
                onClick={() => setLiked(false)}
                aria-label="Dislike message"
              >
                <span className="material-icons-outlined">thumb_down</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
