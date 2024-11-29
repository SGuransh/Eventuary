import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation, index) => (
          <Card key={index}>
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
              <p className="text-sm font-semibold mb-2">
                Recommendation Score: {recommendation.score.toFixed(2)}
              </p>
              <Button className="w-full">Add to Calendar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

