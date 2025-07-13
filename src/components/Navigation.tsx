import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
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
  LogOut
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export default function Navigation({ onTabChange, activeTab }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'home', name: 'Home', icon: Home, path: '/' },
    { id: 'events', name: 'Events', icon: Calendar, path: '/events' },
    { id: 'masjids', name: 'Masjids', icon: Building2, path: '/masjids' },
    { id: 'prayer-times', name: 'Prayer Times', icon: CalendarClock, path: '/prayer-times' },
    { id: 'following', name: 'Following', icon: Heart, path: '/following' },
    { id: 'achievements', name: 'Achievements', icon: Trophy, path: '/achievements' },
  ];

  // Get active tab based on URL or prop
  const activeTabId = activeTab || 
    navItems.find(item => item.path === location.pathname)?.id || 
    'home';

  // Update parent component when tab changes
  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTabId);
    }
  }, [activeTabId, onTabChange]);

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
    navigate(item.path);
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
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="secondary" className="absolute -right-1 -top-1 h-4 w-4 justify-center p-0 text-[10px]">
                3
              </Badge>
            </Button>

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
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="w-full cursor-pointer flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
