"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"

interface Location {
  id: number
  name: string
  lat: number
  lng: number
  type: string
}

interface LeafletMapProps {
  locations: Location[]
  selectedLocationId: number | null
  onLocationSelect: (id: number) => void
}

export default function LeafletMap({ locations, selectedLocationId, onLocationSelect }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [key: number]: L.Marker }>({})

  // Fix Leaflet icon issues
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl

    // Use unpkg CDN with specific version for more reliability
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) {
      try {
        // Create map
        mapRef.current = L.map("map").setView([51.505, -0.09], 16)

        // Add tile layer (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapRef.current)

        // Add markers for each location
        locations.forEach((location) => {
          const marker = L.marker([location.lat, location.lng])
            .addTo(mapRef.current!)
            .bindPopup(`<b>${location.name}</b><br>${location.type}`)

          marker.on("click", () => {
            onLocationSelect(location.id)
          })

          markersRef.current[location.id] = marker
        })
      } catch (error) {
        console.error("Error initializing map:", error)
      }
    }

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [locations, onLocationSelect])

  // Handle selected location changes
  useEffect(() => {
    if (mapRef.current && selectedLocationId) {
      const marker = markersRef.current[selectedLocationId]
      if (marker) {
        const location = locations.find((loc) => loc.id === selectedLocationId)
        if (location) {
          mapRef.current.setView([location.lat, location.lng], 18)
          marker.openPopup()
        }
      }
    }
  }, [selectedLocationId, locations])

  return <div id="map" className="h-full w-full rounded-md" />
}
