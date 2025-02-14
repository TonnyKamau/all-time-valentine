import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { generateInvitationStages } from "@/app/actions/generate-invitation";
import { generateAcceptanceMessage } from "@/app/actions/generate-acceptance";

interface ValentinesInvitationProps {
  partnerName: string;
}

export function ValentinesInvitation({ partnerName }: ValentinesInvitationProps) {
  const [stages, setStages] = useState<string[]>([]);
  const [stage, setStage] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acceptanceMessage, setAcceptanceMessage] = useState<string>("");
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [opened, setOpened] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const [yesButtons, setYesButtons] = useState([{ id: 0, x: 0, y: 0 }]);

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
      
      // Random position within bounds
      const newX = Math.random() * 200 - 100;
      const newY = Math.random() * 200 - 100;
      setNoButtonPosition({ x: newX, y: newY });

      // Add new Yes button every other no click
      if (stage % 2 === 0) {
        setYesButtons(prev => [
          ...prev,
          {
            id: prev.length,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100
          }
        ]);
      }

      // Make no button disappear occasionally
      if (stage % 3 === 2) {
        setNoButtonVisible(false);
        setTimeout(() => setNoButtonVisible(true), 1000);
      }
    }
  };

  const handleYes = async () => {
    setAccepted(true);
    setLoadingMessage(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    try {
      const message = await generateAcceptanceMessage(partnerName);
      setAcceptanceMessage(message);
    } catch (error) {
      console.error("Failed to generate acceptance message:", error);
      setAcceptanceMessage(`I can't wait to spend Valentine's Day with you, ${partnerName}!`);
    } finally {
      setLoadingMessage(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-100">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={() => setOpened(true)}
      >
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-[400px] h-[500px] bg-red-500 text-white text-center flex justify-center items-center rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold">For You 💌</h2>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="invitation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-[400px] h-[500px] flex flex-col justify-center items-center p-6">
                <CardContent className="flex flex-col justify-center items-center">
                  {loading ? (
                    <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
                  ) : error ? (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                      {error}
                    </div>
                  ) : (
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
                          <div className="flex justify-center space-x-4 relative">
                            {yesButtons.map((btn) => (
                              <motion.div
                                key={btn.id}
                                initial={{ scale: 0 }}
                                animate={{ 
                                  scale: 1,
                                  x: btn.x,
                                  y: btn.y
                                }}
                                transition={{ type: "spring" }}
                              >
                                <Button 
                                  onClick={handleYes} 
                                  className="bg-pink-500 hover:bg-pink-600"
                                >
                                  Yes!
                                </Button>
                              </motion.div>
                            ))}
                            
                            <AnimatePresence>
                              {noButtonVisible && (
                                <motion.div
                                  animate={{
                                    x: noButtonPosition.x,
                                    y: noButtonPosition.y,
                                    transition: { type: "spring" }
                                  }}
                                  exit={{ opacity: 0 }}
                                >
                                  <Button
                                    onClick={handleNo}
                                    variant="outline"
                                    className="border-pink-300 text-pink-500 hover:bg-pink-50"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                              )}
                            </AnimatePresence>
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
                          {loadingMessage ? (
                            <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                          ) : (
                            <p className="text-lg text-pink-500">{acceptanceMessage}</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}