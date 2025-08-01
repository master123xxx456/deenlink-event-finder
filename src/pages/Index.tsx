import { useState, useEffect, useRef } from "react";
import { Link, useLocation as useRouterLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import Navigation from "../components/Navigation";
import { FloatingChatBot } from "../components/FloatingChatBot";
import PrayerTimes from "../components/PrayerTimes";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Building2, 
  Search, 
  Star, 
  Clock,
  TrendingUp,
  Heart,
  Trophy,
  Clock3
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  masjid: string;
  date: string;
  time: string;
  category: string;
  attendees: number;
  isRegistered: boolean;
  recommendationType: "personalized" | "local" | "following";
  distance: string;
}

const Index = () => {
  const [userLocation, setUserLocation] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useRouterLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("home");
  const prayerTimesRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  // Handle route changes
  useEffect(() => {
    if (location.pathname === '/prayer-times') {
      setActiveTab('prayer-times');
      // Small timeout to ensure the DOM has updated
      setTimeout(() => {
        prayerTimesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      setActiveTab('home');
    }
  }, [location.pathname]);

  // Handle tab change from Navigation component
  const handleTabChange = (tab: string) => {
    if (!isMounted.current) return;
    
    setActiveTab(tab);
    if (tab === 'prayer-times') {
      navigate('/prayer-times');
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Set mounted flag after initial render
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Mock featured events with different recommendation types
  const featuredEvents: Event[] = [
    {
      id: "1",
      title: "Friday Night Youth Program",
      masjid: "Islamic Center of Maryland (ICM)",
      date: "Dec 15, 2024",
      time: "7:00 PM",
      category: "Youth",
      attendees: 45,
      isRegistered: false,
      recommendationType: "personalized",
      distance: "2.3 miles"
    },
    {
      id: "2",
      title: "Halaqa: Stories of the Prophets",
      masjid: "ADAMS Center",
      date: "Dec 16, 2024",
      time: "2:00 PM",
      category: "Education",
      attendees: 32,
      isRegistered: true,
      recommendationType: "following",
      distance: "4.1 miles"
    },
    {
      id: "3",
      title: "Family Sports Day & BBQ",
      masjid: "Dar-us-Salaam",
      date: "Dec 17, 2024",
      time: "12:00 PM",
      category: "Family",
      attendees: 78,
      isRegistered: false,
      recommendationType: "local",
      distance: "1.8 miles"
    },
    {
      id: "4",
      title: "Arabic Language Workshop",
      masjid: "Islamic Center of Maryland (ICM)",
      date: "Dec 18, 2024",
      time: "6:30 PM",
      category: "Education",
      attendees: 28,
      isRegistered: false,
      recommendationType: "personalized",
      distance: "2.3 miles"
    }
  ];

  const categories = [
    { name: "Arabic Classes", icon: "📚", count: 12 },
    { name: "Youth Programs", icon: "👥", count: 8 },
    { name: "Family Events", icon: "👨‍👩‍👧‍👦", count: 15 },
    { name: "Physical Activity", icon: "⚽", count: 6 },
    { name: "Study Circles", icon: "📖", count: 9 },
    { name: "Community Service", icon: "🤝", count: 4 },
    { name: "Celebrations", icon: "🎉", count: 3 },
    { name: "Fundraisers", icon: "💝", count: 7 }
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Set Gaithersburg, MD as the default location
  const [defaultLocation] = useState("Gaithersburg, MD");

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // In a real app, you would use a geocoding service here
            // For now, we'll use the default location
            setUserLocation(defaultLocation);
          } catch (error) {
            console.error("Error processing location:", error);
            setUserLocation(defaultLocation); // Fallback to default on error
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserLocation(defaultLocation); // Use default location if geolocation fails
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      // If geolocation is not supported, use the default location
      setUserLocation(defaultLocation);
      setIsLoadingLocation(false);
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case "personalized": return "bg-personalized text-personalized-foreground";
      case "local": return "bg-local text-local-foreground";
      case "following": return "bg-following text-following-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getRecommendationLabel = (type: string) => {
    switch (type) {
      case "personalized": return "For You";
      case "local": return "Nearby";
      case "following": return "Following";
      default: return "Recommended";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onTabChange={handleTabChange} activeTab={activeTab} />
      
      {activeTab === 'prayer-times' ? (
        <div id="prayer-times" ref={prayerTimesRef} className="pt-16 min-h-[80vh]">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock3 className="w-6 h-6" />
                Prayer Times
              </h2>
            </div>
            <PrayerTimes />
          </div>
        </div>
      ) : (
        <div>
          {/* Hero Section */}
          <section className="relative py-20 px-4 bg-gradient-hero overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-foreground mb-6">
            Stay Connected to Your{" "}
            <span className="text-accent dark:text-accent-foreground drop-shadow-lg">Deen</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 dark:text-foreground/90 mb-8 max-w-3xl mx-auto">
            Discover Islamic events at local masjids and connect with your community across the U.S.
          </p>
          
          {/* Location Display */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <MapPin className="w-5 h-5 text-white dark:text-foreground" />
            <span className="text-white dark:text-foreground">
              {isLoadingLocation ? "Finding your location..." : `Near ${userLocation}`}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={getCurrentLocation}
              className="text-white dark:text-foreground hover:bg-white/20 dark:hover:bg-foreground/10"
            >
              Update
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 dark:text-foreground/80" />
              <Input
                placeholder="Search events, masjids, or ask our AI assistant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white/95 dark:bg-black backdrop-blur border-white/20 dark:border-foreground/20 rounded-xl
                  text-foreground dark:text-white
                  placeholder:text-muted-foreground/80 dark:placeholder:text-gray-400
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              asChild 
              className="text-white border border-white hover:bg-transparent hover:border-white/70 hover:text-white"
            >
              <Link to="/auth" className="hover:no-underline">Join DeenLink</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">150+</div>
              <div className="text-muted-foreground">Partner Masjids</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1,200+</div>
              <div className="text-muted-foreground">Monthly Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">25,000+</div>
              <div className="text-muted-foreground">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Events</h2>
            <Button variant="outline" asChild>
              <Link to="/events">View All Events</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-card transition-shadow cursor-pointer bg-gradient-card border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge className={`text-xs ${getRecommendationColor(event.recommendationType)}`}>
                      {getRecommendationLabel(event.recommendationType)}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{event.distance}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{event.masjid}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{event.attendees} attending</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                      <Button size="sm" className={event.isRegistered ? "bg-success" : ""}>
                        {event.isRegistered ? "Registered" : "Register"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-card transition-all cursor-pointer group hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{category.count} events</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How DeenLink Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Local Events</h3>
              <p className="text-muted-foreground">
                Discover events at masjids near you or search by city, ZIP code, or organization name.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Personalized</h3>
              <p className="text-muted-foreground">
                Follow your favorite masjids and get AI-powered recommendations based on your interests.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
              <p className="text-muted-foreground">
                Register for events, earn achievements, and strengthen your connection to the community.
              </p>
            </div>
          </div>
        </div>
      </section>

          <FloatingChatBot />
        </div>
      )}
    </div>
  );
};

export default Index;
