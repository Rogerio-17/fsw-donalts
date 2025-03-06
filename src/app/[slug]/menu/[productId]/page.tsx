import { getProductById } from "@/service/get-product-by-id"
import { notFound } from "next/navigation"
import { ProductHeader } from "./components/product-header"
import { ProductDetails } from "./components/product-details"
import { getRestaurantBySlug } from "@/service/get-restaurant-by-slug"

interface ProductPageProps {
    params: Promise<{
        slug: string
        productId: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { productId, slug } = await params

    const restaurant = await getRestaurantBySlug(slug)

    if (!restaurant) {
        return notFound()
    }

    const product = await getProductById(productId)

    if (!product) {
        return notFound()
    }

    if (restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
        return notFound()
    }

    return (
        <div className="flex h-full flex-col">
            <ProductHeader product={product} />
            <ProductDetails restaurant={restaurant} product={product} />
        </div>
    )
}