import { Restaurant } from "@prisma/client";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "./ui/drawer";
import Image from "next/image";
import { Button } from "./ui/button";

interface RestaurantDetailsProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    restaurant: Restaurant
}

export function RestaurantDetails({ open, onOpenChange, restaurant }: RestaurantDetailsProps) {
    console.log(open)
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="mb-3 text-lg text-center font-bold text-gray-800">
                        Detalhes do restaurante
                    </DrawerTitle>
                    <DrawerDescription className="flex justify-center gap-2">
                        <div className="w-[62] h-[56] self-center relative rounded-lg overflow-hidden">
                            <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={62} height={56} />
                        </div>
                    </DrawerDescription>
                </DrawerHeader>

                <div className="w-screen p-4 pt-0">
                    <h2 className="text-lg text-center font-bold text-gray-800">{restaurant.name}</h2>
                    <p className="text-sm text-center text-gray-500 break-words">
                        {restaurant.description}
                    </p>

                    <DrawerClose asChild>
                        <Button className="w-full rounded-full mt-6" variant="destructive">
                            Fechar
                        </Button>
                    </DrawerClose>
                </div>
            </DrawerContent>
        </Drawer>
    )
}