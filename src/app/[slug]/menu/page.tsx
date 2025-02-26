import { Button } from "@/components/ui/button"
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug"
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { RestaurantHeader } from "./components/header"

interface RestaurantMenuPageProps {
    params: Promise<{
        slug: string
    }>
    searchParams: Promise<{
        consumptionMethod: string
    }>
}

function ConsumptionMethodValid(consumptionMethod: string) {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase())
}

export default async function RestaurantMenuPage({ params, searchParams }: RestaurantMenuPageProps) {
    const { slug } = await params
    const { consumptionMethod } = await searchParams

    const isConsumptionMethodValid = ConsumptionMethodValid(consumptionMethod)

    if (!isConsumptionMethodValid) {
        return notFound()
    }

    const restaurant = await getRestaurantBySlug(slug)

    if (!restaurant) {
        return notFound()
    }

    return (
        <div>
            <RestaurantHeader
                restaurant={restaurant}
            />
        </div>
    )
}