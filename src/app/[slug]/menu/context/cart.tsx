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
    decreaseCartQuantity: (productId: string) => void;
    increaseCartQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;
    total: number;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => { },
    addProduct: (product: CartProduct) => { },
    decreaseCartQuantity: (productId: string) => { },
    increaseCartQuantity: (productId: string) => { },
    removeProduct: (productId: string) => { },
    total: 0,

});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<CartProduct[]>([]);

    const total = products.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0)

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

    function decreaseCartQuantity(productId: string) {
        setProducts((prevProducts) => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id !== productId) {
                    return prevProduct;
                }

                if (prevProduct.quantity === 1) {
                    return prevProduct;
                }

                return { ...prevProduct, quantity: prevProduct.quantity - 1 };
            })
        })
    }

    function removeProduct(productId: string) {
        setProducts((prevProducts) => {
            return prevProducts.filter(prevProduct => prevProduct.id !== productId);
        })
    }

    function increaseCartQuantity(productId: string) {
        setProducts((prevProducts) => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id === productId) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + 1,
                    };
                }

                return prevProduct;
            })
        })
    }

    return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                total,
                toggleCart,
                addProduct,
                decreaseCartQuantity,
                increaseCartQuantity,
                removeProduct,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};