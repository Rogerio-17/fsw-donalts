import { db } from "@/lib/prisma";

export async function getProductById(id: string) {
    const product = await db.product.findUnique({
        where: {
            id
        },
    })

    return product
}