import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Popup } from "@/components/popup"
import { useToast } from "@/components/ui/use-toast"

interface Recommendation {
  title: string
  description: string
  date: string
  time: string
  location: string
  tags: string[]
  score: number
}

export function PersonalizedRecommendations({ recommendations }: { recommendations: Recommendation[] }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Recommendation | null>(null);
  const { toast } = useToast();

  const handleRSVP = (recommendation: Recommendation) => {
    // Placeholder for event registration link
    console.log('Opening RSVP link for:', recommendation.title);
    setSelectedEvent(recommendation);
    setIsPopupOpen(true);
  };

  const handleAddToCalendar = () => {
    // Placeholder for Google Calendar API integration
    if (selectedEvent) {
      const event = {
        'summary': selectedEvent.title,
        'location': selectedEvent.location,
        'description': selectedEvent.description,
        'start': {
          'dateTime': `${selectedEvent.date}T${selectedEvent.time}:00`,
          'timeZone': 'America/Toronto'
        },
        'end': {
          'dateTime': `${selectedEvent.date}T${selectedEvent.time}:00`,
          'timeZone': 'America/Toronto'
        }
      };
      
      console.log('Adding to calendar:', event);
      toast({
        title: "Added to Calendar",
        description: "Event has been added to your Google Calendar.",
      });
    }
    setIsPopupOpen(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation, index) => (
          <Card key={index} className="relative pb-16">
            <CardHeader>
              <CardTitle>{recommendation.title}</CardTitle>
              <CardDescription>{recommendation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                {recommendation.date} at {recommendation.time} | {recommendation.location}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {recommendation.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button 
                className="absolute bottom-4 left-4 right-4 bg-customBlue hover:bg-customBlue/90"
                onClick={() => handleRSVP(recommendation)}
              >
                RSVP
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleAddToCalendar}
        onDecline={() => setIsPopupOpen(false)}
      />
    </div>
  )
}

