import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../context/cart";

export function CartSheet() {
    const { toggleCart, isOpen, products } = useContext(CartContext)

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Sacola</SheetTitle>
                    <SheetDescription>desc</SheetDescription>
                </SheetHeader>

                {
                    products.map((product) => (
                        <div key={product.id}>
                            <p>{product.name}</p>
                            <p>{product.quantity}</p>
                        </div>
                    ))
                }
            </SheetContent>
        </Sheet>
    )
}