export function formatCurrency(price: number) {
    const format = Intl.NumberFormat("pt-BR", {
        style: 'currency',
        currency: 'BRL'
    }).format(price)

    return format
}