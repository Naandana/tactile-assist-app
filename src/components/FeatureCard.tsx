import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  route: string;
  ariaLabel: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  route,
  ariaLabel,
}: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 hover:shadow-xl hover:shadow-primary/20 transition-all">
      <Button
        variant="tactile"
        size="lg"
        onClick={() => navigate(route)}
        className="w-full h-auto flex-col gap-4 py-8"
        aria-label={ariaLabel}
      >
        <Icon className="h-16 w-16" aria-hidden="true" />
        <div className="text-center space-y-2">
          <h3 className="text-accessible-lg font-bold">{title}</h3>
          <p className="text-accessible-sm text-muted-foreground">{description}</p>
        </div>
      </Button>
    </Card>
  );
};
