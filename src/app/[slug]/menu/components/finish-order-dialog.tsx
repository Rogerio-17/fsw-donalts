"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { CartContext } from "../context/cart";
import { isValidCpf } from "@/utils/cpf";

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "O nome é obrigatório.",
    }),
    cpf: z
        .string()
        .trim()
        .min(1, {
            message: "O CPF é obrigatório.",
        })
        .refine((value) => isValidCpf(value), {
            message: "CPF inválido.",
        }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function FinishOrderDialog({ onOpenChange, open }: FinishOrderDialogProps) {
    const [isLoading] = useState(false);
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
        },
        shouldUnregister: true,
    });
    const onSubmit = async (data: FormSchema) => {
        console.log(data);
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar Pedido</DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o seu pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
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
                                    variant="destructive"
                                    className="rounded-full"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2Icon className="animate-spin" />}
                                    Finalizar
                                </Button>
                                <DrawerClose asChild>
                                    <Button className="w-full rounded-full" variant="outline">
                                        Cancelar
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}