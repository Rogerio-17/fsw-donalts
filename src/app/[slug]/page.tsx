import { getRestaurantBySlug } from "@/service/get-restaurant-by-slug"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ConsumptionMethodOption } from "./components/consumption-method-option"
import { ConsumptionMethodHeader } from "./components/consumption-method-header"

interface RestaurantPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
    const { slug } = await params
    const restaurant = await getRestaurantBySlug(slug)

    if (!restaurant) {
        return notFound()
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
            {/* LOGO E TITULO */}
            <div>
                <ConsumptionMethodHeader />

                <div className="flex flex-col items-center gap-2">
                    <Image
                        src={restaurant.avatarImageUrl}
                        alt={restaurant.name}
                        width={82}
                        height={82}
                    />

                    <h2 className="font-semibold">
                        {restaurant.name}
                    </h2>
                </div>
            </div>

            {/* BEM VINDO */}
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">
                    Seja bem-vindo
                </h3>
                <p className="opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos
                    oferecendo praticidade e sabor em cada detalhe!
                </p>
            </div>

            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionMethodOption
                    buttonText="Para comer aqui"
                    imageUrl="/dine_in.png"
                    imageAlt="Para comer aqui"
                    option="DINE_IN"
                    slug={slug}
                />

                <ConsumptionMethodOption
                    buttonText="Para levar"
                    imageUrl="/takeaway.png"
                    imageAlt="Para levar"
                    option="TAKEAWAY"
                    slug={slug}
                />
            </div>

        </div>
    )

}