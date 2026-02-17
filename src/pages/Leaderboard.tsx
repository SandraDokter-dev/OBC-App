import { motion } from "framer-motion";
import { Trophy, Flame, Medal } from "lucide-react";
import { leaderboard } from "@/data/mockData";
import { useState } from "react";

const timeFilters = ["Woche", "Monat", "All-Time"] as const;
const scopeFilters = ["Camp", "Stadt", "National"] as const;

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<string>("Monat");
  const [scopeFilter, setScopeFilter] = useState<string>("Camp");

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
        <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
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
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, i) => {
          const heights = ["h-20", "h-28", "h-16"];
          const sizes = ["w-12 h-12", "w-16 h-16", "w-12 h-12"];
          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div
                className={`${sizes[i]} rounded-full ${
                  user.isCurrentUser ? "gradient-streak glow-streak" : "bg-secondary"
                } flex items-center justify-center mb-2`}
              >
                <span className={`font-bold ${user.isCurrentUser ? "text-primary-foreground" : "text-foreground"}`}>
                  {user.avatar}
                </span>
              </div>
              <p className={`text-xs font-semibold mb-1 ${user.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                {user.name.split(" ")[0]}
              </p>
              <p className="text-[10px] text-muted-foreground">{user.points} Pkt</p>
              <div className={`${heights[i]} w-16 mt-2 rounded-t-lg ${
                user.rank === 1 ? "gradient-gold" : "bg-secondary"
              } flex items-start justify-center pt-2`}>
                {getRankIcon(user.rank)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full List */}
      <div className="space-y-2">
        {leaderboard.slice(3).map((user, i) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              user.isCurrentUser ? "gradient-card border border-primary glow-streak" : "gradient-card border border-border"
            }`}
          >
            <span className="text-sm text-muted-foreground font-bold w-6 text-center">
              {user.rank}
            </span>
            <div
              className={`w-9 h-9 rounded-full ${
                user.isCurrentUser ? "gradient-streak" : "bg-secondary"
              } flex items-center justify-center`}
            >
              <span className={`text-xs font-bold ${user.isCurrentUser ? "text-primary-foreground" : "text-foreground"}`}>
                {user.avatar}
              </span>
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${user.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                {user.name}
              </p>
              <div className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground">{user.streak}W Streak</span>
              </div>
            </div>
            <p className="text-sm font-bold text-foreground">{user.points}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
