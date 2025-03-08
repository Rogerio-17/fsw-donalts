import { Button } from "@/components/ui/button"
import { Prisma } from "@prisma/client"
import { ChevronLeftIcon, Scroll, ScrollTextIcon } from "lucide-react"
import { OrderItem } from "./order-item"

interface OrdersListProps {
    orders: Prisma.OrderGetPayload<{
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
    }>[]
}

export function OrdersList({ orders }: OrdersListProps) {

    return (
        <div className="space-y-6 p-6">
            <Button size='icon' variant='secondary' className="rounded-full">
                <ChevronLeftIcon />
            </Button>
            <div className="flex items-center gap-3">
                <ScrollTextIcon />
                <h2 className="text-lg font-semibold">Meus Pedidos</h2>
            </div>

            {
                orders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))
            }
        </div>
    )
}