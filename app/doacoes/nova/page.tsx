"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import type { Donation } from "@/lib/donations-data"

function NewDonationForm() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "" as Donation["category"],
    quantity: "",
    expiryDate: "",
    location: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Doação criada com sucesso!",
        description: "Sua doação foi publicada e está disponível para reserva.",
      })

      router.push("/doacoes")
    } catch (error) {
      toast({
        title: "Erro ao criar doação",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Acesso Restrito</CardTitle>
              <CardDescription>Você precisa estar logado para criar uma doação.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/login">Fazer Login</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/doacoes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para doações
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Nova Doação</CardTitle>
              <CardDescription>Preencha os detalhes da sua doação de alimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Doação *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Frutas Frescas Variadas"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleChange("category", value)}
                      disabled={isLoading}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frutas">Frutas</SelectItem>
                        <SelectItem value="vegetais">Vegetais</SelectItem>
                        <SelectItem value="graos">Grãos</SelectItem>
                        <SelectItem value="laticinios">Laticínios</SelectItem>
                        <SelectItem value="proteinas">Proteínas</SelectItem>
                        <SelectItem value="padaria">Padaria</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade *</Label>
                    <Input
                      id="quantity"
                      placeholder="Ex: 5kg ou 20 unidades"
                      value={formData.quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Data de Validade *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                    required
                    disabled={isLoading}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização *</Label>
                  <Input
                    id="location"
                    placeholder="Ex: Rua das Flores, 123 - São Paulo, SP"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Adicione informações adicionais sobre a doação..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    disabled={isLoading}
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1 bg-transparent"
                    disabled={isLoading}
                  >
                    <Link href="/doacoes">Cancelar</Link>
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      "Criar Doação"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function NewDonationPage() {
  return (
    <AuthProvider>
      <NewDonationForm />
    </AuthProvider>
  )
}
