export interface Donation {
  id: string
  title: string
  category: "frutas" | "vegetais" | "graos" | "laticinios" | "proteinas" | "padaria" | "outros"
  quantity: string
  expiryDate: string
  image: string
  location: string
  coordinates: { lat: number; lng: number }
  donorId: string
  donorName: string
  status: "disponivel" | "reservado" | "coletado"
  reservedBy?: string
  createdAt: string
}

export const mockDonations: Donation[] = [
  {
    id: "1",
    title: "Frutas Frescas Variadas",
    category: "frutas",
    quantity: "5kg",
    expiryDate: "2025-10-20",
    image: "/fresh-fruits-basket.png",
    location: "Padaria Central, São Paulo - SP",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    donorId: "1",
    donorName: "Padaria Central",
    status: "disponivel",
    createdAt: "2025-10-16T10:00:00Z",
  },
  {
    id: "2",
    title: "Pães do Dia",
    category: "padaria",
    quantity: "20 unidades",
    expiryDate: "2025-10-17",
    image: "/fresh-bread-loaves.jpg",
    location: "Supermercado Bom Preço, São Paulo - SP",
    coordinates: { lat: -23.5489, lng: -46.6388 },
    donorId: "2",
    donorName: "Supermercado Bom Preço",
    status: "disponivel",
    createdAt: "2025-10-16T08:30:00Z",
  },
  {
    id: "3",
    title: "Vegetais Orgânicos",
    category: "vegetais",
    quantity: "8kg",
    expiryDate: "2025-10-19",
    image: "/organic-vegetables-display.png",
    location: "Restaurante Verde Vida, São Paulo - SP",
    coordinates: { lat: -23.5558, lng: -46.6396 },
    donorId: "3",
    donorName: "Restaurante Verde Vida",
    status: "reservado",
    reservedBy: "Abrigo Esperança",
    createdAt: "2025-10-15T14:20:00Z",
  },
  {
    id: "4",
    title: "Arroz e Feijão",
    category: "graos",
    quantity: "10kg",
    expiryDate: "2026-03-15",
    image: "/rice-and-beans.jpg",
    location: "Mercado da Família, São Paulo - SP",
    coordinates: { lat: -23.5629, lng: -46.6544 },
    donorId: "4",
    donorName: "Mercado da Família",
    status: "disponivel",
    createdAt: "2025-10-16T09:15:00Z",
  },
  {
    id: "5",
    title: "Leite e Iogurtes",
    category: "laticinios",
    quantity: "15 litros",
    expiryDate: "2025-10-22",
    image: "/milk-and-yogurt.jpg",
    location: "Laticínios São João, São Paulo - SP",
    coordinates: { lat: -23.5475, lng: -46.6361 },
    donorId: "5",
    donorName: "Laticínios São João",
    status: "disponivel",
    createdAt: "2025-10-16T11:00:00Z",
  },
  {
    id: "6",
    title: "Frango Congelado",
    category: "proteinas",
    quantity: "12kg",
    expiryDate: "2025-11-30",
    image: "/frozen-chicken.png",
    location: "Açougue Premium, São Paulo - SP",
    coordinates: { lat: -23.552, lng: -46.642 },
    donorId: "6",
    donorName: "Açougue Premium",
    status: "coletado",
    reservedBy: "ONG Alimentar",
    createdAt: "2025-10-14T16:45:00Z",
  },
]

export const categoryLabels: Record<Donation["category"], string> = {
  frutas: "Frutas",
  vegetais: "Vegetais",
  graos: "Grãos",
  laticinios: "Laticínios",
  proteinas: "Proteínas",
  padaria: "Padaria",
  outros: "Outros",
}
