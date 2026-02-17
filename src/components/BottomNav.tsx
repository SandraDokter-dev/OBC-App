import { NavLink, useLocation } from "react-router-dom";
import { Home, Trophy, Zap, User } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/leaderboard", icon: Trophy, label: "Ranking" },
  { to: "/challenges", icon: Zap, label: "Challenges" },
  { to: "/profile", icon: User, label: "Profil" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border">
      <div className="max-w-lg mx-auto flex justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col items-center gap-0.5 px-3 py-1 transition-colors"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full gradient-streak mt-0.5" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
