"use client"

import { useEffect, useRef } from "react"
import styles from "./FloatingBlob.module.css"

export default function FloatingBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Blob parameters
    const points = 6
    const radius = Math.min(canvas.width, canvas.height) * 0.15
    const center = {
      x: canvas.width * 0.8,
      y: canvas.height * 0.2,
    }

    // Animation variables
    let angle = 0
    const speed = 0.0005
    const pointsVariation: number[] = []

    // Initialize random variations for each point
    for (let i = 0; i < points; i++) {
      pointsVariation.push(Math.random() * 0.5 + 0.5)
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update angle
      angle += speed

      // Draw blob
      ctx.beginPath()

      for (let i = 0; i <= points; i++) {
        const slice = (Math.PI * 2) / points
        const pointAngle = slice * i

        // Calculate variation based on time
        const variation = pointsVariation[i % points] * Math.sin(angle * 10 + i) * 0.2 + 0.8

        // Calculate point position
        const x = center.x + Math.cos(pointAngle + angle) * radius * variation
        const y = center.y + Math.sin(pointAngle + angle) * radius * variation

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()

      // Create gradient
      const gradient = ctx.createLinearGradient(
        center.x - radius,
        center.y - radius,
        center.x + radius,
        center.y + radius,
      )
      gradient.addColorStop(0, "rgba(110, 72, 170, 0.2)")
      gradient.addColorStop(1, "rgba(157, 80, 187, 0.2)")

      ctx.fillStyle = gradient
      ctx.fill()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.blob} />
}
