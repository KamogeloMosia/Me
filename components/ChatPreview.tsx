import styles from "./ChatPreview.module.css"
import Link from "next/link"

interface ChatPreviewProps {
  avatar: string
  title: string
  preview: string
}

export default function ChatPreview({ avatar, title, preview }: ChatPreviewProps) {
  return (
    <Link href="/chat" className={styles.previewCard}>
      <div className={styles.avatarContainer}>
        <span className="material-icons-outlined">{avatar}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.preview}>{preview}</p>
      </div>
    </Link>
  )
}
