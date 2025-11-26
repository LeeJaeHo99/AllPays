import { ArrowUpRight } from "lucide-react";

export default function SearchMerchants() {
    return (
        <div className="w-[100%] h-[50%] flex flex-col bg-white rounded-lg mb-5 px-6 py-3 shadow-md shadow-slate-500/10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-ns-bold">가맹점 검색</h2>
                <button className="flex justify-center items-center text-xs font-ns-regular text-gray hover:text-primary transition-all duration-300">
                    <span>더보기</span>
                    <ArrowUpRight size={16} />
                </button>
            </div>
            <SearchContent />
        </div>
    );
}

function SearchContent() {
    return(
        <div className="flex flex-col justify-center items-center h-full">
            <input type="text" placeholder="검색하여 간단한 정보를 확인하세요." className="w-full p-2 mb-3 rounded-md border border-slate-200 border-1 border-solid text-sm font-ns-regular text-gray focus:outline-none" />
            <button className="w-fit px-4 py-2 rounded-md bg-black text-white text-xs font-ns-regular">검색</button>
        </div>
    )
}