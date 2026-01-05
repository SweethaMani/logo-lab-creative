import { forwardRef } from "react";

interface LogoCanvasProps {
  text: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  icon?: string;
  iconSize: number;
  layout: "horizontal" | "vertical" | "icon-only";
  letterSpacing: number;
}

const LogoCanvas = forwardRef<HTMLDivElement, LogoCanvasProps>(
  ({ text, fontSize, fontFamily, textColor, icon, iconSize, layout, letterSpacing }, ref) => {
    const renderContent = () => {
      if (layout === "icon-only" && icon) {
        return (
          <span style={{ fontSize: iconSize }} className="leading-none">
            {icon}
          </span>
        );
      }

      if (layout === "vertical") {
        return (
          <div className="flex flex-col items-center gap-2">
            {icon && (
              <span style={{ fontSize: iconSize }} className="leading-none">
                {icon}
              </span>
            )}
            <span
              style={{
                fontSize,
                fontFamily,
                color: textColor,
                letterSpacing: `${letterSpacing}em`,
              }}
              className="font-bold leading-tight"
            >
              {text}
            </span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-3">
          {icon && (
            <span style={{ fontSize: iconSize }} className="leading-none">
              {icon}
            </span>
          )}
          <span
            style={{
              fontSize,
              fontFamily,
              color: textColor,
              letterSpacing: `${letterSpacing}em`,
            }}
            className="font-bold leading-tight"
          >
            {text}
          </span>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className="flex items-center justify-center min-h-[300px] p-12"
        style={{ backgroundColor: "transparent" }}
      >
        {renderContent()}
      </div>
    );
  }
);

LogoCanvas.displayName = "LogoCanvas";

export default LogoCanvas;
