"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchComponent({ 
    searchList,
    onSearch,
    initialSearchType,
    initialSearchValue,
    className = ""
}: { 
    searchList: { label: string, value: string }[];
    onSearch?: (searchType: string, searchValue: string) => void;
    initialSearchType?: string;
    initialSearchValue?: string;
    className?: string;
}) {
    const [searchType, setSearchType] = useState<string>(initialSearchType || searchList[0]?.value || "");
    const [searchValue, setSearchValue] = useState<string>(initialSearchValue || "");
    
    // 초기값이 변경되면 상태 업데이트
    useEffect(() => {
        if (initialSearchType) {
            setSearchType(initialSearchType);
        }
        if (initialSearchValue !== undefined) {
            setSearchValue(initialSearchValue);
        }
    }, [initialSearchType, initialSearchValue]);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchType, searchValue);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (    
        <div className={`flex items-center justify-end gap-2 ${className}`}>
            <label htmlFor="searchType" className="relative">
                <span className="absolute left-0 top-[-20px] text-xs font-ns-regular text-gray">
                    검색 종류
                </span>
                <select
                    name="searchType"
                    id="searchType"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full min-w-28 h-10 px-2 py-1 rounded-md border border-1 border-slate-300 text-sm font-ns-regular text-black focus:outline-none"
                >
                    {searchList.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
            </label>
            <input
                type="text"
                placeholder={
                    searchType === "payType" 
                        ? "예: ONLINE, MOBILE, DEVICE, VACT, BILLING"
                        : searchType === "status"
                        ? "예: SUCCESS, FAILED, CANCELLED, PENDING"
                        : "검색"
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-10 px-3 py-1 rounded-md border border-1 border-slate-300 text-sm font-ns-regular text-gray focus:outline-none"
            />
            <button 
                onClick={handleSearch}
                className="flex justify-center items-center w-fit h-10 px-3 py-1 rounded-md bg-black text-white"
            >
                <Search size={16} />
            </button>
        </div>
    );
}
