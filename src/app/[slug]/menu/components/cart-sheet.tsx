import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../context/cart";

export function CartSheet() {
    const { toggleCart, isOpen } = useContext(CartContext)

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Sacola</SheetTitle>
                    <SheetDescription>desc</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}