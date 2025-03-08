import Image from "next/image";
import { CartContext, CartProduct } from "../context/cart";
import { formatCurrency } from "@/utils/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartProductItemProps {
    product: CartProduct
}

export function CartProductItem({ product }: CartProductItemProps) {
    const { increaseCartQuantity, decreaseCartQuantity, removeProduct } = useContext(CartContext);

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
                            onClick={() => decreaseCartQuantity(product.id)}
                            variant="outline"
                            className="h-7 w-7 rounded-lg"
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <p className="text-sm w-5 text-center">{product.quantity}</p>
                        <Button
                            onClick={() => increaseCartQuantity(product.id)}
                            variant="destructive"
                            className="h-7 w-7 rounded-lg"
                        >
                            <ChevronRightIcon />
                        </Button>

                    </div>
                </div>
            </div>

            {/* DIREITA */}
            <Button onClick={() => removeProduct(product.id)} className="h-7 w-7 rounded-lg" variant="outline">
                <TrashIcon />
            </Button>

        </div>
    );
}   