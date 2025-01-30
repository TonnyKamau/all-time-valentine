import MessageGenerator from "../components/MessageGenerator"
import { Hearts } from "../components/Hearts"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50 to-red-50">
      <Hearts />
      <div className="relative z-10 w-full py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 text-center">My All-Time Valentine</h1>
        <p className="text-lg text-pink-500 mb-8 text-center max-w-xl mx-auto">
          Create the perfect Valentine&apos;s message by sharing details about your special someone
        </p>
        <MessageGenerator />
      </div>
    </main>
  )
}

