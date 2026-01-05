import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoCounter from "@/components/LogoCounter";

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">◆</span>
            <span className="font-display font-bold text-xl text-foreground">logomkr</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div
          className={`max-w-2xl mx-auto text-center space-y-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
              Ship your brand
              <br />
              <span className="text-gradient">in seconds</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The fastest way to create a logo for your startup. No design skills needed. Just vibes.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/editor")}
              className="group"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Click to make a logo
            </Button>
            <p className="text-sm text-muted-foreground">
              Free forever · No signup required
            </p>
          </div>

          {/* Counter */}
          <LogoCounter />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Made with ◆ for the next generation of founders
        </div>
      </footer>
    </div>
  );
};

export default Index;
