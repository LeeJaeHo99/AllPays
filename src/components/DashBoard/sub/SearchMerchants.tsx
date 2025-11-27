"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/stores/searchStore";
import { useRef, useState } from "react";

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

function SearchContent() {
    const { searchValue, setSearchValue } = useSearchStore();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isComposing, setIsComposing] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isComposing) {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
    };

    const handleSearch = () => {
        // 입력 필드에서 포커스를 제거하여 입력 완료 보장
        if (inputRef.current) {
            inputRef.current.blur();
        }
        
        // 약간의 지연을 두어 입력 완료 보장
        setTimeout(() => {
            const currentValue = inputRef.current?.value || searchValue;
            router.push(`/merchantsList?q=${encodeURIComponent(currentValue)}`);
            setSearchValue("");
        }, 10);
    };
    
    return(
        <div className="flex flex-col justify-center items-center h-full">
            <input 
                ref={inputRef}
                type="text" 
                placeholder="가맹점 명으로 검색하여 정보를 확인하세요." 
                className="w-full p-2 mb-3 rounded-md border border-slate-200 border-1 border-solid text-sm font-ns-regular text-gray focus:outline-none" 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
            />
            <button className="w-fit px-4 py-2 rounded-md bg-black text-white text-xs font-ns-regular" onClick={handleSearch}>검색</button>
        </div>
    )
}