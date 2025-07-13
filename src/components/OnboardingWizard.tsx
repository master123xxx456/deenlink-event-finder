import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useAuth } from "../hooks/use-auth";
import { 
  BookOpen, 
  Heart, 
  Users, 
  Building2, // Using Building2 as an alternative to Mosque
  Calendar, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Check
} from "lucide-react";

interface Interest {
  id: string;
  label: string;
  icon: React.ElementType;
  category: 'event' | 'masjid';
}

const interests: Interest[] = [
  { id: "quran", label: "Quran Classes", icon: BookOpen, category: 'event' },
  { id: "halaqa", label: "Halaqas", icon: Users, category: 'event' },
  { id: "sisters", label: "Sisters' Programs", icon: Users, category: 'event' },
  { id: "youth", label: "Youth Programs", icon: Users, category: 'event' },
  { id: "charity", label: "Charity Events", icon: Heart, category: 'event' },
  { id: "eid", label: "Eid Prayers & Events", icon: Calendar, category: 'event' },
  { id: "jummah", label: "Jummah Prayers", icon: Building2, category: 'masjid' },
  { id: "taraweeh", label: "Taraweeh Prayers", icon: Building2, category: 'masjid' },
  { id: "daily", label: "Daily Prayers", icon: Building2, category: 'masjid' },
  { id: "lectures", label: "Islamic Lectures", icon: BookOpen, category: 'event' },
];

const distanceOptions = [
  { value: 5, label: "5 miles" },
  { value: 10, label: "10 miles" },
  { value: 20, label: "20 miles" },
  { value: 50, label: "50+ miles" },
];

const timeOptions = [
  { value: "morning", label: "Morning", icon: "🌅" },
  { value: "afternoon", label: "Afternoon", icon: "☀️" },
  { value: "evening", label: "Evening", icon: "🌆" },
  { value: "night", label: "Night", icon: "🌙" },
];

export default function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [distance, setDistance] = useState(10);
  const [preferredTimes, setPreferredTimes] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const toggleTime = (time: string) => {
    setPreferredTimes(prev => 
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would save these preferences to your backend
      const preferences = {
        interests: selectedInterests,
        preferredDistance: distance,
        preferredTimes,
        location,
        onboardingCompleted: true
      };

      // Update user context and local storage
      const updatedUser = {
        ...user,
        preferences,
        onboardingCompleted: true
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      updateUser(updatedUser);
      
      // Complete onboarding
      onComplete();
      navigate('/');
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What types of events interest you?</h3>
              <p className="text-sm text-muted-foreground">Select all that apply to help us find relevant events for you.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interests
                .filter(i => i.category === 'event')
                .map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <Button
                      key={interest.id}
                      variant={isSelected ? "default" : "outline"}
                      className={`h-auto py-3 justify-start ${isSelected ? 'border-primary' : ''}`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {interest.label}
                    </Button>
                  );
                })}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What types of masjids are you interested in?</h3>
              <p className="text-sm text-muted-foreground">This helps us find masjids that match your preferences.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interests
                .filter(i => i.category === 'masjid')
                .map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <Button
                      key={interest.id}
                      variant={isSelected ? "default" : "outline"}
                      className={`h-auto py-3 justify-start ${isSelected ? 'border-primary' : ''}`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {interest.label}
                    </Button>
                  );
                })}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How far are you willing to travel?</h3>
              <p className="text-sm text-muted-foreground">We'll show you events and masjids within this distance.</p>
            </div>
            <div className="space-y-6">
              <div className="px-2">
                <Slider
                  value={[distance]}
                  min={5}
                  max={50}
                  step={5}
                  onValueChange={(value) => setDistance(value[0])}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>5 miles</span>
                  <span>{distance} miles{distance === 50 ? '+' : ''}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Preferred prayer/event times:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeOptions.map((time) => (
                    <Button
                      key={time.value}
                      variant={preferredTimes.includes(time.value) ? "default" : "outline"}
                      className="flex-col h-auto py-3"
                      onClick={() => toggleTime(time.value)}
                    >
                      <span className="text-2xl mb-1">{time.icon}</span>
                      <span className="text-xs">{time.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Where are you located?</h3>
              <p className="text-sm text-muted-foreground">We'll use this to find events and masjids near you.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">City or ZIP Code</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="location"
                    type="text"
                    placeholder="Enter your location"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Your Preferences:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">Interests:</span>{' '}
                      {selectedInterests.length > 0 
                        ? selectedInterests.map(id => interests.find(i => i.id === id)?.label).filter(Boolean).join(', ')
                        : 'None selected'}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">Max distance:</span> {distance} miles
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">Preferred times:</span>{' '}
                      {preferredTimes.length > 0 
                        ? preferredTimes.map(t => timeOptions.find(to => to.value === t)?.label).filter(Boolean).join(', ')
                        : 'Any time'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const stepTitles = [
    "Select your interests",
    "Choose masjid preferences",
    "Set your travel preferences",
    "Enter your location"
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {step <= totalSteps ? stepTitles[step - 1] : "Setup Complete!"}
          </CardTitle>
          <CardDescription>
            Step {step} of {totalSteps}
          </CardDescription>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="mt-4">
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            disabled={step === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={
              (step === 4 && !location.trim()) || 
              isLoading ||
              (step === 1 && selectedInterests.filter(id => 
                interests.find(i => i.id === id)?.category === 'event'
              ).length === 0)
            }
          >
            {step === totalSteps ? 'Complete Setup' : 'Continue'}
            {step < totalSteps && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
