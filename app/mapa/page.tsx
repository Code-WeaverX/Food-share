"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { AuthProvider } from "@/lib/auth-context"
import { mockDonations, categoryLabels, type Donation } from "@/lib/donations-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Package, Calendar, Navigation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MapPage() {
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>("todas")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [viewMode, setViewMode] = useState<"map" | "list">("map")

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("[v0] Geolocation error:", error)
          // Default to São Paulo center
          setUserLocation({ lat: -23.5505, lng: -46.6333 })
        },
      )
    } else {
      // Default to São Paulo center
      setUserLocation({ lat: -23.5505, lng: -46.6333 })
    }
  }, [])

  const filteredDonations = mockDonations.filter((donation) => {
    const matchesCategory = categoryFilter === "todas" || donation.category === categoryFilter
    const matchesStatus = donation.status === "disponivel"
    return matchesCategory && matchesStatus
  })

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const donationsWithDistance = userLocation
    ? filteredDonations.map((donation) => ({
        ...donation,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          donation.coordinates.lat,
          donation.coordinates.lng,
        ),
      }))
    : filteredDonations.map((d) => ({ ...d, distance: 0 }))

  const sortedDonations = donationsWithDistance.sort((a, b) => a.distance - b.distance)

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
            {/* Map Section */}
            <div className="flex-1 relative bg-muted">
              {/* Map Placeholder - In production, use a real map library like Leaflet or Mapbox */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <MapPin className="h-16 w-16 text-primary mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Visualização do Mapa</h3>
                    <p className="text-muted-foreground text-pretty max-w-md">
                      Aqui seria exibido um mapa interativo com as doações próximas a você. Em produção, integraríamos
                      com Google Maps, Mapbox ou Leaflet.
                    </p>
                  </div>
                  {userLocation && (
                    <div className="text-sm text-muted-foreground">
                      Sua localização: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </div>
                  )}
                </div>
              </div>

              {/* Map Markers Visualization */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  {sortedDonations.slice(0, 10).map((donation, index) => {
                    // Simple visualization - distribute markers across the map area
                    const x = 20 + (index % 3) * 30 + Math.random() * 10
                    const y = 20 + Math.floor(index / 3) * 25 + Math.random() * 10
                    return (
                      <g key={donation.id}>
                        <circle
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="8"
                          fill="hsl(var(--primary))"
                          className="pointer-events-auto cursor-pointer hover:r-10 transition-all"
                          onClick={() => setSelectedDonation(donation)}
                        />
                        <text
                          x={`${x}%`}
                          y={`${y}%`}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-primary-foreground text-xs font-bold pointer-events-none"
                        >
                          {index + 1}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* Selected Donation Card */}
              {selectedDonation && (
                <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:w-96 z-10">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg text-balance">{selectedDonation.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDonation(null)}
                          className="h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {selectedDonation.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="relative h-32 w-full rounded-lg overflow-hidden">
                        <Image
                          src={selectedDonation.image || "/placeholder.svg"}
                          alt={selectedDonation.title}
                          fill
                          className="object-cover"
                          sizes="384px"
                        />
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedDonation.quantity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedDonation.distance.toFixed(1)} km</span>
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/doacoes/${selectedDonation.id}`}>Ver Detalhes</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-96 border-l bg-background overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">Doações Próximas</h2>
                  <p className="text-sm text-muted-foreground">
                    {sortedDonations.length} doações disponíveis na sua região
                  </p>
                </div>

                {/* Filters */}
                <div className="space-y-3">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as categorias</SelectItem>
                      <SelectItem value="frutas">Frutas</SelectItem>
                      <SelectItem value="vegetais">Vegetais</SelectItem>
                      <SelectItem value="graos">Grãos</SelectItem>
                      <SelectItem value="laticinios">Laticínios</SelectItem>
                      <SelectItem value="proteinas">Proteínas</SelectItem>
                      <SelectItem value="padaria">Padaria</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                          setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          })
                        })
                      }
                    }}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Atualizar Localização
                  </Button>
                </div>

                {/* Donations List */}
                <div className="space-y-3">
                  {sortedDonations.map((donation, index) => (
                    <Card
                      key={donation.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedDonation?.id === donation.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedDonation(donation)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-sm text-balance">{donation.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {categoryLabels[donation.category]}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Navigation className="h-3 w-3" />
                                <span>{donation.distance.toFixed(1)} km de distância</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Package className="h-3 w-3" />
                                <span>{donation.quantity}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Validade: {new Date(donation.expiryDate).toLocaleDateString("pt-BR")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {sortedDonations.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Nenhuma doação disponível com os filtros selecionados
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
