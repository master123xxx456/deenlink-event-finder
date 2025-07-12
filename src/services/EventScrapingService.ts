interface ScrapedEvent {
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
  source: "website" | "instagram" | "facebook";
  lastUpdated: Date;
}

class EventScrapingService {
  private static instance: EventScrapingService;
  private updateInterval: NodeJS.Timeout | null = null;
  private listeners: ((events: ScrapedEvent[]) => void)[] = [];

  static getInstance(): EventScrapingService {
    if (!EventScrapingService.instance) {
      EventScrapingService.instance = new EventScrapingService();
    }
    return EventScrapingService.instance;
  }

  // Simulate scraping from real masjid websites and social media
  private async scrapeEvents(): Promise<ScrapedEvent[]> {
    // In production, this would make actual API calls to scraping endpoints
    const currentDate = new Date();
    const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const scrapedEvents: ScrapedEvent[] = [
      {
        id: `icm-${Date.now()}-1`,
        title: "Jummah Prayer & Khutbah",
        masjid: "Islamic Center of Maryland (ICM)",
        date: this.getNextFriday(),
        time: "1:15 PM",
        category: "Prayer",
        attendees: 280,
        isRegistered: false,
        recommendationType: "local",
        distance: "2.3 miles",
        description: "Weekly Friday congregational prayer with English and Arabic khutbah.",
        ageGroup: "All Ages",
        source: "website",
        lastUpdated: new Date()
      },
      {
        id: `adams-${Date.now()}-1`,
        title: "Youth Basketball Tournament",
        masjid: "ADAMS Center",
        date: this.formatDate(new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000)),
        time: "6:00 PM",
        category: "Sports",
        attendees: 45,
        isRegistered: false,
        recommendationType: "personalized",
        distance: "4.1 miles",
        description: "Annual youth basketball tournament for ages 13-18. Registration required.",
        ageGroup: "Teens",
        source: "instagram",
        lastUpdated: new Date()
      },
      {
        id: `dus-${Date.now()}-1`,
        title: "Sisters' Study Circle",
        masjid: "Dar-us-Salaam",
        date: this.formatDate(new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000)),
        time: "7:30 PM",
        category: "Education",
        attendees: 25,
        isRegistered: false,
        recommendationType: "following",
        distance: "1.8 miles",
        description: "Weekly sisters-only Islamic studies focusing on Tafseer Al-Quran.",
        ageGroup: "Adults",
        source: "website",
        lastUpdated: new Date()
      },
      {
        id: `icm-${Date.now()}-2`,
        title: "Quran Memorization Competition",
        masjid: "Islamic Center of Maryland (ICM)",
        date: this.formatDate(new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000)),
        time: "2:00 PM",
        category: "Competition",
        attendees: 65,
        isRegistered: false,
        recommendationType: "personalized",
        distance: "2.3 miles",
        description: "Annual Hifz competition for children and youth. Prizes for all participants.",
        ageGroup: "Kids",
        source: "facebook",
        lastUpdated: new Date()
      },
      {
        id: `mcc-${Date.now()}-1`,
        title: "Community Iftar Planning",
        masjid: "MCC Chicago",
        date: this.formatDate(new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000)),
        time: "8:00 PM",
        category: "Planning",
        attendees: 20,
        isRegistered: false,
        recommendationType: "local",
        distance: "8.2 miles",
        description: "Planning meeting for upcoming community Iftar during Ramadan.",
        ageGroup: "Adults",
        source: "website",
        lastUpdated: new Date()
      },
      {
        id: `adams-${Date.now()}-2`,
        title: "Islamic Finance Workshop",
        masjid: "ADAMS Center",
        date: this.formatDate(new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000)),
        time: "10:00 AM",
        category: "Education",
        attendees: 42,
        isRegistered: false,
        recommendationType: "following",
        distance: "4.1 miles",
        description: "Learn about halal investing, Islamic banking, and avoiding riba.",
        ageGroup: "Adults",
        source: "instagram",
        lastUpdated: new Date()
      },
      {
        id: `dus-${Date.now()}-2`,
        title: "Family Game Night",
        masjid: "Dar-us-Salaam",
        date: this.formatDate(nextWeek),
        time: "6:00 PM",
        category: "Family",
        attendees: 55,
        isRegistered: false,
        recommendationType: "local",
        distance: "1.8 miles",
        description: "Fun evening of board games, Islamic trivia, and light refreshments.",
        ageGroup: "Family",
        source: "website",
        lastUpdated: new Date()
      },
      {
        id: `icm-${Date.now()}-3`,
        title: "Arabic Calligraphy Class",
        masjid: "Islamic Center of Maryland (ICM)",
        date: this.formatDate(new Date(nextWeek.getTime() + 24 * 60 * 60 * 1000)),
        time: "4:00 PM",
        category: "Arts",
        attendees: 18,
        isRegistered: false,
        recommendationType: "personalized",
        distance: "2.3 miles",
        description: "Learn the beautiful art of Arabic calligraphy. All skill levels welcome.",
        ageGroup: "All Ages",
        source: "website",
        lastUpdated: new Date()
      }
    ];

    return scrapedEvents;
  }

  private getNextFriday(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today.getTime() + daysUntilFriday * 24 * 60 * 60 * 1000);
    return this.formatDate(nextFriday);
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }

  // Start automatic updates every 30 minutes
  startAutoUpdate(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    // Initial scrape
    this.scrapeAndNotify();

    // Set up regular updates (every 30 minutes)
    this.updateInterval = setInterval(() => {
      this.scrapeAndNotify();
    }, 30 * 60 * 1000); // 30 minutes
  }

  stopAutoUpdate(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private async scrapeAndNotify(): Promise<void> {
    try {
      console.log('🔄 Scraping events from masjid websites and social media...');
      const events = await this.scrapeEvents();
      console.log(`✅ Found ${events.length} events from various sources`);
      
      // Notify all listeners
      this.listeners.forEach(callback => callback(events));
    } catch (error) {
      console.error('❌ Error scraping events:', error);
    }
  }

  // Subscribe to event updates
  subscribe(callback: (events: ScrapedEvent[]) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Manual refresh for user-triggered updates
  async refreshEvents(): Promise<ScrapedEvent[]> {
    console.log('🔄 Manual refresh requested...');
    const events = await this.scrapeEvents();
    this.listeners.forEach(callback => callback(events));
    return events;
  }

  // Simulate scraping from specific sources
  async scrapeFromSource(source: 'website' | 'instagram' | 'facebook'): Promise<ScrapedEvent[]> {
    const allEvents = await this.scrapeEvents();
    return allEvents.filter(event => event.source === source);
  }
}

export default EventScrapingService;
export type { ScrapedEvent };