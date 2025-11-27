import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full h-36 py-5 bg-primary text-white ">
            <div className="inner flex justify-start gap-8 items-start max-w-[1200px]">
                <Link href="/">
                    <h1 className="flex items-center gap-2">
                        <BadgeDollarSign size={40} className="text-white" />
                        <span className="text-2xl font-ns-bold text-white">
                            AllPays
                        </span>
                    </h1>
                </Link>
                <nav>
                    <ul className="flex flex-col justify-start gap-4 items-start">
                        <li>
                            <Link href="/paymentsList">
                                <span className="text-lg font-ns-regular text-white">거래 내역</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/merchantsList">
                                <span className="text-lg font-ns-regular text-white">가맹점 목록</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}
