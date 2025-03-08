"use client"
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { Products } from "./products";
import { CartContext } from "../context/cart";
import { formatCurrency } from "@/utils/format-currency";
import { CartSheet } from "./cart-sheet";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            MenuCategory: {
                include: { Product: true }
            }
        }
    }>
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: {
        Product: true
    }
}>

export function RestaurantCategories({ restaurant }: RestaurantCategoriesProps) {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(restaurant.MenuCategory[0])
    const { total, toggleCart, totalQuantity } = useContext(CartContext)

    function handleCategoryClick(category: MenuCategoriesWithProducts) {
        setSelectedCategory(category)
    }

    function getCategoryButtonVariant(category: MenuCategoriesWithProducts) {
        return category.id === selectedCategory.id ? "default" : "secondary"
    }

    return (
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
            <div className="p-5 pb-3 border-b-[1px]">
                <div className="flex items-center gap-3">
                    <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={45} height={45} />
                    <div className="">
                        <h2 className="font-semibold text-lg">{restaurant.name}</h2>
                        <p className="text-xs opacity-55">{restaurant.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
                    <ClockIcon size={12} />
                    <p>Aberto!</p>
                </div>
            </div>

            <ScrollArea className="w-full pt-3">
                <div className="flex w-max space-x-4 p-4 pt-0">
                    {
                        restaurant.MenuCategory.map((category) => (
                            <Button
                                onClick={() => handleCategoryClick(category)}
                                className="rounded-full"
                                key={category.id}
                                variant={getCategoryButtonVariant(category)}
                                size="sm"
                            >
                                {category.name}
                            </Button>
                        ))
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
            <Products products={selectedCategory.Product} />
            {
                totalQuantity > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between p-3 bg-white border-t px-5 py-3">
                        <div>
                            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
                            <p className="text-sm font-semibold">{formatCurrency(total)}
                                <span className="text-xs font-normal text-muted-foreground">
                                    /{totalQuantity} {totalQuantity <= 1 ? `item` : `items`}
                                </span>
                            </p>
                        </div>

                        <Button onClick={toggleCart} variant="default">Ver pedido</Button>
                        <CartSheet />
                    </div>
                )
            }
        </div>
    );
}