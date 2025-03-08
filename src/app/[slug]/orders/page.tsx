import { isValidCpf, removeCpfPunctuation } from "@/utils/cpf";
import { CpfForm } from "./components/cpf-form";
import { db } from "@/lib/prisma";
import { OrdersList } from "./components/orders-list";

interface OdersPageProps {
    searchParams: Promise<{ cpf: string; }>;
}

export default async function OrdersPage({ searchParams }: OdersPageProps) {
    const { cpf } = await searchParams;

    if (!cpf) {
        return (
            <CpfForm />
        )
    }

    if (!isValidCpf(cpf)) {
        return (
            <CpfForm />
        )
    }

    const orders = await db.order.findMany({
        where: {
            customerCpf: removeCpfPunctuation(cpf)
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            },
            OrderProducts: {
                include: {
                    product: {
                        select: {
                            name: true,
                            price: true
                        }
                    }
                }
            }
        }
    })


    return (
        <OrdersList orders={orders} />
    )
}