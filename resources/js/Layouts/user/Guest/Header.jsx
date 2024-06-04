import { Icon } from "@iconify-icon/react";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import sharedComposable from "@/Composables/sharedComposable";
import logo from "@/images/frontend/logo.png";
export default function Header() {
    const { logout } = sharedComposable();
    const auth = usePage().props?.auth;
    const [dashboard, setDashboard] = useState(route("login"));
    useEffect(() => {
        if (auth.user && auth.role) {
            switch (auth.role) {
                case "admin":
                    setDashboard(route("admin.dashboard"));
                    break;
                case "shop":
                    setDashboard(route("shop.dashboard"));
                    break;
                case "user":
                    setDashboard(route("user.dashboard"));
                    break;
                default:
                    setDashboard(route("login"));
                    break;
            }
        }
    }, [auth]);

    const urls = [
        {
            name: "Shops",
            url: route("shops.index"),
        },
        {
            name: "About",
            url: "#",
        },
        {
            name: "Contact",
            url: "#",
        },
        {
            name: "Admin",
            url: dashboard,
        },
    ];

    const langs = [
        {
            id: "en",
            flag: "circle-flags:us",
            url: '/locale/en',
        },
        {
            id: "ar",
            flag: "circle-flags:sa",
            url: '/locale/ar',
        },
        {
            id: "ru",
            flag: "circle-flags:ru",
            url: '/locale/ru',
        },
    ];

    const [isMobileMenu, setMobileMenu] = useState(false);
    return (
        <header className="relative flex flex-col items-center gap-2 bg-black font-['Poetsen_One'] opacity-80 md:gap-1 lg:h-36 lg:flex-row">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center text-white">
                    <Link href={route("home")} className="text-3xl font-bold">
                        <img src={logo} alt="" className="h-12 w-16" />
                    </Link>
                </div>
                <button
                    type="button"
                    onClick={() => setMobileMenu(!isMobileMenu)}
                    className="flex items-center md:hidden"
                    aria-label="Toggle Menu"
                >
                    <Icon
                        className="h-5 w-5 text-white"
                        icon={isMobileMenu ? "mdi:close" : "mdi:menu"}
                    />
                </button>
                <div className="hidden flex-col items-center justify-between gap-8 md:flex md:flex-row md:justify-between">
                    <nav className="flex flex-wrap items-center justify-center space-x-8 md:justify-start">
                        {urls.map((url, index) => (
                            <Link
                                key={index}
                                href={url.url}
                                className="text-center text-2xl font-normal uppercase tracking-tight text-white md:text-3xl"
                            >
                                {url.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-4 flex flex-col items-center gap-3 md:mt-0 md:flex-row">
                        {auth?.user ? (
                            <button
                                type="button"
                                onClick={logout}
                                className="flex h-12 w-32 items-center justify-center rounded-full bg-[#725b36] text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    href={route("register")}
                                    className="flex h-12 w-32 items-center justify-center rounded-full bg-[#725b36] text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                                >
                                    Register
                                </Link>
                                <Link
                                    href={dashboard}
                                    className="flex h-12 w-32 items-center justify-center rounded-full bg-[#526d6e] text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="mt-4 flex flex-row gap-3 md:mt-0">
                        {langs.map((lang, index) => (
                            <a
                                key={index}
                                className="rounded-full"
                                href={lang.url}
                            >
                                <Icon icon={lang.flag} width={40} height={40} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <Transition
                show={isMobileMenu}
                enter="transition ease-in-out duration-300"
                enterFrom="-translate-y-full"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-300"
                leaveFrom="translate-y-0"
                leaveTo="-translate-y-full"
            >
                <div className="flex w-full flex-col items-center justify-center gap-6 bg-black py-4 md:hidden">
                    <nav className="flex flex-wrap items-center justify-center space-x-8">
                        {urls.map((url, index) => (
                            <Link
                                key={index}
                                href={url.url}
                                className="text-center text-2xl font-normal uppercase tracking-tight text-white"
                            >
                                {url.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-4 flex flex-col items-center gap-3">
                        {auth?.user ? (
                            <button
                                type="button"
                                onClick={logout}
                                className="flex h-12 w-32 items-center justify-center rounded-full bg-[#725b36] text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    href={route("register")}
                                    className="flex h-12 w-32 items-center justify-center rounded-full bg-[#725b36] text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                                >
                                    Register
                                </Link>
                                <Link
                                    href={dashboard}
                                    className="flex h-12 w-32 items-center justify-center rounded-full bg-[#526d6e] text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="mt-4 flex flex-row gap-3">
                        {langs.map((lang, index) => (
                            <a
                                key={index}
                                className="rounded-full"
                                href={lang.url}
                            >
                                <Icon icon={lang.flag} width={40} height={40} />
                            </a>
                        ))}
                    </div>
                </div>
            </Transition>

        </header>
    );
}