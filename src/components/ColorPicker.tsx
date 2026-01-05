interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
}

const presetColors = [
  "#1a1a1a", // Near black
  "#2d2d2d", // Dark gray
  "#525252", // Medium gray
  "#f97316", // Orange (primary-ish)
  "#ef4444", // Red
  "#ec4899", // Pink
  "#8b5cf6", // Purple
  "#3b82f6", // Blue
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#84cc16", // Lime
  "#eab308", // Yellow
];

const ColorPicker = ({ value, onChange, label }: ColorPickerProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded-lg transition-all duration-200 hover:scale-110 ${
              value === color
                ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "hover:ring-1 hover:ring-foreground/20"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
          />
          <div
            className="w-8 h-8 rounded-lg border-2 border-dashed border-foreground/20 flex items-center justify-center text-muted-foreground text-xs hover:border-foreground/40 transition-colors"
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
