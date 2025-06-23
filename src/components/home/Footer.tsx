import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-panel mt-12 py-10 text-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="mb-2 font-semibold text-white">Pricing</h4>
                    <ul>
                        <li><Link href="#" className="hover:text-primary">Free plan</Link></li>
                        <li><Link href="#" className="hover:text-primary">VIP plans</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-2 font-semibold text-white">FAQS</h4>
                    <ul>
                        <li><Link href="#" className="hover:text-primary">About dashboard</Link></li>
                        <li><Link href="#" className="hover:text-primary">Payment</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-2 font-semibold text-white">Contacts</h4>
                    <ul className="flex flex-col gap-1">
                        <li>
                            <Link href="#" className="flex items-center gap-2 hover:text-primary">
                                <img src="https://ext.same-assets.com/2213466344/2335707712.svg" className="h-4 w-4" alt="Telegram" /> Telegram
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="flex items-center gap-2 hover:text-primary">
                                <img src="https://ext.same-assets.com/2213466344/458847846.svg" className="h-4 w-4" alt="Discord" /> Discord
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 text-center text-muted">
                Powered by <span className="font-bold">CirqueiraDev</span> - IP Stresser and Booter.<br />All rights reserved © 2024
            </div>
        </footer>
    )
}