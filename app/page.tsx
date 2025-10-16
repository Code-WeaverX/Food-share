"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { Heart, MapPin, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Heart className="h-4 w-4 fill-current" />
                  Combatendo a fome juntos
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl">
                  Transforme excedentes em esperança
                </h1>

                <p className="mb-8 text-lg text-muted-foreground text-pretty leading-relaxed md:text-xl">
                  Conectamos pessoas, restaurantes e supermercados com excedentes alimentares a abrigos, ONGs e famílias
                  em necessidade.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button asChild size="lg" className="text-base">
                    <Link href="/registro">
                      Começar a Doar
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                    <Link href="/mapa">
                      <MapPin className="mr-2 h-5 w-5" />
                      Ver Mapa de Doações
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="border-y bg-muted/30 py-12">
            <div className="container">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">1.2M+</div>
                  <div className="text-sm text-muted-foreground">Refeições Doadas</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">850+</div>
                  <div className="text-sm text-muted-foreground">Doadores Ativos</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">320+</div>
                  <div className="text-sm text-muted-foreground">Abrigos Parceiros</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">45</div>
                  <div className="text-sm text-muted-foreground">Cidades Atendidas</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="container">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Como funciona</h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
                  Uma plataforma simples e eficiente para conectar quem pode doar com quem precisa
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Cadastre sua doação</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Restaurantes, supermercados e pessoas físicas podem cadastrar alimentos disponíveis para doação de
                      forma rápida e fácil.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Encontre doações próximas</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Abrigos e ONGs visualizam doações disponíveis em um mapa interativo, filtrando por tipo de
                      alimento e distância.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Reserve e colete</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Reserve a doação com um clique e coordene a coleta diretamente com o doador através da plataforma.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="bg-muted/30 py-20">
            <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Para doadores</h2>
                  <ul className="space-y-4">
                    {[
                      "Reduza o desperdício de alimentos",
                      "Contribua para sua comunidade",
                      "Processo simples e rápido",
                      "Acompanhe o impacto das suas doações",
                      "Incentivos fiscais para empresas",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="mt-8">
                    <Link href="/registro">Começar a Doar</Link>
                  </Button>
                </div>

                <div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Para abrigos e ONGs</h2>
                  <ul className="space-y-4">
                    {[
                      "Acesso gratuito a alimentos de qualidade",
                      "Visualização em tempo real de doações",
                      "Sistema de reserva simples",
                      "Notificações de novas doações",
                      "Suporte dedicado para organizações",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                        <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" variant="secondary" className="mt-8">
                    <Link href="/registro">Cadastrar Organização</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container">
              <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-8 md:p-12">
                  <div className="mx-auto max-w-2xl text-center">
                    <TrendingUp className="mx-auto mb-6 h-12 w-12 text-primary" />
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                      Faça parte dessa transformação
                    </h2>
                    <p className="mb-8 text-lg text-muted-foreground text-pretty leading-relaxed">
                      Junte-se a milhares de pessoas e organizações que já estão fazendo a diferença no combate à fome.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                      <Button asChild size="lg">
                        <Link href="/registro">Criar Conta Gratuita</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link href="/sobre">Saiba Mais</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  )
}
