"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Navigation } from "lucide-react"
import CampusMap from "@/components/campus-map"
import { useMobile } from "@/hooks/use-mobile"

const locations = [
  { id: 1, name: "Main Building", lat: 51.505, lng: -0.09, type: "academic" },
  { id: 2, name: "Library", lat: 51.506, lng: -0.088, type: "academic" },
  { id: 3, name: "Student Center", lat: 51.504, lng: -0.092, type: "service" },
  { id: 4, name: "Science Lab", lat: 51.503, lng: -0.089, type: "academic" },
  { id: 5, name: "Cafeteria", lat: 51.507, lng: -0.091, type: "service" },
  { id: 6, name: "Sports Complex", lat: 51.508, lng: -0.093, type: "recreation" },
]

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const isMobile = useMobile()

  const filteredLocations = locations.filter(
    (location) =>
      (filterType === "all" || location.type === filterType) &&
      location.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Campus Map</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Locations</CardTitle>
                <CardDescription>Search for buildings and facilities on campus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="search"
                      placeholder="Search locations..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Filter by Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="academic">Academic Buildings</SelectItem>
                      <SelectItem value="service">Services</SelectItem>
                      <SelectItem value="recreation">Recreation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Locations</Label>
                  <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location) => (
                        <div
                          key={location.id}
                          className={`p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center ${
                            selectedLocation === location.id ? "bg-blue-50" : ""
                          }`}
                          onClick={() => setSelectedLocation(location.id)}
                        >
                          <div>
                            <p className="font-medium">{location.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{location.type}</p>
                          </div>
                          <Navigation className="h-4 w-4 text-blue-500" />
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500">No locations found</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <CampusMap
                  locations={locations}
                  selectedLocationId={selectedLocation}
                  onLocationSelect={setSelectedLocation}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
