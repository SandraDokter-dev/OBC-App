import { motion } from "framer-motion";
import { useState } from "react";
import { User, Flame, Trophy, Calendar, TrendingUp } from "lucide-react";
import { currentUser, badges, trainingHistory } from "@/data/mockData";
import BadgeIcon from "@/components/BadgeIcon";
import BadgeReveal from "@/components/BadgeReveal";

const Profile = () => {
  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);
  const [selectedBadge, setSelectedBadge] = useState<typeof badges[0] | null>(null);

  return (
    <div className="px-4 pb-24 pt-6 max-w-lg mx-auto space-y-5">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-card rounded-2xl p-5 border border-border text-center"
      >
        <div className="w-20 h-20 rounded-full gradient-streak mx-auto mb-3 flex items-center justify-center glow-streak">
          <span className="text-2xl font-bold text-primary-foreground">MM</span>
        </div>
        <h1 className="text-xl font-bold text-foreground">{currentUser.name}</h1>
        <p className="text-sm text-muted-foreground">{currentUser.camp}</p>
        <p className="text-xs text-muted-foreground">Mitglied seit {currentUser.memberSince}</p>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div>
            <p className="text-lg font-bold text-foreground">{currentUser.totalTrainings}</p>
            <p className="text-[10px] text-muted-foreground">Trainings</p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary">{currentUser.streak}</p>
            <p className="text-[10px] text-muted-foreground">Streak</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gold">{earnedBadges.length}</p>
            <p className="text-[10px] text-muted-foreground">Badges</p>
          </div>
        </div>
      </motion.div>

      {/* Trainingshistorie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="gradient-card rounded-2xl p-5 border border-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground">Trainingshistorie</h2>
        </div>
        <div className="space-y-2">
          {trainingHistory.map((week, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-12">{week.week}</span>
              <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(week.trainings / week.target) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                  className={`h-full rounded-full ${
                    week.trainings >= week.target ? "gradient-success" : "gradient-streak"
                  }`}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8">
                {week.trainings}/{week.target}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="gradient-card rounded-2xl p-5 border border-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-gold" />
          <h2 className="font-bold text-foreground">Badges</h2>
          <span className="ml-auto text-xs text-muted-foreground">
            {earnedBadges.length}/{badges.length}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.03 }}
              className="cursor-pointer"
              onClick={() => setSelectedBadge(badge)}
            >
              <BadgeIcon icon={badge.icon} name={badge.name} earned={badge.earned} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Badge Reveal Modal */}
      <BadgeReveal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="gradient-card rounded-2xl p-5 border border-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-success" />
          <h2 className="font-bold text-foreground">Statistiken</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: "Gesamtpunkte", value: currentUser.totalPoints.toLocaleString(), color: "text-primary" },
            { label: "Längster Streak", value: `${currentUser.longestStreak} Wochen`, color: "text-primary" },
            { label: "Camp-Rang", value: `#${currentUser.rank} von ${currentUser.campSize}`, color: "text-gold" },
            { label: "Level", value: `${currentUser.level} – ${currentUser.levelName}`, color: "text-success" },
          ].map((stat) => (
            <div key={stat.label} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
