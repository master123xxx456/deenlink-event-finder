import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Filter,
  Clock,
  Star,
  Heart
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
  description: string;
  ageGroup: string;
}

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [location, setLocation] = useState("Gaithersburg, MD");

  const events: Event[] = [
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
      distance: "2.3 miles",
      description: "Join us for an engaging evening of Islamic knowledge, games, and community building for teenagers.",
      ageGroup: "Teens"
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
      distance: "4.1 miles",
      description: "Weekly study circle exploring the inspiring stories and lessons from the lives of the Prophets.",
      ageGroup: "Adults"
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
      distance: "1.8 miles",
      description: "Fun-filled day of sports activities and delicious BBQ for the whole family.",
      ageGroup: "Family"
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
      distance: "2.3 miles",
      description: "Beginner-friendly Arabic language class focusing on Quranic vocabulary and basic conversation.",
      ageGroup: "Adults"
    },
    {
      id: "5",
      title: "Charity Drive: Winter Clothing",
      masjid: "MCC Chicago",
      date: "Dec 19, 2024",
      time: "10:00 AM",
      category: "Community Service",
      attendees: 56,
      isRegistered: false,
      recommendationType: "local",
      distance: "8.2 miles",
      description: "Help us collect and distribute winter clothing for those in need in our community.",
      ageGroup: "All Ages"
    },
    {
      id: "6",
      title: "Eid ul-Fitr Planning Committee",
      masjid: "ADAMS Center",
      date: "Dec 20, 2024",
      time: "7:30 PM",
      category: "Planning",
      attendees: 15,
      isRegistered: false,
      recommendationType: "following",
      distance: "4.1 miles",
      description: "Join the committee to help plan our upcoming Eid celebration. Your ideas and volunteers are needed!",
      ageGroup: "Adults"
    },
    {
      id: "7",
      title: "Kids Islamic Art & Crafts",
      masjid: "Dar-us-Salaam",
      date: "Dec 21, 2024",
      time: "3:00 PM",
      category: "Kids",
      attendees: 22,
      isRegistered: false,
      recommendationType: "local",
      distance: "1.8 miles",
      description: "Creative Islamic art and crafts session for children to learn about their faith through hands-on activities.",
      ageGroup: "Kids"
    },
    {
      id: "8",
      title: "Fundraiser Dinner: Palestine Relief",
      masjid: "Islamic Center of Maryland (ICM)",
      date: "Dec 22, 2024",
      time: "6:00 PM",
      category: "Fundraiser",
      attendees: 120,
      isRegistered: false,
      recommendationType: "personalized",
      distance: "2.3 miles",
      description: "Join us for a special dinner event to raise funds for our brothers and sisters in Palestine.",
      ageGroup: "All Ages"
    }
  ];

  const categories = ["all", "Youth", "Education", "Family", "Community Service", "Kids", "Fundraiser", "Planning"];
  const ageGroups = ["all", "Kids", "Teens", "Adults", "Family", "All Ages"];
  const distances = ["all", "Within 5 miles", "Within 10 miles", "Within 25 miles"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.masjid.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesAgeGroup = selectedAgeGroup === "all" || event.ageGroup === selectedAgeGroup;
    
    return matchesSearch && matchesCategory && matchesAgeGroup;
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white/95 backdrop-blur border-white/20 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/95 backdrop-blur border-white/20">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                <SelectTrigger className="bg-white/95 backdrop-blur border-white/20">
                  <SelectValue placeholder="Age Group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map(ageGroup => (
                    <SelectItem key={ageGroup} value={ageGroup}>
                      {ageGroup === "all" ? "All Age Groups" : ageGroup}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                <SelectTrigger className="bg-white/95 backdrop-blur border-white/20">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  {distances.map(distance => (
                    <SelectItem key={distance} value={distance}>
                      {distance === "all" ? "Any Distance" : distance}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Filter className="w-4 h-4" />
              <span>Sorted by relevance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-card transition-shadow bg-gradient-card border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
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
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedAgeGroup("all");
                setSelectedDistance("all");
              }}>
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