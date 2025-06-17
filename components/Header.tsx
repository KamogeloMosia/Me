"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./Header.module.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className="material-icons-outlined">auto_awesome</span>
        <span className={styles.logoText}>Creative AI</span>
      </Link>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/chat" className={styles.navLink}>
          Chat
        </Link>
        <Link href="#" className={styles.navLink}>
          Explore
        </Link>
        <Link href="#" className={styles.navLink}>
          Settings
        </Link>
      </nav>

      <div className={styles.actions}>
        <button className={styles.actionButton} aria-label="User profile">
          <span className="material-icons-outlined">person</span>
        </button>

        <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span className="material-icons-outlined">{isMenuOpen ? "close" : "menu"}</span>
        </button>
      </div>
    </header>
  )
}
