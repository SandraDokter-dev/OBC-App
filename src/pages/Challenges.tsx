import { motion } from "framer-motion";
import { Zap, Users, Clock } from "lucide-react";
import { challenges } from "@/data/mockData";

const Challenges = () => {
  return (
    <div className="px-4 pb-24 pt-6 max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-2">
        <Zap className="w-6 h-6 text-gold" />
        <h1 className="text-2xl font-bold text-foreground">Challenges</h1>
      </div>

      <div className="flex gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-medium gradient-streak text-primary-foreground">
          Alle
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          National
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          Lokal
        </span>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, i) => {
          const progressPercent = (challenge.progress / challenge.goal) * 100;
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{challenge.icon}</span>
                  <div>
                    <h3 className="font-bold text-foreground">{challenge.title}</h3>
                    <p className="text-xs text-muted-foreground">{challenge.description}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    challenge.type === "national"
                      ? "gradient-streak text-primary-foreground"
                      : "gradient-success text-accent-foreground"
                  }`}
                >
                  {challenge.type}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {challenge.progress} / {challenge.goal}
                  </span>
                  <span className="text-primary font-semibold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    className="h-full gradient-streak rounded-full"
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{challenge.participants} Teilnehmer</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Noch {challenge.daysLeft} Tage</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gold font-medium">🎁 {challenge.reward}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Challenges;
