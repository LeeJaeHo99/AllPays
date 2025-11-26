import Link from "next/link";
import { BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-999 w-full h-20 shadow-md shadow-slate-500/10">
            <div className="inner flex items-center justify-between">
                <Link href="/">
                    <h1 className="flex items-center gap-2">
                        <BadgeDollarSign size={40} color="#0649ed"/>
                        <span className="text-2xl font-ns-bold text-primary">AllPays</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image src="/images/profile.jpg" alt="profile" width={40} height={40}/>
                    </div>
                    <p>안녕하세요, <span className="font-ns-bold text-primary">이재호</span>님</p>
                <button className="ml-4 cursor-pointer">
                    <Menu />
                </button>
                </div>
            </div>
        </header>
    );
}
