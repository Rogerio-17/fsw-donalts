import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/utils/format-currency"
import { OrderStatus, Prisma } from "@prisma/client"
import Image from "next/image"

interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            }
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
    }>
}

function getStatusLabel(status: OrderStatus) {
    if (status === OrderStatus.FINISHED) {
        return 'Finalizado'
    }

    if (status === OrderStatus.IN_PREPARATION) {
        return 'Em preparo'
    }

    if (status === OrderStatus.PENDING) {
        return 'Pendente'
    }

    return ''
}

export function OrderItem({ order }: OrderItemProps) {
    return (
        <Card>
            <CardContent className="p-5 space-y-4">
                <div className={`w-fit text-white rounded-full px-2 py-1 text-xs font-semibold
                    ${order.status === OrderStatus.FINISHED ? 'bg-green-600 text-white' : 'bg-gray-500'}
                    `}>
                    {getStatusLabel(order.status)}
                </div>
                <div className="flex item-center gap-2">
                    <div className="relative h-5 w-5">
                        <Image
                            src={order.restaurant.avatarImageUrl}
                            alt={order.restaurant.name}
                            fill
                            className="roudend-lg"
                        />
                    </div>

                    <p className="text-sm font-semibold">{order.restaurant.name}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                    {
                        order.OrderProducts.map((orderProduct) => {
                            const total = orderProduct.product.price * orderProduct.quantity

                            return (
                                <div key={orderProduct.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-amber-500 text-white text-xs font-semibold">{orderProduct.quantity}x</div>
                                        <p className="text-sm font-medium">{orderProduct.product.name}</p>
                                    </div>
                                    <p className="text-sm font-bold">{formatCurrency(total)}</p>
                                </div>
                            )
                        })

                    }
                </div>

                <Separator />

                <div className="flex justify-between">
                    <p className="text-sm font-bold">Total</p>
                    <p className="text-sm font-bold">{formatCurrency(order.total)}</p>
                </div>

            </CardContent>
        </Card>
    )
}