"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { mockDonations } from "@/lib/donations-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Heart, Package, Users, TrendingUp, MapPin, Calendar, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

function DashboardContent() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  // Filter donations based on user role
  const userDonations =
    user.role === "doador"
      ? mockDonations.filter((d) => d.donorId === user.id)
      : mockDonations.filter((d) => d.reservedBy === user.name || d.status === "disponivel")

  const stats = {
    totalDonations: user.role === "doador" ? 12 : 8,
    activeDonations: user.role === "doador" ? 5 : 3,
    completedDonations: user.role === "doador" ? 7 : 5,
    impactedPeople: user.role === "doador" ? 156 : 89,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-balance mb-2">Olá, {user.name.split(" ")[0]}!</h1>
              <p className="text-lg text-muted-foreground">
                {user.role === "doador"
                  ? "Gerencie suas doações e veja o impacto que você está causando"
                  : "Veja as doações disponíveis e gerencie suas reservas"}
              </p>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {user.role === "doador" ? "Total de Doações" : "Doações Recebidas"}
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDonations}</div>
                <p className="text-xs text-muted-foreground">+2 desde o último mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {user.role === "doador" ? "Doações Ativas" : "Reservas Ativas"}
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeDonations}</div>
                <p className="text-xs text-muted-foreground">Aguardando coleta</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {user.role === "doador" ? "Doações Concluídas" : "Coletas Realizadas"}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedDonations}</div>
                <p className="text-xs text-muted-foreground">+58% desde o início</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pessoas Impactadas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.impactedPeople}</div>
                <p className="text-xs text-muted-foreground">Estimativa baseada nas doações</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Donations List */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="active" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="active">{user.role === "doador" ? "Ativas" : "Disponíveis"}</TabsTrigger>
                    <TabsTrigger value="completed">
                      {user.role === "doador" ? "Concluídas" : "Minhas Reservas"}
                    </TabsTrigger>
                  </TabsList>
                  {user.role === "doador" && (
                    <Button asChild>
                      <Link href="/doacoes/nova">Nova Doação</Link>
                    </Button>
                  )}
                </div>

                <TabsContent value="active" className="space-y-4">
                  {userDonations
                    .filter((d) => (user.role === "doador" ? d.status !== "coletado" : d.status === "disponivel"))
                    .slice(0, 5)
                    .map((donation) => (
                      <Card key={donation.id}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={donation.image || "/placeholder.svg"}
                                alt={donation.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="font-semibold text-balance">{donation.title}</h3>
                                <Badge variant={donation.status === "disponivel" ? "default" : "secondary"}>
                                  {donation.status === "disponivel" ? "Disponível" : "Reservado"}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{donation.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>Validade: {new Date(donation.expiryDate).toLocaleDateString("pt-BR")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Package className="h-3 w-3" />
                                  <span>{donation.quantity}</span>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={`/doacoes/${donation.id}`}>Ver Detalhes</Link>
                                </Button>
                                {user.role === "doador" && (
                                  <>
                                    <Button size="sm" variant="ghost">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {userDonations
                    .filter((d) => (user.role === "doador" ? d.status === "coletado" : d.reservedBy === user.name))
                    .slice(0, 5)
                    .map((donation) => (
                      <Card key={donation.id}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={donation.image || "/placeholder.svg"}
                                alt={donation.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="font-semibold text-balance">{donation.title}</h3>
                                <Badge variant="outline">{user.role === "doador" ? "Coletado" : "Reservado"}</Badge>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{donation.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Package className="h-3 w-3" />
                                  <span>{donation.quantity}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Seu Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tipo de conta</p>
                    <Badge variant="secondary" className="capitalize">
                      {user.role === "doador" ? "Doador" : "Abrigo/ONG"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Localização</p>
                    <p className="text-sm">{user.location || "Não informado"}</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/perfil">Editar Perfil</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Impact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Seu Impacto</CardTitle>
                  <CardDescription>
                    {user.role === "doador" ? "Veja a diferença que você está fazendo" : "Alimentos recebidos este mês"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Meta Mensal</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Kg doados</span>
                      <span className="font-medium">127kg</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Refeições estimadas</span>
                      <span className="font-medium">423</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CO₂ economizado</span>
                      <span className="font-medium">89kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {user.role === "doador" ? (
                    <>
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/doacoes/nova">
                          <Package className="mr-2 h-4 w-4" />
                          Nova Doação
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/doacoes">
                          <Heart className="mr-2 h-4 w-4" />
                          Ver Todas Doações
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/doacoes">
                          <Package className="mr-2 h-4 w-4" />
                          Buscar Doações
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/dashboard">
                          <Heart className="mr-2 h-4 w-4" />
                          Minhas Reservas
                        </Link>
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  )
}
