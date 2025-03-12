"use client";
import {usePathname} from "next/navigation";
import { NavButton } from "./navbutton";
const routes = [
    {
        href: "/",
        label: "General",
    }, {
        href: "/accounts",
        label: "Cuentas",
    }, {
        href: "/categories",
        label: "Categorias",
    }, {
        href: "/settings",
        label: "Configuraciones",
    },
]


export const Navigation = () => {
    const pathName = usePathname();
    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((routes) => (
                <NavButton 
                key={routes.href}
                href={routes.href}
                label={routes.label}
                isActive={pathName===routes.href}
                />
                // https://youtu.be/N_uNKAus0II?t=5292
            )
            )}
        </nav>
    )
}
