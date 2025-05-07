"use client"

import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

// Dynamically import Leaflet to avoid SSR issues
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-md">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

interface Location {
  id: number
  name: string
  lat: number
  lng: number
  type: string
}

interface CampusMapProps {
  locations: Location[]
  selectedLocationId: number | null
  onLocationSelect: (id: number) => void
}

export default function CampusMap({ locations, selectedLocationId, onLocationSelect }: CampusMapProps) {
  return (
    <LeafletMap locations={locations} selectedLocationId={selectedLocationId} onLocationSelect={onLocationSelect} />
  )
}
