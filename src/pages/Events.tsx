import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import FilterPopup, { FilterState } from "@/components/FilterPopup";
import EventScrapingService, { ScrapedEvent } from "@/services/EventScrapingService";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  RefreshCw,
  Clock,
  Wifi,
  Database
} from "lucide-react";

interface Event extends ScrapedEvent {
  // Extends ScrapedEvent with any additional properties if needed
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [location, setLocation] = useState("Gaithersburg, MD");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: "all",
    ageGroup: "all", 
    distance: "all",
    masjids: [],
    dateRange: "all",
    timeOfDay: "all",
    source: []
  });

  // Initialize event scraping service
  useEffect(() => {
    const scrapingService = EventScrapingService.getInstance();
    
    // Subscribe to event updates
    const unsubscribe = scrapingService.subscribe((scrapedEvents) => {
      setEvents(scrapedEvents);
      setLastUpdated(new Date());
      setIsRefreshing(false);
    });

    // Start auto-updating
    scrapingService.startAutoUpdate();

    // Cleanup on unmount
    return () => {
      unsubscribe();
      scrapingService.stopAutoUpdate();
    };
  }, []);

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    const scrapingService = EventScrapingService.getInstance();
    await scrapingService.refreshEvents();
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         event.masjid.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesCategory = filters.category === "all" || event.category === filters.category;
    const matchesAgeGroup = filters.ageGroup === "all" || event.ageGroup === filters.ageGroup;
    const matchesMasjid = filters.masjids.length === 0 || filters.masjids.includes(event.masjid);
    const matchesSource = filters.source.length === 0 || filters.source.includes(event.source);
    
    return matchesSearch && matchesCategory && matchesAgeGroup && matchesMasjid && matchesSource;
  });

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

  const handleRegister = (eventId: string) => {
    // In a real app, this would make an API call
    console.log(`Registering for event ${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-4">Discover Events</h1>
            <p className="text-xl text-white/90">Find Islamic events at masjids near {location}</p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search events, masjids, or descriptions..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="pl-12 pr-4 py-3 text-lg bg-white/95 backdrop-blur border-white/20 rounded-xl"
              />
            </div>

            <div className="flex justify-center">
              <FilterPopup 
                filters={filters}
                onFiltersChange={setFilters}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />
            </div>

            {/* Data freshness indicator */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-white/80 bg-black/20 rounded-full px-4 py-2 backdrop-blur">
                <div className="flex items-center space-x-1">
                  <Wifi className="w-4 h-4" />
                  <Database className="w-4 h-4" />
                </div>
                <span>
                  {lastUpdated 
                    ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
                    : "Loading fresh data..."
                  }
                </span>
                {isRefreshing && <RefreshCw className="w-4 h-4 animate-spin" />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredEvents.length} Events Found
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Database className="w-4 h-4" />
              <span>Auto-updated from masjid sources</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-card transition-shadow bg-gradient-card border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-1">
                      <Badge className={`text-xs ${getRecommendationColor(event.recommendationType)}`}>
                        {getRecommendationLabel(event.recommendationType)}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {event.source}
                      </Badge>
                    </div>
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
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    
                    <div className="space-y-2">
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
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {event.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.ageGroup}
                        </Badge>
                      </div>
                      <Button 
                        size="sm" 
                        className={event.isRegistered ? "bg-success" : ""}
                        onClick={() => handleRegister(event.id)}
                      >
                        {event.isRegistered ? "Registered" : "Register"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all events.
              </p>
              <Button onClick={() => setFilters({
                searchQuery: "",
                category: "all",
                ageGroup: "all",
                distance: "all",
                masjids: [],
                dateRange: "all",
                timeOfDay: "all",
                source: []
              })}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <FloatingChatBot />
    </div>
  );
};

export default Events;