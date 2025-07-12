import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { 
  Trophy, 
  Star, 
  Calendar, 
  Users, 
  BookOpen, 
  Heart,
  Medal,
  Award,
  Target,
  CheckCircle,
  Lock
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
  unlockedDate?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface UserStats {
  totalPoints: number;
  level: number;
  eventsAttended: number;
  masjidsVisited: number;
  streakDays: number;
  achievementsUnlocked: number;
}

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const userStats: UserStats = {
    totalPoints: 1250,
    level: 8,
    eventsAttended: 23,
    masjidsVisited: 5,
    streakDays: 12,
    achievementsUnlocked: 15
  };

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Attend your first Islamic event",
      category: "participation",
      icon: Star,
      isUnlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 50,
      unlockedDate: "Nov 15, 2024",
      rarity: "common"
    },
    {
      id: "2",
      title: "Community Builder",
      description: "Attend 10 events",
      category: "participation",
      icon: Users,
      isUnlocked: true,
      progress: 10,
      maxProgress: 10,
      points: 200,
      unlockedDate: "Dec 1, 2024",
      rarity: "rare"
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Attend 5 educational events",
      category: "education",
      icon: BookOpen,
      isUnlocked: true,
      progress: 5,
      maxProgress: 5,
      points: 150,
      unlockedDate: "Nov 28, 2024",
      rarity: "rare"
    },
    {
      id: "4",
      title: "Explorer",
      description: "Visit 3 different masjids",
      category: "exploration",
      icon: Trophy,
      isUnlocked: true,
      progress: 3,
      maxProgress: 3,
      points: 100,
      unlockedDate: "Nov 22, 2024",
      rarity: "common"
    },
    {
      id: "5",
      title: "Dedicated Follower",
      description: "Follow 10 masjids",
      category: "social",
      icon: Heart,
      isUnlocked: true,
      progress: 10,
      maxProgress: 10,
      points: 100,
      unlockedDate: "Dec 5, 2024",
      rarity: "common"
    },
    {
      id: "6",
      title: "Event Enthusiast",
      description: "Attend 25 events",
      category: "participation",
      icon: Calendar,
      isUnlocked: false,
      progress: 23,
      maxProgress: 25,
      points: 300,
      rarity: "epic"
    },
    {
      id: "7",
      title: "Scholar",
      description: "Attend 20 educational events",
      category: "education",
      icon: Medal,
      isUnlocked: false,
      progress: 8,
      maxProgress: 20,
      points: 500,
      rarity: "epic"
    },
    {
      id: "8",
      title: "City Explorer",
      description: "Visit masjids in 10 different cities",
      category: "exploration",
      icon: Award,
      isUnlocked: false,
      progress: 2,
      maxProgress: 10,
      points: 400,
      rarity: "epic"
    },
    {
      id: "9",
      title: "Pilgrimage of Knowledge",
      description: "Visit 50 different masjids",
      category: "exploration",
      icon: Target,
      isUnlocked: false,
      progress: 5,
      maxProgress: 50,
      points: 1000,
      rarity: "legendary"
    },
    {
      id: "10",
      title: "Community Champion",
      description: "Attend 100 events",
      category: "participation",
      icon: Trophy,
      isUnlocked: false,
      progress: 23,
      maxProgress: 100,
      points: 1500,
      rarity: "legendary"
    }
  ];

  const categories = ["all", "participation", "education", "exploration", "social"];

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === "all" || achievement.category === selectedCategory
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-muted-foreground border-muted";
      case "rare": return "text-local border-local";
      case "epic": return "text-personalized border-personalized";
      case "legendary": return "text-accent border-accent";
      default: return "text-muted-foreground border-muted";
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-muted text-muted-foreground";
      case "rare": return "bg-local text-local-foreground";
      case "epic": return "bg-personalized text-personalized-foreground";
      case "legendary": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPointsToNextLevel = () => {
    const pointsPerLevel = 200;
    const currentLevelPoints = (userStats.level - 1) * pointsPerLevel;
    const nextLevelPoints = userStats.level * pointsPerLevel;
    const progress = userStats.totalPoints - currentLevelPoints;
    const total = nextLevelPoints - currentLevelPoints;
    
    return { progress, total, nextLevelPoints };
  };

  const { progress: levelProgress, total: levelTotal, nextLevelPoints } = getPointsToNextLevel();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-4">Your Achievements</h1>
            <p className="text-xl text-white/90">Track your journey in the Islamic community</p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{userStats.totalPoints}</div>
                <div className="text-sm text-white/80">Total Points</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">Level {userStats.level}</div>
                <div className="text-sm text-white/80">Current Level</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{userStats.eventsAttended}</div>
                <div className="text-sm text-white/80">Events Attended</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{userStats.achievementsUnlocked}</div>
                <div className="text-sm text-white/80">Achievements</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Level Progress */}
      <section className="py-8 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span>Level Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Level {userStats.level}</span>
                  <span className="text-sm text-muted-foreground">
                    {userStats.totalPoints} / {nextLevelPoints} points
                  </span>
                </div>
                <Progress value={(levelProgress / levelTotal) * 100} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {levelTotal - levelProgress} points needed for Level {userStats.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Achievement Categories */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-muted rounded-xl p-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`hover:shadow-card transition-all bg-gradient-card border-2 ${
                  achievement.isUnlocked 
                    ? getRarityColor(achievement.rarity)
                    : "border-muted/50 opacity-75"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.isUnlocked 
                        ? "bg-gradient-primary" 
                        : "bg-muted"
                    }`}>
                      {achievement.isUnlocked ? (
                        <achievement.icon className="w-6 h-6 text-primary-foreground" />
                      ) : (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={`text-xs ${getRarityBadgeColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </Badge>
                      <div className="text-sm font-medium text-accent">
                        +{achievement.points} pts
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {achievement.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {achievement.isUnlocked ? (
                      <div className="flex items-center space-x-2 text-sm text-success">
                        <CheckCircle className="w-4 h-4" />
                        <span>Unlocked on {achievement.unlockedDate}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2" 
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingChatBot />
    </div>
  );
};

export default Achievements;