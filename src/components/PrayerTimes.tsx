import { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type PrayerTime = {
  name: string;
  time: string;
  isNext: boolean;
};

type PrayerTimesData = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  date: string;
};

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number; city: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get user's location using IP geolocation as fallback
  useEffect(() => {
    const getLocationByIP = async () => {
      try {
        // First try IP geolocation
        const ipResponse = await fetch('https://ipapi.co/json/');
        if (!ipResponse.ok) throw new Error('IP geolocation failed');
        
        const ipData = await ipResponse.json();
        const { latitude, longitude, city, region } = ipData;
        
        if (latitude && longitude) {
          const locationName = city ? `${city}, ${region || ''}`.trim() : 'Your Location';
          setLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude), city: locationName });
          fetchPrayerTimes(parseFloat(latitude), parseFloat(longitude));
          return;
        }
        
        throw new Error('No location data from IP');
      } catch (ipError) {
        console.log('IP geolocation failed, trying browser geolocation...');
        // If IP geolocation fails, try browser geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                // Get city name from coordinates
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                );
                const data = await response.json();
                const city = data.address?.city || data.address?.town || data.address?.village || 'Your Location';
                setLocation({ lat: latitude, lng: longitude, city });
                fetchPrayerTimes(latitude, longitude);
              } catch (err) {
                console.error('Error getting location details:', err);
                setError('Could not determine your location details. Using approximate location.');
                setLocation({ lat: latitude, lng: longitude, city: 'Your Location' });
                fetchPrayerTimes(latitude, longitude);
              }
            },
            async (err) => {
              console.error('Browser geolocation failed:', err);
              // If both methods fail, use a default location
              setError('Using default location. You can try refreshing the page to detect your location again.');
              setLocation({ lat: 39.1434, lng: -77.2014, city: 'Gaithersburg, MD' });
              fetchPrayerTimes(39.1434, -77.2014);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          // If no geolocation support, use IP geolocation again with different service
          try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            if (data.latitude && data.longitude) {
              const city = data.city || 'Your Location';
              setLocation({ 
                lat: parseFloat(data.latitude), 
                lng: parseFloat(data.longitude), 
                city: data.city && data.region_code ? 
                  `${data.city}, ${data.region_code}` : 'Your Location' 
              });
              fetchPrayerTimes(parseFloat(data.latitude), parseFloat(data.longitude));
            } else {
              throw new Error('No location data available');
            }
          } catch (finalError) {
            console.error('All location methods failed:', finalError);
            setError('Could not determine your location. Using default location.');
            setLocation({ lat: 39.1434, lng: -77.2014, city: 'Gaithersburg, MD' });
            fetchPrayerTimes(39.1434, -77.2014);
          }
        }
      }
    };

    getLocationByIP();

    // Update current time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      // Get current date in DD-MM-YYYY format
      const today = new Date();
      const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
      
      // Use Aladhan API
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=2`
      );
      
      if (!response.ok) throw new Error('Failed to fetch prayer times');
      
      const data = await response.json();
      const timings = data.data.timings;
      
      const prayerTimesList: PrayerTime[] = [
        { name: 'Fajr', time: formatTime(timings.Fajr), isNext: false },
        { name: 'Sunrise', time: formatTime(timings.Sunrise), isNext: false },
        { name: 'Dhuhr', time: formatTime(timings.Dhuhr), isNext: false },
        { name: 'Asr', time: formatTime(timings.Asr), isNext: false },
        { name: 'Maghrib', time: formatTime(timings.Maghrib), isNext: false },
        { name: 'Isha', time: formatTime(timings.Isha), isNext: false },
      ];

      // Mark the next prayer
      const nextPrayer = findNextPrayer(prayerTimesList);
      if (nextPrayer !== -1) {
        prayerTimesList[nextPrayer].isNext = true;
      }

      setPrayerTimes(prayerTimesList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching prayer times:', err);
      setError('Failed to load prayer times. Please try again later.');
      setLoading(false);
    }
  };

  const formatTime = (timeStr: string): string => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const findNextPrayer = (prayers: PrayerTime[]): number => {
    const now = currentTime;
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    for (let i = 0; i < prayers.length; i++) {
      const [time, period] = prayers[i].time.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      // Convert to 24-hour format for comparison
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      const prayerTotalMinutes = hours * 60 + minutes;
      
      if (prayerTotalMinutes > currentTotalMinutes) {
        return i;
      }
    }
    
    // If no prayer is found for today, return the first prayer of the day
    return 0;
  };

  const handleRefresh = () => {
    if (location) {
      fetchPrayerTimes(location.lat, location.lng);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">Loading prayer times...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        <p>{error}</p>
        <Button variant="outline" onClick={handleRefresh} className="mt-2">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Prayer Times</CardTitle>
          <div className="text-sm text-muted-foreground">
            {location?.city || 'Your Location'}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prayerTimes.map((prayer) => (
            <div 
              key={prayer.name}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                prayer.isNext 
                  ? 'bg-primary/10 dark:bg-primary/20 border border-primary/20' 
                  : 'hover:bg-accent/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-medium ${prayer.isNext ? 'text-primary' : 'text-foreground'}`}>
                  {prayer.name}
                </span>
                {prayer.isNext && (
                  <span className="text-xs px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full">
                    Next
                  </span>
                )}
              </div>
              <span className={`font-mono ${prayer.isNext ? 'font-bold text-primary' : 'text-foreground'}`}>
                {prayer.time}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          <p>Times are calculated based on your location</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-1 text-xs h-7"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
