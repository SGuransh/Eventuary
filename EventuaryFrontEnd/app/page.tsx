'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar as CalendarIcon, Filter, Search, LogOut } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import Interests from "@/components/addInterests";
import { CalendarFilter } from "@/components/calendar-filter"
import { DateRange } from "react-day-picker"
import { isWithinInterval, parseISO } from "date-fns"
import { Popup } from "@/components/popup"

export default function Home() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
    fetchRecommendations()
  }, [])

  useEffect(() => {
    filterEventsByDateRange(events, dateRange)
  }, [events, dateRange])

  const filterEventsByDateRange = (events: any[], range: DateRange | undefined) => {
    if (!range?.from || !range?.to) {
      setFilteredEvents(events)
      return
    }

    const filtered = events.filter(event => {
      const eventDate = parseISO(event.date)
      return isWithinInterval(eventDate, { start: range.from!, end: range.to! })
    })

    setFilteredEvents(filtered)
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
  }

  const fetchEvents = () => {
    // This would be an API call to your AWS Lambda function
    const mockEvents = [
      { title: "Machine Learning Seminar", date: "2024-11-18", time: "15:00", location: "Bahen Centre" },
      { title: "Startup Networking Event", date: "2024-11-22", time: "18:00", location: "MaRS Discovery District" },
      { title: "Research Symposium", date: "2024-11-28", time: "09:00", location: "Convocation Hall" },
      { title: "Career Fair", date: "2024-12-02", time: "10:00", location: "Exam Centre" },
      { title: "Guest Lecture: Quantum Computing", date: "2024-12-05", time: "14:00", location: "McLennan Physical Labs" },
    ]
    setEvents(mockEvents)
  }

  const fetchRecommendations = async () => {
    try {
      // Replace with your actual API Gateway endpoint
      const apiUrl = "https://ldbdnwzd9e.execute-api.us-west-2.amazonaws.com/dev";
  
      // Replace with the current user's username (e.g., fetched from Cognito or your auth provider)
      const userName = "currentSignedInUser"; // Dynamically set this
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include Authorization header if needed
          Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Example for token-based auth
        },
        body: JSON.stringify({ userName }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
      }
  
      const data = await response.json();
      setRecommendations(data.recommendedEvents || []);
    } catch (error) {
      const mockRecommendations = [
        { title: "AI Ethics Symposium", description: "Join us for a discussion on the ethical implications of AI in today's society.", date: "2024-11-15", time: "14:00", location: "Bahen Centre", tags: ["AI", "Ethics"] },
        { title: "Data Science Workshop", description: "Learn the latest techniques in data analysis and visualization.", date: "2024-11-20", time: "10:00", location: "Myhal Centre", tags: ["Data Science", "Workshop"] },
        { title: "Music and Technology Concert", description: "Experience the intersection of classical music and modern technology.", date: "2024-12-06", time: "19:00", location: "Walter Hall", tags: ["Music", "Technology"] },
      ]

      setRecommendations(mockRecommendations)
      console.error("Error fetching recommendations:", error);
    }
  };

  const syncCalendar = () => {
    // This would integrate with AWS AppSync for real-time calendar synchronization
    toast({
      title: "Calendar Synced",
      description: "Your events have been synchronized with your personal calendar.",
    })
  }

  const logout = () => {
    // This would call your AWS Cognito logout function
    console.log("Logging out")
    // Redirect to auth page after logout
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 shadow-md">
        <div className="flex items-center space-x-2 mb-6">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">User</h2>
            <p className="text-sm text-gray-500">Computer Science</p>
          </div>
        </div>
        <nav>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <CalendarIcon className="mr-2 h-4 w-4" />
            My Events
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Filter className="mr-2 h-4 w-4" />
            Preferences
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
        <div className="mt-8">
          <Interests /> {/* Add Interests component here */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Eventuary: All Your Events In One Place</h1>
          <div className="flex space-x-4">
            <Input className="w-64" placeholder="Search events..." />
            <Button className="bg-customBlue hover:bg-customBlue/90">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </header>

        <Tabs defaultValue="recommended" className="mb-8">
          <TabsList>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>
          <TabsContent value="recommended">
            <PersonalizedRecommendations recommendations={recommendations} />
          </TabsContent>
          <TabsContent value="all">
            <p>All events content</p>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-8">
          <Card className="w-2/3">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events matching your interests and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <EventList events={filteredEvents} />
              </ScrollArea>
            </CardContent>
          </Card>
          <div className="w-1/3">
            <CalendarFilter onDateRangeChange={handleDateRangeChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

function EventList({ events }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { toast } = useToast();

  const handleRSVP = (event) => {
    console.log('RSVP for event:', event.title);
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const handleAddToCalendar = () => {
    if (selectedEvent) {
      return {
        access_token: "USER_ACCESS_TOKEN",
        summary: selectedEvent.title,
        location: selectedEvent.location,
        description: 'Event from UofT Event Aggregator',
        start_time: `${selectedEvent.date}T${selectedEvent.time}:00`,
        end_time: `${selectedEvent.date}T${selectedEvent.time}:00`,
        timeZone: 'America/Toronto'
      };
    }
    return null;
  };

  return (
    <>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow relative">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {event.date} at {event.time} | {event.location}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="absolute right-4 border-customBlue text-customBlue hover:bg-customBlue hover:text-white"
              onClick={() => handleRSVP(event)}
            >
              RSVP
            </Button>
          </div>
        ))}
      </div>
      
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={() => {
          setIsPopupOpen(false);
          toast({
            title: "Added to Calendar",
            description: "Event has been added to your Google Calendar.",
          });
        }}
        onDecline={() => setIsPopupOpen(false)}
        eventDetails={selectedEvent ? handleAddToCalendar() : null}
      />
    </>
  );
}

