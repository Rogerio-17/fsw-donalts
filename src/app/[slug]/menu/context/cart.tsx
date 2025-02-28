"use client"
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[]
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => { },
    addProduct: (product: CartProduct) => { },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<CartProduct[]>([]);

    function toggleCart() {
        setIsOpen(!isOpen);
    }

    function addProduct(product: CartProduct) {
        setProducts([...products, product]);
    }

    return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toggleCart,
                addProduct,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};