"use client"

import type React from "react"

import { useState } from "react"
import styles from "./SearchBar.module.css"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search query:", query)
    // Handle search functionality here
  }

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <span className={`material-icons-outlined ${styles.searchIcon}`}>search</span>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
