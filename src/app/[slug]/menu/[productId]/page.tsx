import { getProductById } from "@/data/get-product-by-id"
import { notFound } from "next/navigation"
import { ProductHeader } from "./components/product-header"

interface ProductPageProps {
    params: Promise<{
        slug: string
        productId: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { productId, slug } = await params

    const product = await getProductById(productId)

    if (!product) {
        return notFound()
    }

    return (
        <div>
            <ProductHeader product={product} />
            <h3>Pagina de produtos</h3>
            <p>{productId}</p>
            <p>{slug}</p>
        </div>
    )
}