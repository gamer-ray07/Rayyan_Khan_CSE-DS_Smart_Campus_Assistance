"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Filter } from "lucide-react"
import Link from "next/link"
import EventCard from "@/components/event-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample event data
const events = [
  {
    id: 1,
    title: "Freshman Orientation",
    description: "Welcome event for new students with campus tours and activities.",
    date: "2025-05-15",
    time: "09:00 AM - 04:00 PM",
    location: "Student Center",
    category: "orientation",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Tech Career Fair",
    description: "Meet representatives from top tech companies and explore job opportunities.",
    date: "2025-05-20",
    time: "10:00 AM - 03:00 PM",
    location: "Engineering Building",
    category: "career",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Spring Concert",
    description: "Annual spring concert featuring student bands and special guests.",
    date: "2025-05-25",
    time: "07:00 PM - 10:00 PM",
    location: "Campus Amphitheater",
    category: "entertainment",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Research Symposium",
    description: "Showcase of student and faculty research projects across all disciplines.",
    date: "2025-06-05",
    time: "01:00 PM - 05:00 PM",
    location: "Science Center",
    category: "academic",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "International Food Festival",
    description: "Celebrate cultural diversity with food from around the world.",
    date: "2025-06-10",
    time: "11:00 AM - 02:00 PM",
    location: "Main Quad",
    category: "cultural",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredEvents = events.filter(
    (event) =>
      (categoryFilter === "all" || event.category === categoryFilter) &&
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Campus Events</h1>
          <p className="text-gray-500">Discover and manage events happening around campus</p>
        </div>
        <Button asChild>
          <Link href="/events/create">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="my-events">My Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                  <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="orientation">Orientation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500 mb-4">No events found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setCategoryFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="my-events">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">You haven't created or registered for any events yet</p>
              <Button asChild>
                <Link href="/events/create">Create Your First Event</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500">No past events to display</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
