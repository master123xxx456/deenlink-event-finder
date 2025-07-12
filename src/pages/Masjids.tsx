import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { 
  MapPin, 
  Building2, 
  Search, 
  Star,
  Users,
  Calendar,
  Phone,
  Globe,
  Heart,
  Clock,
  CheckCircle
} from "lucide-react";

interface Masjid {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distance: string;
  followers: number;
  upcomingEvents: number;
  isFollowing: boolean;
  isVerified: boolean;
  phone: string;
  website?: string;
  description: string;
  specialties: string[];
  imageUrl: string;
  nextEvent?: {
    title: string;
    date: string;
  };
}

const Masjids = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");

  const masjids: Masjid[] = [
    {
      id: "1",
      name: "Islamic Center of Maryland (ICM)",
      address: "15200 New Hampshire Ave",
      city: "Silver Spring",
      state: "MD",
      distance: "2.3 miles",
      followers: 1250,
      upcomingEvents: 8,
      isFollowing: false,
      isVerified: true,
      phone: "(301) 384-3454",
      website: "https://www.icmnet.org",
      description: "A vibrant Islamic community center serving the greater Maryland area with educational programs, youth activities, and community services.",
      specialties: ["Youth Programs", "Arabic Classes", "Community Service"],
      imageUrl: "/api/placeholder/300/200",
      nextEvent: {
        title: "Friday Night Youth Program",
        date: "Tonight at 7:00 PM"
      }
    },
    {
      id: "2",
      name: "ADAMS Center",
      address: "46903 Sugarland Rd",
      city: "Sterling",
      state: "VA",
      distance: "4.1 miles",
      followers: 980,
      upcomingEvents: 6,
      isFollowing: true,
      isVerified: true,
      phone: "(703) 433-1325",
      website: "https://www.adamscenter.org",
      description: "All Dulles Area Muslim Society - A comprehensive Islamic center providing religious, educational, and social services to the community.",
      specialties: ["Education", "Family Events", "Interfaith Dialogue"],
      imageUrl: "/api/placeholder/300/200",
      nextEvent: {
        title: "Halaqa: Stories of the Prophets",
        date: "Tomorrow at 2:00 PM"
      }
    },
    {
      id: "3",
      name: "Dar-us-Salaam",
      address: "5301 Edgewood Rd",
      city: "College Park",
      state: "MD",
      distance: "1.8 miles",
      followers: 750,
      upcomingEvents: 5,
      isFollowing: false,
      isVerified: true,
      phone: "(301) 779-9786",
      description: "A welcoming Islamic center focused on community building, family programs, and Islamic education for all ages.",
      specialties: ["Family Programs", "Sports Activities", "Children's Classes"],
      imageUrl: "/api/placeholder/300/200",
      nextEvent: {
        title: "Family Sports Day & BBQ",
        date: "Sunday at 12:00 PM"
      }
    },
    {
      id: "4",
      name: "MCC Chicago",
      address: "4380 N Elston Ave",
      city: "Chicago",
      state: "IL",
      distance: "8.2 miles",
      followers: 1850,
      upcomingEvents: 12,
      isFollowing: true,
      isVerified: true,
      phone: "(773) 725-9047",
      website: "https://www.mccchicago.org",
      description: "Muslim Community Center of Chicago - One of the largest Islamic centers in the Midwest, offering diverse programs and services.",
      specialties: ["Large Events", "Fundraisers", "Cultural Programs"],
      imageUrl: "/api/placeholder/300/200",
      nextEvent: {
        title: "Charity Drive: Winter Clothing",
        date: "Dec 19 at 10:00 AM"
      }
    },
    {
      id: "5",
      name: "Islamic Society of Greater Houston",
      address: "3110 Eastside St",
      city: "Houston",
      state: "TX",
      distance: "15.2 miles",
      followers: 2100,
      upcomingEvents: 9,
      isFollowing: false,
      isVerified: true,
      phone: "(713) 524-6615",
      website: "https://www.isgh.org",
      description: "Serving the Houston Muslim community with comprehensive religious, educational, and social programs.",
      specialties: ["Quran Studies", "Youth Development", "Senior Programs"],
      imageUrl: "/api/placeholder/300/200",
      nextEvent: {
        title: "Quran Study Circle",
        date: "Dec 20 at 7:30 PM"
      }
    },
    {
      id: "6",
      name: "Islamic Center of Southern California",
      address: "434 S Vermont Ave",
      city: "Los Angeles",
      state: "CA",
      distance: "22.8 miles",
      followers: 1650,
      upcomingEvents: 7,
      isFollowing: false,
      isVerified: true,
      phone: "(213) 382-9200",
      website: "https://www.icsc.org",
      description: "One of the oldest Islamic centers in America, providing spiritual guidance and community services since 1952.",
      specialties: ["Historical Significance", "Interfaith Relations", "Educational Programs"],
      imageUrl: "/api/placeholder/300/200",
      nextEvent: {
        title: "Monthly Community Dinner",
        date: "Dec 21 at 6:00 PM"
      }
    }
  ];

  const states = ["all", "MD", "VA", "IL", "TX", "CA"];

  const filteredMasjids = masjids.filter(masjid => {
    const matchesSearch = masjid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         masjid.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         masjid.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === "all" || masjid.state === selectedState;
    
    return matchesSearch && matchesState;
  });

  const handleFollow = (masjidId: string) => {
    // In a real app, this would make an API call
    console.log(`Following/unfollowing masjid ${masjidId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-4">Discover Masjids</h1>
            <p className="text-xl text-white/90">Find and follow Islamic centers in your area</p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search masjids by name, city, or programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white/95 backdrop-blur border-white/20 rounded-xl"
              />
            </div>

            <div className="flex justify-center">
              <div className="flex items-center space-x-2 bg-white/95 backdrop-blur rounded-xl p-1">
                {states.map(state => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedState === state
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {state === "all" ? "All States" : state}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masjids List */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredMasjids.length} Masjids Found
            </h2>
            <Button variant="outline" asChild>
              <a href="/masjid-portal">Register Your Masjid</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMasjids.map((masjid) => (
              <Card key={masjid.id} className="hover:shadow-card transition-shadow bg-gradient-card border-border/50">
                <div className="relative">
                  <img 
                    src={masjid.imageUrl} 
                    alt={masjid.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {masjid.isVerified && (
                    <Badge className="absolute top-3 left-3 bg-success text-success-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Button
                    variant={masjid.isFollowing ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFollow(masjid.id)}
                    className={`absolute top-3 right-3 ${
                      masjid.isFollowing 
                        ? "bg-following text-following-foreground" 
                        : "bg-white/90 text-foreground hover:bg-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${masjid.isFollowing ? 'fill-current' : ''}`} />
                    {masjid.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight">{masjid.name}</CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{masjid.city}, {masjid.state} • {masjid.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{masjid.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {masjid.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1">
                      {masjid.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Next Event */}
                    {masjid.nextEvent && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-medium text-primary">Next Event:</span>
                        </div>
                        <p className="text-sm font-medium mt-1">{masjid.nextEvent.title}</p>
                        <p className="text-xs text-muted-foreground">{masjid.nextEvent.date}</p>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span>{masjid.phone}</span>
                      </div>
                      {masjid.website && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Globe className="w-3 h-3 text-muted-foreground" />
                          <a 
                            href={masjid.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <Button variant="outline" size="sm">
                        View Events ({masjid.upcomingEvents})
                      </Button>
                      <Button size="sm">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMasjids.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No masjids found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all masjids.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedState("all");
              }}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      <FloatingChatBot />
    </div>
  );
};

export default Masjids;