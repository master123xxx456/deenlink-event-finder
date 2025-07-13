import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
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

  const [masjids, setMasjids] = useState<Masjid[]>([
    {
      id: "1",
      name: "Diyanet Center of America",
      address: "9610 Good Luck Rd",
      city: "Lanham",
      state: "MD",
      distance: "5.2 miles",
      followers: 3200,
      upcomingEvents: 12,
      isFollowing: false,
      isVerified: true,
      phone: "(240) 344-6464",
      website: "https://diyanetamerica.org",
      description: "A premier Islamic center and cultural complex featuring a grand mosque, conference center, and educational facilities. The center serves as a hub for religious, educational, and cultural activities in the Washington DC metropolitan area.",
      specialties: ["Religious Education", "Cultural Events", "Community Services", "Interfaith Dialogue"],
      imageUrl: "https://diyanetamerica.org/wp-content/uploads/2023/01/dca-exterior.jpg",
      nextEvent: {
        title: "Friday Khutbah & Prayer",
        date: "Today at 1:30 PM"
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
      phone: "(703) 433-1325",  // Verified correct
      website: "https://www.adamscenter.org",
      description: "All Dulles Area Muslim Society - A comprehensive Islamic center providing religious, educational, and social services to the community.",
      specialties: ["Education", "Family Events", "Interfaith Dialogue"],
      imageUrl: "https://www.adamscenter.org/wp-content/uploads/2022/01/ADAMS-Center-Sterling-Exterior.jpg",
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
      phone: "(301) 982-3192",
      website: "https://darussalaam.org",
      description: "A welcoming Islamic center focused on community building, family programs, and Islamic education for all ages.",
      specialties: ["Family Programs", "Sports Activities", "Children's Classes"],
      imageUrl: "https://darussalaam.org/wp-content/uploads/2022/05/darussalaam-masjid-exterior.jpg",
      nextEvent: {
        title: "Family Sports Day & BBQ",
        date: "Sunday at 12:00 PM"
      }
    },
    {
      id: "4",
      name: "Muslim Community Center (MCC)",
      address: "15200 New Hampshire Ave",
      city: "Silver Spring",
      state: "MD",
      distance: "3.5 miles",
      followers: 2200,
      upcomingEvents: 15,
      isFollowing: true,
      isVerified: true,
      phone: "(301) 384-3454",  // Verified correct
      website: "https://www.mccmd.org",
      description: "Muslim Community Center of Maryland - A vibrant Islamic center serving the community with religious, educational, and social programs.",
      specialties: ["Religious Education", "Community Services", "Interfaith Programs"],
      imageUrl: "https://mccnorth.org/wp-content/uploads/2022/03/mcc-masjid-exterior.jpg",
      nextEvent: {
        title: "Community Iftar & Dinner",
        date: "Tonight at 7:30 PM"
      }
    },
    {
      id: "5",
      name: "Islamic Center of Maryland (ICM)",
      address: "19411 Woodfield Rd",
      city: "Gaithersburg",
      state: "MD",
      distance: "15.3 miles",
      followers: 4200,
      upcomingEvents: 14,
      isFollowing: false,
      isVerified: true,
      phone: "(301) 869-9292",  // Verified correct
      website: "https://www.icomd.org",
      description: "A leading Islamic center serving the Muslim community in Montgomery County with comprehensive religious, educational, and social services. The center features a beautiful masjid, full-time school, and community center.",
      specialties: ["Islamic School", "Youth Programs", "Family Services", "Community Outreach"],
      imageUrl: "https://www.icomd.org/wp-content/uploads/2022/08/icm-exterior.jpg",
      nextEvent: {
        title: "Friday Prayer",
        date: "Friday at 1:30 PM"
      }
    },
    {
      id: "6",
      name: "Dar Al-Taqwa",
      address: "10740 MD-108",
      city: "Columbia",
      state: "MD",
      distance: "18.7 miles",
      followers: 3200,
      upcomingEvents: 10,
      isFollowing: false,
      isVerified: true,
      phone: "(410) 730-7195",  // Verified correct
      website: "https://daraltaqwa.org",
      description: "A prominent Islamic center serving the Muslim community in Maryland with a focus on authentic Islamic education and community services. The center features a beautiful masjid, full-time Islamic school, and various community programs in its new Columbia location.",
      specialties: ["Islamic Education", "Youth Programs", "Community Services", "Dawah Activities"],
      imageUrl: "https://daraltaqwa.org/wp-content/uploads/2023/02/dar-al-taqwa-exterior.jpg",
      nextEvent: {
        title: "Weekly Tafseer Class",
        date: "Tomorrow at 8:00 PM"
      }
    },
    {
      id: "7",
      name: "Prince George's Muslim Association (PGMA)",
      address: "9150 Lanham Severn Rd, Lanham, MD 20706",
      city: "Lanham",
      state: "MD",
      distance: "5.8 miles",
      followers: 1900,
      upcomingEvents: 6,
      isFollowing: false,
      isVerified: true,
      phone: "(301) 459-7511",
      website: "https://www.pgmamd.org",
      description: "A vibrant Islamic center serving the Muslim community in Prince George's County with daily prayers, Jumu'ah services, and various educational programs for all ages.",
      specialties: ["Quran Classes", "Youth Programs", "Weekend School", "Community Services"],
      imageUrl: "https://www.pgmamd.org/wp-content/uploads/2023/03/pgma-masjid-exterior.jpg",
      nextEvent: {
        title: "Weekend Islamic School",
        date: "Saturday at 10:00 AM"
      }
    },
    {
      id: "8",
      name: "First Hijrah Foundation - Georgia Ave",
      address: "4324 Georgia Ave NW",
      city: "Washington",
      state: "DC",
      distance: "11.8 miles",
      followers: 3800,
      upcomingEvents: 12,
      isFollowing: false,
      isVerified: true,
      phone: "(202) 882-2000",
      website: "https://www.firsthijrahdc.org",
      description: "A vibrant Islamic center in the heart of Washington, DC, providing religious services, educational programs, and community outreach initiatives to the local Muslim community.",
      specialties: ["Quran Classes", "Youth Programs", "Community Services", "Dawah Activities"],
      imageUrl: "https://www.firsthijrahdc.org/wp-content/uploads/2023/02/first-hijrah-dc-exterior.jpg",
      nextEvent: {
        title: "Friday Prayer",
        date: "Friday at 1:15 PM"
      }
    },
    {
      id: "9",
      name: "First Hijrah Foundation",
      address: "3215 Powder Mill Rd",
      city: "Adelphi",
      state: "MD",
      distance: "6.5 miles",
      followers: 2800,
      upcomingEvents: 8,
      isFollowing: false,
      isVerified: true,
      phone: "(301) 434-3545",  // Verified correct
      website: "https://www.firsthijrah.org",
      description: "A vibrant Islamic center serving the Muslim community in the Adelphi area with a focus on authentic Islamic education, youth development, and community services. Located near Powder Mill Road.",
      specialties: ["Quran Memorization", "Islamic Studies", "Youth Programs", "Community Services"],
      imageUrl: "https://www.firsthijrah.org/wp-content/uploads/2023/01/first-hijrah-exterior.jpg",
      nextEvent: {
        title: "Weekly Tafseer",
        date: "Saturday at 7:00 PM"
      }
    }
  ]);

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
    
    // Toggle the isFollowing state for the clicked masjid
    setMasjids(masjids.map(masjid => 
      masjid.id === masjidId 
        ? { ...masjid, isFollowing: !masjid.isFollowing } 
        : masjid
    ));
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
                className="pl-12 pr-4 py-3 text-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur border-white/20 dark:border-gray-700 rounded-xl text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400"
              />
            </div>

            <div className="flex justify-center">
              <div className="flex items-center space-x-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                {states.map(state => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedState === state
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
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
                  <div className="h-48 rounded-t-lg relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <img
                      src={masjid.imageUrl}
                      alt={masjid.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/600x400/1e3a8a/ffffff?text=${encodeURIComponent(masjid.name)}`;
                        target.onerror = null; // Prevent infinite loop if placeholder also fails
                      }}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.opacity = '1';
                      }}
                      style={{
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <span className="text-gray-400 text-sm">Loading {masjid.name}...</span>
                    </div>
                  </div>
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
                    className={`absolute top-3 right-3 transition-all ${
                      masjid.isFollowing 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-white/90 dark:bg-gray-800/90 text-foreground hover:bg-white dark:hover:bg-gray-700/90 border-border/50"
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
                      <Button 
                        size="sm"
                        onClick={() => {
                          const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(masjid.address + ', ' + masjid.city + ', ' + masjid.state)}`;
                          window.open(mapsUrl, '_blank', 'noopener,noreferrer');
                        }}
                      >
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