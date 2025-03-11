import { Header } from "@/components/hearde";
import { RestaurantItem } from "@/components/restaurant-item";
import { db } from "@/lib/prisma";

export default async function HomePage() {
  const restaurants = await db.restaurant.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  if (!restaurants) {
    return <div>Carregando...</div>
  }

  return (
    <div className="w-full h-full">
      <Header />

      <div className="p-5 mt-5">
        <h1 className="text-lg font-bold text-gray-800">Restaurantes:</h1>

        <div className="flex flex-col gap-2">
          {restaurants.map(restaurant => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div >
  )
}