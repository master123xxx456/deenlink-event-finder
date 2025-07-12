import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  eventSuggestions?: Array<{
    id: string;
    title: string;
    masjid: string;
    date: string;
    type: string;
  }>;
}

export const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Assalamu Alaikum! I'm your DeenLink assistant. I can help you find events at local masjids. Try asking me something like 'What's happening at ICM this Friday?' or 'Any youth programs near me this weekend?'",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
        eventSuggestions: generateEventSuggestions(inputText),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText("");
  };

  const generateBotResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes("icm") || lowercaseInput.includes("islamic center")) {
      return "I found several events at Islamic Center of Maryland (ICM) this week! Here are some upcoming events:";
    }
    if (lowercaseInput.includes("youth") || lowercaseInput.includes("young")) {
      return "Great! I found some youth programs in your area. Here are the upcoming youth events:";
    }
    if (lowercaseInput.includes("eid") || lowercaseInput.includes("celebration")) {
      return "Eid Mubarak! Here are the upcoming Eid celebrations in your area:";
    }
    if (lowercaseInput.includes("halaqa") || lowercaseInput.includes("study")) {
      return "MashAllah! Here are the Islamic study circles and halaqa sessions near you:";
    }
    
    return "I found some events that might interest you based on your location and preferences:";
  };

  const generateEventSuggestions = (input: string) => {
    const allEvents = [
      {
        id: "1",
        title: "Friday Night Youth Program",
        masjid: "Islamic Center of Maryland (ICM)",
        date: "This Friday 7:00 PM",
        type: "youth"
      },
      {
        id: "2",
        title: "Halaqa: Tafseer Al-Quran",
        masjid: "ADAMS Center",
        date: "Saturday 2:00 PM",
        type: "education"
      },
      {
        id: "3",
        title: "Family BBQ & Sports Day",
        masjid: "Dar-us-Salaam",
        date: "Sunday 12:00 PM",
        type: "family"
      },
      {
        id: "4",
        title: "Eid ul-Fitr Celebration",
        masjid: "MCC Chicago",
        date: "Next Tuesday 8:00 AM",
        type: "celebration"
      },
      {
        id: "5",
        title: "Arabic Language Classes",
        masjid: "Islamic Center of Maryland (ICM)",
        date: "Every Wednesday 6:30 PM",
        type: "education"
      }
    ];

    // Filter based on input
    const lowercaseInput = input.toLowerCase();
    if (lowercaseInput.includes("icm")) {
      return allEvents.filter(event => event.masjid.includes("ICM"));
    }
    if (lowercaseInput.includes("youth")) {
      return allEvents.filter(event => event.type === "youth");
    }
    if (lowercaseInput.includes("eid")) {
      return allEvents.filter(event => event.type === "celebration");
    }
    if (lowercaseInput.includes("halaqa") || lowercaseInput.includes("study")) {
      return allEvents.filter(event => event.type === "education");
    }

    return allEvents.slice(0, 3);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "youth": return "bg-local text-local-foreground";
      case "education": return "bg-primary text-primary-foreground";
      case "family": return "bg-following text-following-foreground";
      case "celebration": return "bg-accent text-accent-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-primary bg-gradient-primary hover:shadow-lg transition-all duration-300 z-50"
        size="lg"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 bg-card border-border">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>DeenLink Assistant</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div
                  className={`flex items-start space-x-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <User className="w-4 h-4 text-accent-foreground" />
                    </div>
                  )}
                </div>

                {message.eventSuggestions && (
                  <div className="ml-10 space-y-2">
                    {message.eventSuggestions.map((event) => (
                      <div key={event.id} className="p-3 bg-card border border-border rounded-lg hover:shadow-card transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                            <p className="text-xs text-muted-foreground">{event.masjid}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                          </div>
                          <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about local masjid events..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm" className="px-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};