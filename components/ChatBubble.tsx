import styles from "./ChatBubble.module.css"

interface ChatBubbleProps {
  message: string
  isUser: boolean
  timestamp: Date
}

export default function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={`${styles.chatBubble} ${isUser ? styles.user : styles.ai}`}>
      <div className={styles.avatarContainer}>
        {isUser ? (
          <div className={styles.userAvatar}>
            <span>You</span>
          </div>
        ) : (
          <div className={styles.aiAvatar}>
            <img src="/ai-avatar.png" alt="AI Assistant" className="w-full h-full object-cover rounded-full" />
          </div>
        )}
      </div>

      <div className={styles.messageContainer}>
        <div className={styles.messageContent}>
          <div className={styles.messageText}>{message}</div>
          <div className={styles.timestamp}>{formatTime(timestamp)}</div>
        </div>
      </div>
    </div>
  )
}
