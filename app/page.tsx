import Link from "next/link"
import { ArrowRight, MapPin, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Smart Campus Assistance
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Navigate your campus, stay updated with events, and get answers to your questions - all in one place.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/map">
                  Explore Campus <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-blue-500 mb-4" />
                <CardTitle>Campus Map</CardTitle>
                <CardDescription>Interactive map to help you navigate around campus efficiently.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Find buildings, classrooms, facilities, and the shortest routes between locations.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/map">View Map</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-green-500 mb-4" />
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Get instant answers to your campus-related questions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Our AI chatbot can help with course information, campus policies, and general inquiries.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/chat">Chat Now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-purple-500 mb-4" />
                <CardTitle>Event Management</CardTitle>
                <CardDescription>Stay updated with campus events and activities.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Browse upcoming events, register for activities, and create your own events.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/events">View Events</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Smart Campus Assistance. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
