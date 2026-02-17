import { motion } from "framer-motion";
import { Flame, Trophy, TrendingUp, Zap } from "lucide-react";
import { currentUser, weekDays } from "@/data/mockData";
import ThemeToggle from "@/components/ThemeToggle";

const Dashboard = () => {
  const levelProgress =
    ((currentUser.totalPoints - currentUser.pointsForCurrentLevel) /
      (currentUser.pointsForNextLevel - currentUser.pointsForCurrentLevel)) *
    100;

  return (
    <div className="px-4 pb-24 pt-6 max-w-lg mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Hallo,</p>
          <h1 className="text-2xl font-bold text-foreground">{currentUser.name} 👋</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{currentUser.camp}</p>
            <p className="text-xs text-muted-foreground">Trainer: {currentUser.trainer}</p>
          </div>
        </div>
      </div>

      {/* Level Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="gradient-card rounded-2xl p-5 border border-border glow-streak"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-streak flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">{currentUser.level}</span>
            </div>
            <div>
              <p className="font-bold text-foreground">{currentUser.levelName}</p>
              <p className="text-xs text-muted-foreground">{currentUser.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gradient-streak">{currentUser.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Punkte</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Level {currentUser.level}</span>
            <span>Level {currentUser.level + 1}</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full gradient-streak rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Noch <span className="text-primary font-semibold">{currentUser.pointsToNextLevel}</span> Punkte bis Level{" "}
            {currentUser.level + 1}
          </p>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gradient-card rounded-xl p-3 border border-border text-center"
        >
          <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">{currentUser.streak}</p>
          <p className="text-[10px] text-muted-foreground">Wochen Streak</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gradient-card rounded-xl p-3 border border-border text-center"
        >
          <Trophy className="w-5 h-5 text-gold mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">#{currentUser.rank}</p>
          <p className="text-[10px] text-muted-foreground">Camp Rang</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gradient-card rounded-xl p-3 border border-border text-center"
        >
          <TrendingUp className="w-5 h-5 text-success mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">{currentUser.totalTrainings}</p>
          <p className="text-[10px] text-muted-foreground">Trainings</p>
        </motion.div>
      </div>

      {/* Weekly Streak */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="gradient-card rounded-2xl p-5 border border-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground">Diese Woche</h2>
          <span className="ml-auto text-sm text-primary font-semibold">KW 7</span>
        </div>
        <div className="flex justify-between">
          {weekDays.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${
                  d.trained
                    ? "gradient-streak text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {d.trained ? "✓" : d.date.split(".")[0]}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Challenge Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="gradient-card rounded-2xl p-5 border border-border"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-gold" />
          <h2 className="font-bold text-foreground">Aktive Challenge</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">🔥 Februar Durchzieher</p>
            <p className="text-xs text-muted-foreground">8 von 12 Trainings</p>
          </div>
          <div className="w-14 h-14 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="3"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeDasharray="66.7, 100"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: "66.7, 100" }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">67%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
