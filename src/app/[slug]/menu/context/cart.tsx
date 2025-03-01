"use client"
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
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
        const productIsAlreadyInCart = products.some(prevProduct => prevProduct.id === product.id);

        if (!productIsAlreadyInCart) {
            return setProducts((prevProducts) => [...prevProducts, product]);
        }

        setProducts((prevProducts) => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity,
                    };
                }

                return prevProduct;
            });
        });
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