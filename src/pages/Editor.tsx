import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { ArrowLeft, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import LogoCanvas from "@/components/LogoCanvas";
import ColorPicker from "@/components/ColorPicker";
import FontSelector from "@/components/FontSelector";
import IconPicker from "@/components/IconPicker";
import { incrementDownloadCount } from "@/lib/logoStore";
import { toast } from "sonner";

type ImageFormat = "png" | "jpg" | "svg" | "webp";

const Editor = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState("YourLogo");
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState("'Space Grotesk', sans-serif");
  const [textColor, setTextColor] = useState("#1a1a1a");
  const [icon, setIcon] = useState("◆");
  const [iconSize, setIconSize] = useState(40);
  const [iconColor, setIconColor] = useState("#1a1a1a");
  const [layout, setLayout] = useState<"horizontal" | "vertical" | "icon-only">("horizontal");
  const [letterSpacing, setLetterSpacing] = useState(0.05);
  const [isUppercase, setIsUppercase] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<ImageFormat>("png");

  const displayText = isUppercase ? text.toUpperCase() : text;

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;

    try {
      let dataUrl: string;
      let extension: string = downloadFormat;

      const options = {
        backgroundColor: undefined,
        pixelRatio: 3,
      };

      switch (downloadFormat) {
        case "jpg":
          dataUrl = await toJpeg(canvasRef.current, { ...options, quality: 0.95, backgroundColor: "#ffffff" });
          break;
        case "svg":
          dataUrl = await toSvg(canvasRef.current, options);
          break;
        case "webp":
          // html-to-image doesn't have native webp, so we convert from png
          const pngData = await toPng(canvasRef.current, options);
          const img = new Image();
          img.src = pngData;
          await new Promise((resolve) => (img.onload = resolve));
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          dataUrl = canvas.toDataURL("image/webp", 0.95);
          break;
        default:
          dataUrl = await toPng(canvasRef.current, options);
      }

      const link = document.createElement("a");
      link.download = `${displayText.toLowerCase().replace(/\s+/g, "-")}-logo.${extension}`;
      link.href = dataUrl;
      link.click();

      incrementDownloadCount();
      toast.success("Logo downloaded! 🎉");
    } catch (error) {
      toast.error("Failed to download logo");
      console.error(error);
    }
  }, [displayText, downloadFormat]);

  const handleReset = () => {
    setText("YourLogo");
    setFontSize(48);
    setFontFamily("'Space Grotesk', sans-serif");
    setTextColor("#1a1a1a");
    setIcon("◆");
    setIconSize(40);
    setIconColor("#1a1a1a");
    setLayout("horizontal");
    setLetterSpacing(0.05);
    setIsUppercase(false);
    setDownloadFormat("png");
  };

  const formatOptions: { value: ImageFormat; label: string; description: string }[] = [
    { value: "png", label: "PNG", description: "Transparent background" },
    { value: "jpg", label: "JPG", description: "White background" },
    { value: "svg", label: "SVG", description: "Vector format" },
    { value: "webp", label: "WebP", description: "Modern format" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button variant="glow" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              Download {downloadFormat.toUpperCase()}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl shadow-medium border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="font-display font-semibold text-foreground">Preview</h2>
                </div>
                {/* Checkered background for transparency */}
                <div
                  className="relative"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
                      linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
                      linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
                    `,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }}
                >
                  <LogoCanvas
                    ref={canvasRef}
                    text={displayText}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    textColor={textColor}
                    icon={icon}
                    iconSize={iconSize}
                    iconColor={iconColor}
                    layout={layout}
                    letterSpacing={letterSpacing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="bg-card rounded-2xl shadow-soft border border-border p-6 space-y-6">
              <h2 className="font-display font-semibold text-foreground text-lg">Customize</h2>

              {/* Text Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Logo Text</label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your brand name"
                  className="bg-background border-border text-lg font-display"
                />
                <button
                  onClick={() => setIsUppercase(!isUppercase)}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    isUppercase
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <span className="text-xs">Aa</span>
                  {isUppercase ? "UPPERCASE ON" : "Uppercase off"}
                </button>
              </div>

              {/* Layout */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Layout</label>
                <div className="flex gap-2">
                  {(["horizontal", "vertical", "icon-only"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLayout(l)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        layout === l
                          ? "bg-foreground text-background"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {l === "icon-only" ? "Icon" : l.charAt(0).toUpperCase() + l.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font */}
              <FontSelector value={fontFamily} onChange={setFontFamily} />

              {/* Font Size */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Font Size: {fontSize}px
                </label>
                <Slider
                  value={[fontSize]}
                  onValueChange={([v]) => setFontSize(v)}
                  min={24}
                  max={120}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Letter Spacing */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Letter Spacing: {letterSpacing.toFixed(2)}em
                </label>
                <Slider
                  value={[letterSpacing * 100]}
                  onValueChange={([v]) => setLetterSpacing(v / 100)}
                  min={-10}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Text Color */}
              <ColorPicker value={textColor} onChange={setTextColor} label="Text Color" />

              {/* Icon */}
              <IconPicker value={icon} onChange={setIcon} />

              {/* Icon Color */}
              {icon && (
                <ColorPicker value={iconColor} onChange={setIconColor} label="Icon Color" />
              )}

              {/* Icon Size */}
              {icon && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Icon Size: {iconSize}px
                  </label>
                  <Slider
                    value={[iconSize]}
                    onValueChange={([v]) => setIconSize(v)}
                    min={20}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Download Section */}
            <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-foreground">Download Format</h3>
                <div className="grid grid-cols-2 gap-2">
                  {formatOptions.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setDownloadFormat(format.value)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        downloadFormat === format.value
                          ? "bg-foreground text-background"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      <div className="font-medium">{format.label}</div>
                      <div className={`text-xs ${downloadFormat === format.value ? "text-background/70" : "text-muted-foreground"}`}>
                        {format.description}
                      </div>
                    </button>
                  ))}
                </div>
                <Button variant="hero" className="w-full" onClick={handleDownload}>
                  <Download className="w-5 h-5" />
                  Finish & Download {downloadFormat.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
