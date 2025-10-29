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
    <Card className="p-4 hover:shadow-2xl hover:shadow-primary/30 transition-all border-2 border-primary/20 hover:border-primary/60 rounded-3xl">
      <Button
        variant="tactile"
        size="lg"
        onClick={() => navigate(route)}
        className="w-full h-auto flex-col gap-6 py-10 rounded-3xl"
        aria-label={ariaLabel}
      >
        <Icon className="h-20 w-20" aria-hidden="true" />
        <div className="text-center space-y-2">
          <h3 className="text-accessible-xl font-bold">{title}</h3>
          <p className="text-accessible-sm text-muted-foreground font-normal">{description}</p>
        </div>
      </Button>
    </Card>
  );
};
