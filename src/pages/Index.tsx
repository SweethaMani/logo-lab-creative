import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/TypewriterText";

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
            <span className="font-display font-bold text-xl text-foreground">LogoMaker</span>
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
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight">
              Create a professional logo in under 10 seconds.
            </h1>
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-medium text-foreground/90">
                No design skills. No signup. Just type your brand name.
              </p>
              <p className="text-lg md:text-xl text-primary font-medium">
                Generate clean, modern logos—ready to use anywhere.
              </p>
            </div>
            <div className="text-2xl md:text-3xl font-display font-bold text-gradient">
              <TypewriterText text="Try LogoMaker" delay={120} />
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/editor")}
              className="group hover:scale-105 hover:shadow-glow transition-all duration-300"
            >
              Make a logo in seconds
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Live demo — try it now
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                No account needed
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Instant preview
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-2">
          <p>Made with ◆ by Lovable · Logo appears instantly</p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/SweethaMani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors underline"
            >
              SweethaMani
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
