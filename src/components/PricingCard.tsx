import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Feature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  subtitle: string;
  description?: string;
  price: string;
  period?: string;
  priceNote?: string;
  originalPrice?: string;
  features: Feature[];
  popular?: boolean;
  buttonVariant?: "default" | "secondary";
}

const PricingCard = ({
  title,
  subtitle,
  description,
  price,
  period,
  priceNote,
  originalPrice,
  features,
  popular = false,
  buttonVariant = "default",
}: PricingCardProps) => {
  const navigate = useNavigate();

  const handleSelectPlan = () => {
    const includedFeatures = features
      .filter((f) => f.included)
      .map((f) => f.text);

    navigate("/checkout", {
      state: {
        title,
        price,
        period,
        features: includedFeatures,
      },
    });
  };
  return (
    <div className="relative">
      {popular && (
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-secondary to-[hsl(340,80%,55%)] text-white px-8 py-2 rounded-full text-sm font-bold shadow-lg">
            Most Popular
          </div>
        </div>
      )}
      
      <Card
        className={`transition-all duration-300 hover:shadow-xl ${
          popular ? "border-secondary shadow-[0_0_30px_rgba(var(--secondary),0.2)]" : ""
        }`}
      >
        <div className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{subtitle}</p>
          {description && (
            <p className="text-sm font-medium text-foreground/80 italic">
              {description}
            </p>
          )}
        </div>

        <div className="text-center mb-6">
          {originalPrice && (
            <p className="text-sm text-muted-foreground mb-2">
              Original: {originalPrice}
            </p>
          )}
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-[hsl(280,60%,45%)] bg-clip-text text-transparent">
              {price}
            </span>
            {period && <span className="text-muted-foreground">/{period}</span>}
          </div>
          {priceNote && (
            <p className="text-xs text-muted-foreground mt-1">{priceNote}</p>
          )}
        </div>

        <Button
          onClick={handleSelectPlan}
          className={`w-full mb-6 h-12 text-base font-semibold ${
            buttonVariant === "secondary"
              ? "bg-gradient-to-r from-secondary to-[hsl(340,80%,55%)] hover:opacity-90"
              : "bg-gradient-to-r from-primary to-[hsl(280,60%,45%)] hover:opacity-90"
          }`}
        >
          Select Plan
        </Button>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={`mt-0.5 rounded-full p-0.5 ${
                  feature.included
                    ? "bg-gradient-to-br from-primary/20 to-primary/10"
                    : "bg-muted"
                }`}
              >
                {feature.included ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <span
                className={`text-sm ${
                  feature.included ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
        </div>
      </Card>
    </div>
  );
};

export default PricingCard;
