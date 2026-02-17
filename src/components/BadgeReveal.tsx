import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Hand, Target, Dumbbell, Weight, Star, Trophy, Flame, Sunrise,
  Gem, Crown, Shield, Zap
} from "lucide-react";
import { useEffect, useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "👋": Hand, "🎯": Target, "💪": Dumbbell, "🏋️": Weight,
  "⭐": Star, "🏆": Trophy, "🔥": Flame, "🌅": Sunrise,
  "💎": Gem, "👑": Crown, "🦁": Shield, "⚡": Zap,
};

interface BadgeRevealProps {
  badge: { icon: string; name: string; earned: boolean; description: string } | null;
  onClose: () => void;
}

const Particle = ({ delay, angle, distance }: { delay: number; angle: number; distance: number }) => {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance;

  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        background: `hsl(${174 + Math.random() * 30}, 100%, ${50 + Math.random() * 20}%)`,
        top: "50%",
        left: "50%",
      }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, x * 0.5, x],
        y: [0, y * 0.5, y],
        scale: [0, 1.5, 0],
      }}
      transition={{ duration: 1.2, delay: 0.4 + delay, ease: "easeOut" }}
    />
  );
};

const BadgeReveal = ({ badge, onClose }: BadgeRevealProps) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (badge) {
      setShowDetails(false);
      const t = setTimeout(() => setShowDetails(true), 800);
      return () => clearTimeout(t);
    }
  }, [badge]);

  if (!badge) return null;

  const IconComponent = iconMap[badge.icon] || Star;
  const particles = Array.from({ length: 16 }, (_, i) => ({
    angle: (360 / 16) * i + Math.random() * 15,
    distance: 80 + Math.random() * 40,
    delay: Math.random() * 0.3,
  }));

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Particles */}
            {badge.earned && (
              <div className="absolute inset-0 pointer-events-none">
                {particles.map((p, i) => (
                  <Particle key={i} {...p} />
                ))}
              </div>
            )}

            {/* Glow ring */}
            {badge.earned && (
              <motion.div
                className="absolute w-44 h-44 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(174 100% 42% / 0.3) 0%, transparent 70%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1.2],
                  opacity: [0, 0.8, 0.4],
                }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            )}

            {/* Badge – 3D flip */}
            <motion.div
              className="relative"
              initial={{ rotateY: -360, scale: 0.5 }}
              animate={{ rotateY: 0, scale: 1 }}
              transition={{
                rotateY: { duration: 1.2, ease: [0.34, 1.2, 0.64, 1] },
                scale: { duration: 0.6, ease: "easeOut" },
              }}
              style={{ perspective: 600, transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 80 92" className="w-32 h-[9.2rem]" fill="none">
                <defs>
                  <linearGradient id="reveal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    {badge.earned ? (
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
                  {badge.earned && (
                    <filter id="badge-glow">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  )}
                </defs>
                <path
                  d="M40 2 L76 18 L76 50 Q76 72 40 90 Q4 72 4 50 L4 18 Z"
                  fill="url(#reveal-grad)"
                  stroke={badge.earned ? "hsl(174, 100%, 55%)" : "hsl(195, 10%, 28%)"}
                  strokeWidth="2.5"
                  filter={badge.earned ? "url(#badge-glow)" : undefined}
                />
                <path
                  d="M40 10 L68 23 L68 48 Q68 66 40 82 Q12 66 12 48 L12 23 Z"
                  fill="none"
                  stroke={badge.earned ? "hsl(174, 80%, 65%)" : "hsl(195, 10%, 32%)"}
                  strokeWidth="1"
                  opacity={badge.earned ? 0.5 : 0.2}
                />
              </svg>

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center pb-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                >
                  <IconComponent
                    className={`w-12 h-12 ${
                      badge.earned
                        ? "text-white drop-shadow-[0_0_12px_hsl(174,100%,50%)]"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="text-center mt-5 space-y-1.5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 15 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white">{badge.name}</h3>
              <p className="text-sm text-white/60">{badge.description}</p>
              {badge.earned ? (
                <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                  Freigeschaltet ✓
                </span>
              ) : (
                <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10">
                  Noch nicht verdient
                </span>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeReveal;
