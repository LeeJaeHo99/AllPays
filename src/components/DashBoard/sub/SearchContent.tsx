"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchContent() {
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();
    const [isComposing, setIsComposing] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isComposing) {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleCompositionStart = () => setIsComposing(true);

    const handleCompositionEnd = () => setIsComposing(false);

    const handleSearch = () => {
        if (!searchValue.trim()) return;
        
        router.push(`/merchantsList?q=${encodeURIComponent(searchValue.trim())}`);
        setSearchValue("");
    };
    
    return(
        <div className="flex flex-col justify-center items-center h-full">
            <input 
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