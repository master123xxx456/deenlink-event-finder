import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PrayerTimes from '@/components/PrayerTimes';

export default function PrayerTimesPage() {
  const navigate = useNavigate();
  const [showGetStarted, setShowGetStarted] = useState(false);

  // Show get started button after a short delay if location access is not granted
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGetStarted(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // This will trigger the geolocation prompt in the PrayerTimes component
    setShowGetStarted(false);
    // Force re-render the PrayerTimes component
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Prayer Times</h1>
          <p className="text-muted-foreground">Accurate prayer times based on your location</p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border p-6">
          <PrayerTimes />
          
          {showGetStarted && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">Don't see your location?</p>
              <Button onClick={handleGetStarted}>
                Enable Location Access
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                We need your permission to show accurate prayer times for your location.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About Prayer Times</h2>
          <p className="text-muted-foreground mb-4">
            Prayer times are calculated based on your current location using the Islamic Society of North America (ISNA) calculation method.
            The times are automatically adjusted for your timezone and daylight saving time.
          </p>
          <Button variant="outline" onClick={() => navigate('/masjids')}>
            Find Nearby Masjids
          </Button>
        </div>
      </div>
    </div>
  );
}
