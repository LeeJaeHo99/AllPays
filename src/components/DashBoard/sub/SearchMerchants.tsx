import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SearchContent from "./SearchContent";

export default function SearchMerchants() {
    return (
        <div className="w-[100%] h-[50%] flex flex-col bg-white rounded-lg mb-5 px-6 py-3 shadow-md shadow-slate-500/10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-ns-bold">가맹점 검색</h2>
                <button className="flex justify-center items-center text-xs font-ns-regular text-gray hover:text-primary transition-all duration-300">
                    <Link href="/merchantsList">
                        <span>더보기</span>
                    </Link>
                    <ArrowUpRight size={16} />
                </button>
            </div>
            <SearchContent />
        </div>
    );
}