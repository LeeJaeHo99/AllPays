import Link from "next/link";
import { BadgeDollarSign } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full h-20 mb-20 shadow-md shadow-slate-500/10">
            <div className="inner flex items-center justify-between">
                <Link href="/">
                    <h1 className="flex items-center gap-2">
                        <BadgeDollarSign size={40} color="#0649ed"/>
                        <span className="text-2xl font-ns-bold text-primary">AllPays</span>
                    </h1>
                </Link>
                <nav>
                    <ul className="flex items-center gap-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
