interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

const icons = [
  "", // No icon
  "◆",
  "●",
  "▲",
  "■",
  "★",
  "⬡",
  "◐",
  "◑",
  "◒",
  "◓",
  "⊕",
  "⊗",
  "⌘",
  "⚡",
  "✦",
  "❖",
  "◈",
  "◇",
  "○",
  "△",
  "□",
  "☆",
  "⬢",
  "⬣",
];

const IconPicker = ({ value, onChange }: IconPickerProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Icon</label>
      <div className="flex flex-wrap gap-2">
        {icons.map((icon, index) => (
          <button
            key={index}
            onClick={() => onChange(icon)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 ${
              value === icon
                ? "bg-foreground text-background"
                : "bg-card hover:bg-secondary border border-border"
            }`}
          >
            {icon || "∅"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconPicker;
