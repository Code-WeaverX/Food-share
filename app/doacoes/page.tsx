"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { mockDonations, categoryLabels, type Donation } from "@/lib/donations-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Package, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function DonationsContent() {
  const [donations, setDonations] = useState<Donation[]>(mockDonations)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("todas")
  const [statusFilter, setStatusFilter] = useState<string>("todas")

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "todas" || donation.category === categoryFilter
    const matchesStatus = statusFilter === "todas" || donation.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: Donation["status"]) => {
    const variants = {
      disponivel: "default",
      reservado: "secondary",
      coletado: "outline",
    } as const

    const labels = {
      disponivel: "Disponível",
      reservado: "Reservado",
      coletado: "Coletado",
    }

    return (
      <Badge variant={variants[status]} className="capitalize">
        {labels[status]}
      </Badge>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-balance mb-3">Doações Disponíveis</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Encontre alimentos disponíveis para doação na sua região
            </p>
          </div>

          {/* Filters Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou localização..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todos os status</SelectItem>
                    <SelectItem value="disponivel">Disponível</SelectItem>
                    <SelectItem value="reservado">Reservado</SelectItem>
                    <SelectItem value="coletado">Coletado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredDonations.length} {filteredDonations.length === 1 ? "doação encontrada" : "doações encontradas"}
            </p>
            <Button asChild>
              <Link href="/doacoes/nova">Nova Doação</Link>
            </Button>
          </div>

          {/* Donations Grid */}
          {filteredDonations.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center">
                <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma doação encontrada</h3>
                <p className="text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDonations.map((donation) => (
                <Card key={donation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={donation.image || "/placeholder.svg"}
                      alt={donation.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl text-balance">{donation.title}</CardTitle>
                      {getStatusBadge(donation.status)}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {donation.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{donation.quantity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Validade: {new Date(donation.expiryDate).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                    <div>
                      <Badge variant="secondary">{categoryLabels[donation.category]}</Badge>
                    </div>
                    {donation.reservedBy && (
                      <p className="text-sm text-muted-foreground">Reservado por: {donation.reservedBy}</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" disabled={donation.status !== "disponivel"}>
                      <Link href={`/doacoes/${donation.id}`}>
                        {donation.status === "disponivel" ? "Ver Detalhes" : "Indisponível"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function DonationsPage() {
  return (
    <AuthProvider>
      <DonationsContent />
    </AuthProvider>
  )
}
