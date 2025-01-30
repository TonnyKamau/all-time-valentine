"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export function Hearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; size: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((current) => {
        const newHeart = {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
        }
        return [...current, newHeart].slice(-20)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            animation: "float 15s linear infinite",
          }}
        >
          <Heart className="text-pink-400/20" />
        </div>
      ))}
    </div>
  )
}

