import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

const fonts = [
  { name: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "Arial Black", value: "'Arial Black', sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Courier New", value: "'Courier New', monospace" },
  { name: "Impact", value: "Impact, sans-serif" },
  { name: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { name: "Verdana", value: "Verdana, sans-serif" },
];

const FontSelector = ({ value, onChange }: FontSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Font</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-card border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem
              key={font.value}
              value={font.value}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSelector;
