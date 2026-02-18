// Mock data for the OBC Durchzieher Dashboard

export const currentUser = {
  name: "Max Müller",
  camp: "Köln Stadtwald",
  trainer: "Sarah K.",
  level: 7,
  levelName: "Durchzieher",
  category: "Silber",
  totalPoints: 2450,
  pointsToNextLevel: 550,
  pointsForCurrentLevel: 2000,
  pointsForNextLevel: 3000,
  streak: 12,
  longestStreak: 18,
  totalTrainings: 156,
  memberSince: "März 2024",
  rank: 3,
  campSize: 24,
};

export const weekDays = [
  { day: "Mo", trained: true, date: "10.02" },
  { day: "Di", trained: false, date: "11.02" },
  { day: "Mi", trained: true, date: "12.02" },
  { day: "Do", trained: false, date: "13.02" },
  { day: "Fr", trained: true, date: "14.02" },
  { day: "Sa", trained: false, date: "15.02" },
  { day: "So", trained: false, date: "16.02" },
];

export const leaderboard = [
  { rank: 1, name: "Camp Rheinpark", city: "Köln", members: 32, points: 28400, avgStreak: 14, icon: "🏕️", isUserCamp: false },
  { rank: 2, name: "Camp Stadtwald", city: "Köln", members: 24, points: 26200, avgStreak: 12, icon: "🌲", isUserCamp: true },
  { rank: 3, name: "Camp Südstadt", city: "Köln", members: 28, points: 24800, avgStreak: 11, icon: "🔥", isUserCamp: false },
  { rank: 4, name: "Camp Ehrenfeld", city: "Köln", members: 22, points: 22100, avgStreak: 9, icon: "⚡", isUserCamp: false },
  { rank: 5, name: "Camp Nippes", city: "Köln", members: 26, points: 20500, avgStreak: 8, icon: "💪", isUserCamp: false },
  { rank: 6, name: "Camp Deutz", city: "Köln", members: 20, points: 18900, avgStreak: 7, icon: "🏋️", isUserCamp: false },
  { rank: 7, name: "Camp Lindenthal", city: "Köln", members: 18, points: 17200, avgStreak: 10, icon: "🌿", isUserCamp: false },
  { rank: 8, name: "Camp Mülheim", city: "Köln", members: 30, points: 15800, avgStreak: 6, icon: "🎯", isUserCamp: false },
  { rank: 9, name: "Camp Sülz", city: "Köln", members: 16, points: 14300, avgStreak: 5, icon: "⭐", isUserCamp: false },
  { rank: 10, name: "Camp Kalk", city: "Köln", members: 21, points: 12700, avgStreak: 4, icon: "🦁", isUserCamp: false },
];

export const challenges = [
  {
    id: 1,
    title: "Februar Durchzieher",
    description: "Trainiere mindestens 12x im Februar",
    type: "national" as const,
    progress: 8,
    goal: 12,
    participants: 1247,
    daysLeft: 15,
    reward: "Gold-Badge + 500 XP",
    icon: "🔥",
  },
  {
    id: 2,
    title: "Frühaufsteher Challenge",
    description: "5 Trainings vor 7:00 Uhr",
    type: "national" as const,
    progress: 3,
    goal: 5,
    participants: 834,
    daysLeft: 22,
    reward: "Silber-Badge + 300 XP",
    icon: "🌅",
  },
  {
    id: 3,
    title: "Stadtwald Showdown",
    description: "Camp Stadtwald vs. Camp Rheinpark",
    type: "lokal" as const,
    progress: 67,
    goal: 100,
    participants: 48,
    daysLeft: 8,
    reward: "Camp-Pokal + 200 XP",
    icon: "⚔️",
  },
];

export const badges = [
  { id: 1, name: "Willkommen", icon: "👋", earned: true, description: "Erstes Login" },
  { id: 2, name: "Erste Woche", icon: "🎯", earned: true, description: "7 Tage dabei" },
  { id: 3, name: "10er Serie", icon: "💪", earned: true, description: "10 Trainings" },
  { id: 4, name: "25er Serie", icon: "🏋️", earned: true, description: "25 Trainings" },
  { id: 5, name: "50er Serie", icon: "⭐", earned: true, description: "50 Trainings" },
  { id: 6, name: "100er Serie", icon: "🏆", earned: true, description: "100 Trainings" },
  { id: 7, name: "Durchzieher", icon: "🔥", earned: true, description: "12 Wochen Streak" },
  { id: 8, name: "Frühaufsteher", icon: "🌅", earned: true, description: "5x vor 7 Uhr" },
  { id: 9, name: "150er Serie", icon: "💎", earned: true, description: "150 Trainings" },
  { id: 10, name: "200er Serie", icon: "👑", earned: false, description: "200 Trainings" },
  { id: 11, name: "Legendär", icon: "🦁", earned: false, description: "Level 10 erreicht" },
  { id: 12, name: "Unaufhaltsam", icon: "⚡", earned: false, description: "26 Wochen Streak" },
];

export const levelNames: Record<number, { name: string; category: string }> = {
  1: { name: "Rookie", category: "Bronze" },
  2: { name: "Starter", category: "Bronze" },
  3: { name: "Fighter", category: "Bronze" },
  4: { name: "Warrior", category: "Silber" },
  5: { name: "Athlete", category: "Silber" },
  6: { name: "Champion", category: "Silber" },
  7: { name: "Durchzieher", category: "Silber" },
  8: { name: "Elite", category: "Gold" },
  9: { name: "Master", category: "Gold" },
  10: { name: "Legende", category: "Gold" },
};

export const trainingHistory = [
  { week: "KW 6", trainings: 3, target: 3 },
  { week: "KW 5", trainings: 3, target: 3 },
  { week: "KW 4", trainings: 2, target: 3 },
  { week: "KW 3", trainings: 3, target: 3 },
  { week: "KW 2", trainings: 3, target: 3 },
  { week: "KW 1", trainings: 3, target: 3 },
  { week: "KW 52", trainings: 2, target: 3 },
  { week: "KW 51", trainings: 3, target: 3 },
];
