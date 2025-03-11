"use client"
import Image from "next/image";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import { ClockIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
import { RestaurantDetails } from "./restaurant-details";
import { useState } from "react";
import { Restaurant } from "@prisma/client";

interface RestaurantItemProps {
    restaurant: Restaurant
}

export function RestaurantItem({ restaurant }: RestaurantItemProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    function handleRestaurantClick() {
        router.push(`/${restaurant.slug}`);
    }

    function handleSetOpen() {
        setOpen(!open)
    }

    // TODO: ADICIONAR UM MODAL COM O DETALHE DO RESTAURANTE

    return (
        <>
            <Card
                className="flex flex-col p-2 gap-2 mt-1"
            >
                <div className="flex items-center gap-2">
                    <div className="w-[62] h-[56] relative rounded-lg overflow-hidden">
                        <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={62} height={56} />
                    </div>
                    <div className="w-full">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold text-gray-800">{restaurant.name}</h2>
                            <div className="flex items-center gap-1 text-xs text-green-500">
                                <ClockIcon size={12} />
                                18h às 22h
                            </div>
                        </div>
                        <p className="text-gray-600 line-clamp-2 text-sm">
                            {restaurant.description}
                        </p>
                    </div>
                </div>

                <Separator />

                <Button
                    variant="default"
                    onClick={handleRestaurantClick}
                >
                    Ver cardápio
                </Button>

                <Button
                    variant="outline"
                    onClick={handleSetOpen}
                >
                    Ver detalhes
                </Button>
            </Card>

            <RestaurantDetails restaurant={restaurant} open={open} onOpenChange={handleSetOpen} />
        </>
    );
}