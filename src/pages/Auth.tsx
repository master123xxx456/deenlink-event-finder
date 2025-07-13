import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  MapPin, 
  Phone,
  Calendar,
  Heart,
  Star,
  Users,
  BookOpen,
  Trophy
} from "lucide-react";

interface OnboardingData {
  location: string;
  interests: string[];
  ageGroup: string;
  notificationPreferences: string[];
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    location: "",
    interests: [],
    ageGroup: "",
    notificationPreferences: []
  });

  const interests = [
    { id: "youth", label: "Youth Programs", icon: Users },
    { id: "education", label: "Islamic Education", icon: BookOpen },
    { id: "family", label: "Family Events", icon: Heart },
    { id: "arabic", label: "Arabic Classes", icon: BookOpen },
    { id: "sports", label: "Physical Activity", icon: Trophy },
    { id: "community", label: "Community Service", icon: Users },
    { id: "fundraiser", label: "Fundraisers", icon: Heart },
    { id: "celebration", label: "Islamic Celebrations", icon: Star }
  ];

  const ageGroups = ["Teenager (13-17)", "Young Adult (18-25)", "Adult (26-40)", "Mature Adult (41+)", "Parent/Family"];

  const notificationTypes = [
    "New events from followed masjids",
    "Personalized event recommendations",
    "Events in my area",
    "Event reminders",
    "Achievement notifications",
    "Weekly digest"
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      setShowOnboarding(true);
    } else {
      // Handle login
      console.log("Login:", formData);
    }
  };

  const handleOnboardingNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log("Onboarding complete:", onboardingData);
      // Redirect to dashboard
    }
  };

  const toggleInterest = (interestId: string) => {
    setOnboardingData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const toggleNotification = (notification: string) => {
    setOnboardingData(prev => ({
      ...prev,
      notificationPreferences: prev.notificationPreferences.includes(notification)
        ? prev.notificationPreferences.filter(n => n !== notification)
        : [...prev.notificationPreferences, notification]
    }));
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to DeenLink!</h1>
              <p className="text-muted-foreground">Let's personalize your experience</p>
              
              {/* Progress bar */}
              <div className="flex items-center justify-center space-x-2 mt-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-12 h-1 mx-2 ${
                        step < currentStep ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && "Where are you located?"}
                  {currentStep === 2 && "What interests you?"}
                  {currentStep === 3 && "Notification preferences"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">City or ZIP Code</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="e.g., Gaithersburg, MD or 20878"
                          value={onboardingData.location}
                          onChange={(e) => setOnboardingData(prev => ({ ...prev, location: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Age Group</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {ageGroups.map((group) => (
                          <button
                            key={group}
                            type="button"
                            onClick={() => setOnboardingData(prev => ({ ...prev, ageGroup: group }))}
                            className={`p-3 text-left border rounded-lg transition-colors ${
                              onboardingData.ageGroup === group
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {group}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Select the types of events you're interested in to get personalized recommendations:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {interests.map((interest) => (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                            onboardingData.interests.includes(interest.id)
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <interest.icon className="w-6 h-6" />
                            <span className="text-sm font-medium text-center">{interest.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Selected {onboardingData.interests.length} interests
                    </p>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Choose how you'd like to stay updated about events:
                    </p>
                    <div className="space-y-3">
                      {notificationTypes.map((notification) => (
                        <div key={notification} className="flex items-center space-x-2">
                          <Checkbox
                            id={notification}
                            checked={onboardingData.notificationPreferences.includes(notification)}
                            onCheckedChange={() => toggleNotification(notification)}
                          />
                          <Label htmlFor={notification} className="text-sm">
                            {notification}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <Button onClick={handleOnboardingNext}>
                    {currentStep === 3 ? "Complete Setup" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Join DeenLink"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Sign in to discover events at your local masjids" 
                : "Create an account to get personalized event recommendations"
              }
            </p>
          </div>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>{isLogin ? "Sign In" : "Create Account"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-primary hover:underline font-medium"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features for new users */}
          {!isLogin && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-center">What you'll get with DeenLink:</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-sm">Personalized event recommendations</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="text-sm">Follow your favorite masjids</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="text-sm">Earn achievements for participation</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm">Never miss important events</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;