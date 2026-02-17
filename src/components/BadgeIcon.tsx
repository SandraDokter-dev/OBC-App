import { 
  Hand, Target, Dumbbell, Weight, Star, Trophy, Flame, Sunrise, 
  Gem, Crown, Shield, Zap 
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "👋": Hand,
  "🎯": Target,
  "💪": Dumbbell,
  "🏋️": Weight,
  "⭐": Star,
  "🏆": Trophy,
  "🔥": Flame,
  "🌅": Sunrise,
  "💎": Gem,
  "👑": Crown,
  "🦁": Shield,
  "⚡": Zap,
};

interface BadgeIconProps {
  icon: string;
  name: string;
  earned: boolean;
}

const BadgeIcon = ({ icon, name, earned }: BadgeIconProps) => {
  const IconComponent = iconMap[icon] || Star;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        {/* Shield SVG */}
        <svg viewBox="0 0 80 92" className="w-16 h-[4.6rem]" fill="none">
          <defs>
            <linearGradient id={`grad-${name}-${earned}`} x1="0%" y1="0%" x2="100%" y2="100%">
              {earned ? (
                <>
                  <stop offset="0%" stopColor="hsl(174, 100%, 38%)" />
                  <stop offset="100%" stopColor="hsl(185, 80%, 50%)" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="hsl(195, 10%, 30%)" />
                  <stop offset="100%" stopColor="hsl(195, 10%, 22%)" />
                </>
              )}
            </linearGradient>
          </defs>
          {/* Shield path */}
          <path
            d="M40 2 L76 18 L76 50 Q76 72 40 90 Q4 72 4 50 L4 18 Z"
            fill={`url(#grad-${name}-${earned})`}
            stroke={earned ? "hsl(174, 100%, 50%)" : "hsl(195, 10%, 28%)"}
            strokeWidth="2"
            opacity={earned ? 1 : 0.4}
          />
          {/* Inner shield line */}
          <path
            d="M40 10 L68 23 L68 48 Q68 66 40 82 Q12 66 12 48 L12 23 Z"
            fill="none"
            stroke={earned ? "hsl(174, 80%, 60%)" : "hsl(195, 10%, 32%)"}
            strokeWidth="1"
            opacity={earned ? 0.4 : 0.2}
          />
        </svg>
        {/* Icon centered on shield */}
        <div className="absolute inset-0 flex items-center justify-center pb-1">
          <IconComponent 
            className={`w-6 h-6 ${
              earned ? "text-white drop-shadow-[0_0_6px_hsl(174,100%,50%)]" : "text-muted-foreground/40"
            }`} 
          />
        </div>
      </div>
      <span className={`text-[9px] text-center leading-tight max-w-[60px] ${
        earned ? "text-foreground" : "text-muted-foreground/40"
      }`}>
        {name}
      </span>
    </div>
  );
};

export default BadgeIcon;
