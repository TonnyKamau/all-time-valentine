export type MessageType = "romantic" | "funny" | "poetic" | "sarcastic" | "nostalgic"

export interface PartnerInfo {
  name: string
  nicknames: string[]
  likes: string[]
  bestMoments: string[]
  challenges: string[]
  personality: string[]
}

export interface GeneratedMessage {
  id: string
  message: string
  type: MessageType
  partnerInfo: PartnerInfo
  createdAt: Date
}

