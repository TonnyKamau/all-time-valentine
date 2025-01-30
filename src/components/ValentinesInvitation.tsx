import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { generateInvitationStages } from "@/app/actions/generate-invitation";

interface ValentinesInvitationProps {
  partnerName: string;
}

export function ValentinesInvitation({ partnerName }: ValentinesInvitationProps) {
  const [stages, setStages] = useState<string[]>([]);
  const [stage, setStage] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const generatedStages = await generateInvitationStages(partnerName);
        setStages(generatedStages);
        setError(null);
      } catch (error) {
        console.error("Failed to generate stages:", error);
        setError("Failed to generate custom invitation. Using default stages.");
        setStages([
          "Will you be my Valentine?",
          "Are you sure you don't want to be my Valentine?",
          "Think again! It'll be fun!",
          "I promise a magical evening!",
          "Last chance! Say yes?",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, [partnerName]);

  const handleNo = () => {
    if (stage < stages.length - 1) {
      setStage(stage + 1);
      setPosition({
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
      });
    }
  };

  const handleYes = () => {
    setAccepted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                {stages[stage]}
              </h2>
              <div className="flex justify-center items-center space-x-4 relative">
                <Button
                  onClick={handleYes}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  Yes!
                </Button>
                <motion.div
                  animate={position}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute"
                  style={{ left: "50%", top: "50%" }}
                >
                  <Button
                    onClick={handleNo}
                    variant="outline"
                    className="border-pink-300 text-pink-500 hover:bg-pink-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Heart className="w-24 h-24 text-pink-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-pink-600 mb-4">
                Yay! It&apos;s a date!
              </h2>
              <p className="text-lg text-pink-500">
                I can&apos;t wait to spend Valentine&apos;s Day with you, {partnerName}!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}