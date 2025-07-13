import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "../hooks/use-auth";
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
  User,
  Moon,
  Sun,
  Settings,
  LogOut,
  LogIn,
  UserPlus
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type NavItem = {
  id: string;
  name: string;
  icon: React.ElementType;
  path: string;
};

type NavigationProps = {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
};

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'home', name: 'Home', icon: Home, path: '/' },
    { id: 'events', name: 'Events', icon: Calendar, path: '/events' },
    { id: 'masjids', name: 'Masjids', icon: Building2, path: '/masjids' },
    { id: 'prayer-times', name: 'Prayer Times', icon: CalendarClock, path: '/prayer-times' },
    { id: 'following', name: 'Following', icon: Heart, path: '/following' },
    { id: 'achievements', name: 'Achievements', icon: Trophy, path: '/achievements' },
  ];

  // Get active tab based on URL path
  const activeTabId = navItems.find(item => item.path === location.pathname)?.id || 'home';

  // Add padding to body to account for fixed header
  useEffect(() => {
    document.body.style.paddingTop = '4rem';
    return () => {
      document.body.style.paddingTop = '';
    };
  }, []);

  // Handle navigation
  const handleNavigation = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== item.path) {
      navigate(item.path);
    }
    setIsMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close mobile menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Main Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              DeenLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTabId === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 px-3 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                  onClick={(e) => handleNavigation(item, e)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge variant="secondary" className="absolute -right-1 -top-1 h-4 w-4 justify-center p-0 text-[10px]">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h4 className="font-medium">Notifications</h4>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
                        Mark all as read
                      </Button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {/* Sample notification items */}
                      <DropdownMenuItem className="flex items-start gap-3 p-3 border-b hover:bg-accent/50 cursor-pointer">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New Event</p>
                          <p className="text-xs text-muted-foreground">Jumu'ah prayer at Masjid Al-Noor starts in 1 hour</p>
                          <span className="text-xs text-muted-foreground">2 min ago</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary mt-1"></div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-start gap-3 p-3 border-b hover:bg-accent/50 cursor-pointer">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Trophy className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Achievement Unlocked</p>
                          <p className="text-xs text-muted-foreground">You've attended 5 events this month!</p>
                          <span className="text-xs text-muted-foreground">1 hour ago</span>
                        </div>
                      </DropdownMenuItem>
                    </div>
                    <div className="p-2 border-t text-center">
                      <Button variant="ghost" size="sm" className="text-sm text-primary">
                        View all notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => logout()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth?tab=login" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth?tab=signup" className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out md:hidden',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-full flex-col space-y-4 p-4 pt-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTabId === item.id;

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start text-base',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  )}
                  onClick={(e) => {
                    handleNavigation(item, e);
                    closeMenu();
                  }}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="h-16" />
    </>
  );
}
