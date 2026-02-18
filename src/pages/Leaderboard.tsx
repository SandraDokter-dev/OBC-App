import { motion } from "framer-motion";
import { Trophy, Flame, Users } from "lucide-react";
import { leaderboard } from "@/data/mockData";
import { useState } from "react";

const timeFilters = ["Woche", "Monat", "All-Time"] as const;
const scopeFilters = ["Stadt", "Region", "National"] as const;

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<string>("Monat");
  const [scopeFilter, setScopeFilter] = useState<string>("Stadt");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-lg">🥇</span>;
    if (rank === 2) return <span className="text-lg">🥈</span>;
    if (rank === 3) return <span className="text-lg">🥉</span>;
    return <span className="text-sm text-muted-foreground font-bold">#{rank}</span>;
  };

  return (
    <div className="px-4 pb-24 pt-6 max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-gold" />
        <h1 className="text-2xl font-bold text-foreground">Camp Ranking</h1>
      </div>

      {/* Scope Filter */}
      <div className="flex gap-2">
        {scopeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setScopeFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              scopeFilter === f
                ? "gradient-streak text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Time Filter */}
      <div className="flex gap-2">
        {timeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setTimeFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              timeFilter === f
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-3 pt-4 pb-2">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((camp, i) => {
          const heights = ["h-20", "h-28", "h-16"];
          const sizes = ["w-14 h-14", "w-14 h-14", "w-14 h-14"];
          return (
            <motion.div
              key={camp.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div
                className={`${sizes[i]} rounded-2xl ${
                  camp.isUserCamp ? "gradient-streak glow-streak" : "bg-secondary"
                } flex items-center justify-center mb-2`}
              >
                <span className="text-2xl">{camp.icon}</span>
              </div>
              <p className={`text-xs font-semibold mb-0.5 text-center leading-tight ${camp.isUserCamp ? "text-primary" : "text-foreground"}`}>
                {camp.name.replace("Camp ", "")}
              </p>
              <p className="text-[10px] text-muted-foreground">{camp.points.toLocaleString()} Pkt</p>
              <div className={`${heights[i]} w-16 mt-2 rounded-t-lg ${
                camp.rank === 1 ? "gradient-gold" : "bg-secondary"
              } flex items-start justify-center pt-2`}>
                {getRankIcon(camp.rank)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full List */}
      <div className="space-y-2">
        {leaderboard.slice(3).map((camp, i) => (
          <motion.div
            key={camp.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              camp.isUserCamp ? "gradient-card border border-primary glow-streak" : "gradient-card border border-border"
            }`}
          >
            <span className="text-sm text-muted-foreground font-bold w-6 text-center">
              {camp.rank}
            </span>
            <div
              className={`w-10 h-10 rounded-xl ${
                camp.isUserCamp ? "gradient-streak" : "bg-secondary"
              } flex items-center justify-center`}
            >
              <span className="text-lg">{camp.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${camp.isUserCamp ? "text-primary" : "text-foreground"}`}>
                {camp.name}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{camp.members}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-primary" />
                  <span className="text-[10px] text-muted-foreground">Ø {camp.avgStreak}W</span>
                </div>
              </div>
            </div>
            <p className="text-sm font-bold text-foreground">{camp.points.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
