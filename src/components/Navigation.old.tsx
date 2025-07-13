import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  Calendar, 
  Building2, 
  Heart, 
  Trophy, 
  CalendarClock,
  Menu,
  X,
  Bell,
  User
} from "lucide-react";

interface NavigationProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

interface NavItem {
  id: string;
  name: string;
  icon: any;
  path: string;
}

export const Navigation = ({ onTabChange, activeTab }: NavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', name: "Home", icon: Home, path: "/" },
    { id: 'events', name: "Events", icon: Calendar, path: "/events" },
    { id: 'masjids', name: "Masjids", icon: Building2, path: "/masjids" },
    { id: 'prayer-times', name: "Prayer Times", icon: CalendarClock, path: "/prayer-times" },
    { id: 'following', name: "Following", icon: Heart, path: "/following" },
    { id: 'achievements', name: "Achievements", icon: Trophy, path: "/achievements" },
  ];

  const handleTabClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(item.path);
    if (onTabChange) {
      onTabChange(item.id);
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const currentTab = navItems.find(item => item.path === currentPath)?.id || 'home';
    if (onTabChange) {
      onTabChange(currentTab);
    }
  }, [location.pathname, onTabChange, navItems]);

  const getActiveTab = () => {
    if (activeTab) return activeTab;
    const currentPath = location.pathname;
    return navItems.find(item => item.path === currentPath)?.id || 'home';
  };

  const activeTabId = getActiveTab();

  useEffect(() => {
    document.body.style.paddingTop = '64px';
    return () => {
      document.body.style.paddingTop = '';
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-background/95 dark:backdrop-blur dark:border-border/30 border-b border-border h-16">
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-primary"
              >
                <path 
                  d="M12 2L2 7L12 12L22 7L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 17L12 22L22 17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12L12 17L22 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              DeenLink
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={(e) => handleTabClick(item, e)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-primary hover:bg-muted/50 h-10 px-4 py-2 ${
                  activeTabId === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-foreground" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="w-full cursor-pointer">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-foreground hover:bg-transparent hover:text-foreground/80"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div
      className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out md:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col space-y-4 p-4 pt-20">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-lg font-medium",
              activeTabId === item.id
                ? "bg-primary/10 text-primary"
                : "text-foreground/60 hover:bg-primary/5 hover:text-foreground/80"
            )}
            onClick={(e) => {
              handleTabClick(item, e);
              closeMenu();
            }}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
