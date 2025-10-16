"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Leaf, Target, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Solidariedade",
      description: "Acreditamos no poder da comunidade para combater a fome e o desperdício de alimentos.",
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Reduzimos o desperdício de alimentos e o impacto ambiental através da redistribuição.",
    },
    {
      icon: Users,
      title: "Inclusão",
      description: "Conectamos pessoas, empresas e organizações em prol de um objetivo comum.",
    },
    {
      icon: Target,
      title: "Transparência",
      description: "Mantemos processos claros e rastreáveis para garantir confiança e eficiência.",
    },
  ]

  const stats = [
    { value: "10.000+", label: "Kg de alimentos doados" },
    { value: "500+", label: "Doadores ativos" },
    { value: "150+", label: "ONGs e abrigos parceiros" },
    { value: "30.000+", label: "Pessoas impactadas" },
  ]

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary mb-6">
                <Heart className="h-8 w-8 text-primary-foreground fill-current" />
              </div>
              <h1 className="text-5xl font-bold text-balance mb-6">Sobre o Food Share</h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Somos uma plataforma de solidariedade que conecta pessoas, restaurantes e supermercados com excedente de
                alimentos a abrigos, ONGs e famílias em situação de vulnerabilidade. Nossa missão é combater a fome e
                reduzir o desperdício de alimentos através da tecnologia e da colaboração comunitária.
              </p>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4 border-y bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-balance mb-6">Nossa Missão</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      O Food Share nasceu da necessidade de criar uma ponte entre quem tem alimentos em excesso e quem
                      precisa deles. No Brasil, milhões de toneladas de alimentos são desperdiçadas anualmente, enquanto
                      milhões de pessoas passam fome.
                    </p>
                    <p>
                      Nossa plataforma facilita a doação de alimentos de forma rápida, segura e eficiente, utilizando
                      tecnologia de geolocalização para conectar doadores e beneficiários próximos, reduzindo o tempo de
                      transporte e garantindo a qualidade dos alimentos.
                    </p>
                    <p>
                      Acreditamos que juntos podemos construir uma sociedade mais justa e sustentável, onde nenhum
                      alimento seja desperdiçado e nenhuma pessoa passe fome.
                    </p>
                  </div>
                </div>
                <div className="grid gap-6">
                  <Card className="border-primary/20">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Impacto Social</h3>
                        <p className="text-sm text-muted-foreground">
                          Cada doação representa refeições para famílias em situação de vulnerabilidade e redução do
                          desperdício.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Crescimento Sustentável</h3>
                        <p className="text-sm text-muted-foreground">
                          Expandimos nossa rede de doadores e beneficiários continuamente, aumentando nosso impacto
                          positivo.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-balance mb-4">Nossos Valores</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Os princípios que guiam nosso trabalho e nossa comunidade
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl font-bold text-balance mb-4">Faça Parte Dessa Mudança</h2>
                  <p className="text-lg text-primary-foreground/90 text-pretty mb-8">
                    Junte-se a milhares de pessoas e organizações que estão fazendo a diferença no combate à fome e ao
                    desperdício de alimentos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/registro">Começar Agora</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      <Link href="/doacoes">Ver Doações</Link>
                    </Button>
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
