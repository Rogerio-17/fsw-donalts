"use client"
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface ProductHeaderProps {
    product: Pick<Product, "imageUrl" | "name">
}

export function ProductHeader({ product }: ProductHeaderProps) {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter()

    function handleBackClick() {
        router.back()
    }

    function handleOrdersClick() {
        router.push(`/${slug}/orders`)
    }

    return (
        <div className="relative min-h-[300px] w-full">
            <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-4 z-50 rounded-full"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />
            </Button>

            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
            />

            <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-4 z-50 rounded-full"
                onClick={handleOrdersClick}
            >
                <ScrollTextIcon />
            </Button>
        </div>
    )
}