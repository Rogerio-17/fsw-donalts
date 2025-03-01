import Image from "next/image";
import { CartProduct } from "../context/cart";
import { formatCurrency } from "@/utils/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface CartProductItemProps {
    product: CartProduct
}

export function CartProductItem({ product }: CartProductItemProps) {
    const [quantity, setQuantity] = useState<number>(product.quantity)

    function handleDecreaseQuantity() {
        setQuantity((prev) => {
            if (prev === 1) {
                return 1
            }

            return prev - 1
        })
    }

    function handleIncreaseQuantity() {
        setQuantity((prev) => prev + 1)
    }

    return (
        <div className="flex items-center justify-between">
            {/* ESQUERDA */}
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20">
                    <Image src={product.imageUrl} alt={product.name} fill />
                </div>

                <div className="space-y-1">
                    <p className="max-w-[90%] text-xs truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                    <div className="flex items-center gap-1">
                        {/* QUANTIDADE */}
                        <Button
                            onClick={handleDecreaseQuantity}
                            variant="outline"
                            className="h-7 w-7 rounded-lg"
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <p className="text-sm w-5 text-center">{quantity}</p>
                        <Button
                            onClick={handleIncreaseQuantity}
                            variant="destructive"
                            className="h-7 w-7 rounded-lg"
                        >
                            <ChevronRightIcon />
                        </Button>

                    </div>
                </div>
            </div>

            {/* DIREITA */}
            <Button className="h-7 w-7 rounded-lg" variant="outline">
                <TrashIcon />
            </Button>

        </div>
    );
}   