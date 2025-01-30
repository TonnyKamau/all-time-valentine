import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { MessageType } from "@/types/message";
import { cn } from "@/lib/utils";

interface MessageTypeSelectorProps {
  value: MessageType;
  onChange: (value: MessageType) => void;
  disabled?: boolean;
}

export function MessageTypeSelector({
  value,
  onChange,
  disabled,
}: MessageTypeSelectorProps) {
  const types: { value: MessageType; label: string; description: string }[] = [
    {
      value: "romantic",
      label: "Romantic",
      description: "Sweet and heartfelt messages",
    },
    {
      value: "funny",
      label: "Funny",
      description: "Humorous and playful messages",
    },
    {
      value: "poetic",
      label: "Poetic",
      description: "Artistic and metaphorical expressions",
    },
    {
      value: "sarcastic",
      label: "Sarcastic",
      description: "Playfully teasing messages",
    },
    {
      value: "nostalgic",
      label: "Nostalgic",
      description: "Reminiscing about shared memories",
    },
  ];

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange as (value: string) => void}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      disabled={disabled}
    >
      {types.map((type) => (
        <Label
          key={type.value}
          htmlFor={type.value}
          className={cn(
            "flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors",
            "hover:bg-pink-50 hover:border-pink-200",
            value === type.value ? "border-pink-500 bg-pink-50" : "border-gray-200",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={type.value} id={type.value} />
            <div className="space-y-1">
              <span className="font-medium block">{type.label}</span>
              <p className="text-sm text-gray-500">{type.description}</p>
            </div>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}