'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar as CalendarIcon, Filter, Search, LogOut } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"

export default function Home() {
  const [events, setEvents] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    // Simulating API calls to AWS services
    fetchEvents()
    fetchRecommendations()
  }, [])

  const fetchEvents = () => {
    // This would be an API call to your AWS Lambda function
    const mockEvents = [
      { title: "Machine Learning Seminar", date: "2024-03-18", time: "15:00", location: "Bahen Centre" },
      { title: "Startup Networking Event", date: "2024-03-22", time: "18:00", location: "MaRS Discovery District" },
      { title: "Research Symposium", date: "2024-03-28", time: "09:00", location: "Convocation Hall" },
      { title: "Career Fair", date: "2024-04-02", time: "10:00", location: "Exam Centre" },
      { title: "Guest Lecture: Quantum Computing", date: "2024-04-05", time: "14:00", location: "McLennan Physical Labs" },
    ]
    setEvents(mockEvents)
  }

  const fetchRecommendations = () => {
    // This would be an API call to AWS Personalize
    const mockRecommendations = [
      { title: "AI Ethics Symposium", description: "Join us for a discussion on the ethical implications of AI in today's society.", date: "2024-03-15", time: "14:00", location: "Bahen Centre", tags: ["AI", "Ethics"], score: 0.95 },
      { title: "Data Science Workshop", description: "Learn the latest techniques in data analysis and visualization.", date: "2024-03-20", time: "10:00", location: "Myhal Centre", tags: ["Data Science", "Workshop"], score: 0.88 },
      { title: "Music and Technology Concert", description: "Experience the intersection of classical music and modern technology.", date: "2024-03-25", time: "19:00", location: "Walter Hall", tags: ["Music", "Technology"], score: 0.75 },
    ]
    setRecommendations(mockRecommendations)
  }

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
            <h2 className="font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">Computer Science</p>
          </div>
        </div>
        <nav>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <CalendarIcon className="mr-2 h-4 w-4" />
            My Calendar
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
        <div className="mt-6">
          <h3 className="font-semibold mb-2">My Interests</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>Data Science</Badge>
            <Badge>AI</Badge>
            <Badge>Music</Badge>
            <Badge variant="outline">+ Add</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">UofT Event Aggregator</h1>
          <div className="flex space-x-4">
            <Input className="w-64" placeholder="Search events..." />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </header>

        <Tabs defaultValue="recommended" className="mb-8">
          <TabsList>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="department">By Department</TabsTrigger>
          </TabsList>
          <TabsContent value="recommended">
            <PersonalizedRecommendations recommendations={recommendations} />
          </TabsContent>
          <TabsContent value="all">
            <p>All events content</p>
          </TabsContent>
          <TabsContent value="department">
            <p>Events by department content</p>
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
                <EventList events={events} />
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>Calendar Integration</CardTitle>
              <CardDescription>Sync with your personal calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar />
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={syncCalendar}>Sync Calendar</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function EventList({ events }) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
          <div>
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-500">
              {event.date} at {event.time} | {event.location}
            </p>
          </div>
          <Button variant="outline">Details</Button>
        </div>
      ))}
    </div>
  )
}

