"use client"
import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, 'coverImageUrl' | 'name'>
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter()

    function handleBackClick() {
        router.back()
    }

    function handleOrdersClick() {
        router.push(`/${slug}/orders`)
    }

    return (
        <div className="relative h-[250px] w-full">
            <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-4 z-50 rounded-full"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />
            </Button>

            <Image
                src={restaurant.coverImageUrl}
                fill
                alt={restaurant.name}
                className="object-cover"
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