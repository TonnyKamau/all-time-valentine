"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Copy, Check, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MessageType, PartnerInfo, GeneratedMessage } from "@/types/message"
import { PartnerInfoForm } from "./PartnerInfoForm"
import { MessageTypeSelector } from "./MessageTypeSelector"
import { generateValentineMessage } from "@/app/actions/generate-message"
import { ValentinesInvitation } from "./ValentinesInvitation"

export default function MessageGenerator() {
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null)
  const [messageType, setMessageType] = useState<MessageType>("romantic")
  const [generatedMessage, setGeneratedMessage] = useState<GeneratedMessage | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)

  const handleGenerate = async () => {
    if (!partnerInfo) return

    setIsLoading(true)
    setError("")
    setGeneratedMessage(null)

    try {
      const message = await generateValentineMessage(messageType, partnerInfo)
      setGeneratedMessage(message)
    } catch (error) {
      console.error("Error generating message:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!generatedMessage?.message) return

    try {
      await navigator.clipboard.writeText(generatedMessage.message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const shareMessage = async () => {
    if (!generatedMessage?.id) return

    try {
      const shareUrl = `${window.location.origin}/share/${generatedMessage.id}`
      await navigator.clipboard.writeText(shareUrl)
      alert("Share link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy share link:", err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {!showInvitation ? (
        <>
          <Card className="w-full">
            <CardContent className="p-6">
              <PartnerInfoForm onSubmit={setPartnerInfo} isLoading={isLoading} />
            </CardContent>
          </Card>

          {partnerInfo && (
            <Card className="w-full">
              <CardContent className="p-6 space-y-4">
                <MessageTypeSelector value={messageType} onChange={setMessageType} disabled={isLoading} />

                <Button onClick={handleGenerate} disabled={isLoading} className="w-full bg-pink-600 hover:bg-pink-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Message"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {error && <div className="p-4 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}

          {generatedMessage && (
            <Card className="w-full">
              <CardContent className="relative p-6">
                <p className="text-lg font-medium text-gray-800 mb-4">{generatedMessage.message}</p>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("text-gray-500 hover:text-gray-700", copied && "text-green-500 hover:text-green-600")}
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={shareMessage}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={() => setShowInvitation(true)} className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
                  Create Invitation
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <ValentinesInvitation partnerName={partnerInfo?.name || "My Valentine"} />
      )}
    </div>
  )
}

