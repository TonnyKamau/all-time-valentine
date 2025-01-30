"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { PartnerInfo } from "@/types/message"

interface PartnerInfoFormProps {
  onSubmit: (info: PartnerInfo) => void
  isLoading: boolean
}

export function PartnerInfoForm({ onSubmit, isLoading }: PartnerInfoFormProps) {
  const [info, setInfo] = useState<PartnerInfo>({
    name: "",
    nicknames: [""],
    likes: [""],
    bestMoments: [""],
    challenges: [""],
    personality: [""],
  })

  const addField = (field: keyof Omit<PartnerInfo, "name">) => {
    setInfo((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeField = (field: keyof Omit<PartnerInfo, "name">, index: number) => {
    setInfo((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const updateField = (field: keyof Omit<PartnerInfo, "name">, index: number, value: string) => {
    setInfo((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanInfo = {
      ...info,
      nicknames: info.nicknames.filter(Boolean),
      likes: info.likes.filter(Boolean),
      bestMoments: info.bestMoments.filter(Boolean),
      challenges: info.challenges.filter(Boolean),
      personality: info.personality.filter(Boolean),
    }
    onSubmit(cleanInfo)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Partner&apos;s Name</Label>
        <Input
          id="name"
          value={info.name}
          onChange={(e) => setInfo((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your partner's name"
          required
          className="border-pink-200 focus:border-pink-500"
        />
      </div>
      {(["nicknames", "likes", "bestMoments", "challenges", "personality"] as const).map((field) => (
        <div key={field} className="space-y-2">
          <Label>
            {field === "nicknames" && "Nicknames you use for them"}
            {field === "likes" && "What do they like?"}
            {field === "bestMoments" && "Best moments together"}
            {field === "challenges" && "Challenges you've overcome"}
            {field === "personality" && "Their personality traits"}
          </Label>
          {info[field].map((value, index) => (
            <div key={index} className="relative mb-2">
              <Input
                value={value}
                onChange={(e) => updateField(field, index, e.target.value)}
                placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                className="pr-10 border-pink-200 focus:border-pink-500"
              />
              {info[field].length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(field, index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => addField(field)}>
            Add another
          </Button>
        </div>
      ))}
      <Button type="submit" disabled={isLoading || !info.name} className="w-full bg-pink-600 hover:bg-pink-700">
        Continue
      </Button>
    </form>
  )
}