'use client'
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { isValidCpf, removeCpfPunctuation } from "@/utils/cpf"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { z } from "zod"

const formSchema = z.object({
    cpf: z.string().refine((cpf) => isValidCpf(cpf), {
        message: "CPF inválido",
    }),
})

type FormValues = z.infer<typeof formSchema>

export function CpfForm() {
    const router = useRouter()
    const pathName = usePathname()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: FormValues) {
        router.push(`${pathName}?cpf=${removeCpfPunctuation(values.cpf)}`)
    }

    function handleCancel() {
        router.back()
    }


    return (
        <Drawer open>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Digite o CPF do cliente</DrawerTitle>
                    <DrawerDescription>
                        Para consultar o pedido do cliente, digite o CPF dele.
                    </DrawerDescription>
                </DrawerHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className="px-4">
                                    <FormLabel>Seu CPF</FormLabel>
                                    <FormControl>
                                        <PatternFormat
                                            placeholder="Digite seu CPF..."
                                            format="###.###.###-##"
                                            customInput={Input}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DrawerFooter>
                            <Button
                                type="submit"
                                variant="default"
                                className="rounded-full"
                            >
                                Confirmar
                            </Button>
                            <DrawerClose asChild>
                                <Button onClick={handleCancel} className="w-full rounded-full" variant="outline">
                                    Cancelar
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    )
}