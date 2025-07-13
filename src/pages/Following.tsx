import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Users, 
  Bell,
  Settings,
  Star,
  Clock,
  Building2,
  Trash2
} from "lucide-react";

interface FollowedMasjid {
  id: string;
  name: string;
  city: string;
  state: string;
  distance: string;
  avatar: string;
  upcomingEvents: number;
  lastEventDate: string;
  followedDate: string;
  notificationsEnabled: boolean;
  recentEvents: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    attendees: number;
  }>;
}

interface Notification {
  id: string;
  masjidId: string;
  masjidName: string;
  type: "new_event" | "reminder" | "update";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

const Following = () => {
  const [activeTab, setActiveTab] = useState<"following" | "notifications">("following");

  const followedMasjids: FollowedMasjid[] = [
    {
      id: "1",
      name: "Diyanet Center of America",
      city: "Lanham",
      state: "MD",
      distance: "5.2 miles",
      avatar: "https://diyanetamerica.org/wp-content/uploads/2023/01/dca-exterior.jpg",
      upcomingEvents: 12,
      lastEventDate: "Today",
      followedDate: "Nov 15, 2024",
      notificationsEnabled: true,
      recentEvents: [
        {
          id: "e1",
          title: "Friday Khutbah & Prayer",
          date: "Today",
          time: "1:30 PM",
          attendees: 320
        },
        {
          id: "e2",
          title: "Quran Tafseer Class",
          date: "Tomorrow",
          time: "7:00 PM",
          attendees: 45
        }
      ]
    },
    {
      id: "2",
      name: "ADAMS Center",
      city: "Sterling",
      state: "VA",
      distance: "4.1 miles",
      avatar: "https://www.adamscenter.org/wp-content/uploads/2022/01/ADAMS-Center-Sterling-Exterior.jpg",
      upcomingEvents: 6,
      lastEventDate: "Tomorrow",
      followedDate: "Nov 20, 2024",
      notificationsEnabled: true,
      recentEvents: [
        {
          id: "e3",
          title: "Halaqa: Stories of the Prophets",
          date: "Tomorrow",
          time: "2:00 PM",
          attendees: 32
        },
        {
          id: "e4",
          title: "Weekly Tafseer Class",
          date: "Friday",
          time: "8:00 PM",
          attendees: 28
        }
      ]
    },
    {
      id: "4",
      name: "Muslim Community Center (MCC)",
      city: "Silver Spring",
      state: "MD",
      distance: "8.2 miles",
      avatar: "https://www.mccmd.org/wp-content/uploads/2022/05/mcc-entrance.jpg",
      upcomingEvents: 15,
      lastEventDate: "Yesterday",
      followedDate: "Dec 1, 2024",
      notificationsEnabled: true,
      recentEvents: [
        {
          id: "e5",
          title: "Friday Prayer & Khutbah",
          date: "Today",
          time: "1:15 PM",
          attendees: 215
        },
        {
          id: "e6",
          title: "Youth Halaqa",
          date: "Saturday",
          time: "6:30 PM",
          attendees: 35
        }
      ]
    }
  ];

  const notifications: Notification[] = [
    {
      id: "n1",
      masjidId: "2",
      masjidName: "ADAMS Center",
      type: "new_event",
      title: "New Event Added",
      message: "Halaqa: Stories of the Prophets has been scheduled for tomorrow at 2:00 PM",
      date: "2 hours ago",
      isRead: false
    },
    {
      id: "n2",
      masjidId: "4",
      masjidName: "MCC Chicago",
      type: "reminder",
      title: "Event Reminder",
      message: "Charity Drive: Winter Clothing starts in 3 days. Don't forget to register!",
      date: "4 hours ago",
      isRead: false
    },
    {
      id: "n3",
      masjidId: "2",
      masjidName: "ADAMS Center",
      type: "update",
      title: "Event Update",
      message: "The location for Friday Community Prayer has been updated.",
      date: "1 day ago",
      isRead: true
    },
    {
      id: "n4",
      masjidId: "6",
      masjidName: "Islamic Center of Southern California",
      type: "new_event",
      title: "New Event Added",
      message: "Monthly Community Dinner scheduled for December 21st at 6:00 PM",
      date: "2 days ago",
      isRead: true
    }
  ];

  const handleUnfollow = (masjidId: string) => {
    console.log(`Unfollowing masjid ${masjidId}`);
  };

  const handleToggleNotifications = (masjidId: string) => {
    console.log(`Toggling notifications for masjid ${masjidId}`);
  };

  const handleMarkAsRead = (notificationId: string) => {
    console.log(`Marking notification ${notificationId} as read`);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_event": return Calendar;
      case "reminder": return Clock;
      case "update": return Settings;
      default: return Bell;
    }
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-4">Your Community</h1>
            <p className="text-xl text-white/90">Stay connected with your favorite masjids</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur rounded-xl p-1">
              <button
                onClick={() => setActiveTab("following")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === "following"
                    ? "bg-white text-primary"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Following ({followedMasjids.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 relative ${
                  activeTab === "notifications"
                    ? "bg-white text-primary"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
                {unreadNotifications.length > 0 && (
                  <Badge className="ml-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
                    {unreadNotifications.length}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {activeTab === "following" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Following</h2>
                <Button variant="outline" asChild>
                  <a href="/masjids">Discover More Masjids</a>
                </Button>
              </div>

              {followedMasjids.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No followed masjids yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start following your favorite masjids to get personalized updates and event notifications.
                    </p>
                    <Button asChild>
                      <a href="/masjids">Browse Masjids</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {followedMasjids.map((masjid) => (
                    <Card key={masjid.id} className="bg-gradient-card border-border/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={masjid.avatar} alt={masjid.name} />
                              <AvatarFallback>
                                <Building2 className="w-8 h-8" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{masjid.name}</CardTitle>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{masjid.city}, {masjid.state} • {masjid.distance}</span>
                              </div>
                              <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center space-x-1 text-sm">
                                  <Calendar className="w-3 h-3 text-primary" />
                                  <span>{masjid.upcomingEvents} upcoming events</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Following since {masjid.followedDate}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleNotifications(masjid.id)}
                              className={`${
                                masjid.notificationsEnabled 
                                  ? "text-success" 
                                  : "text-muted-foreground"
                              }`}
                            >
                              <Bell className={`w-4 h-4 ${
                                masjid.notificationsEnabled ? 'fill-current' : ''
                              }`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnfollow(masjid.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          <h4 className="font-medium text-sm">Recent Events</h4>
                          <div className="space-y-3">
                            {masjid.recentEvents.map((event) => (
                              <div key={event.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                                <div>
                                  <h5 className="font-medium text-sm">{event.title}</h5>
                                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Users className="w-3 h-3" />
                                      <span>{event.attendees} attending</span>
                                    </div>
                                  </div>
                                </div>
                                <Button size="sm" variant="outline">
                                  Register
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
                {unreadNotifications.length > 0 && (
                  <Button variant="outline" size="sm">
                    Mark All as Read
                  </Button>
                )}
              </div>

              {notifications.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No notifications yet</h3>
                    <p className="text-muted-foreground">
                      You'll receive notifications here when your followed masjids post new events or updates.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    return (
                      <Card 
                        key={notification.id} 
                        className={`cursor-pointer transition-colors ${
                          !notification.isRead 
                            ? "bg-primary/5 border-primary/20" 
                            : "bg-gradient-card border-border/50"
                        }`}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              !notification.isRead ? "bg-primary" : "bg-muted"
                            }`}>
                              <IconComponent className={`w-5 h-5 ${
                                !notification.isRead ? "text-primary-foreground" : "text-muted-foreground"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium text-sm">{notification.title}</h4>
                                  <p className="text-xs text-muted-foreground">{notification.masjidName}</p>
                                </div>
                                <div className="text-xs text-muted-foreground">{notification.date}</div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            </div>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <FloatingChatBot />
    </div>
  );
};

export default Following;