"use client";

import { useEffect, useState, Suspense } from "react";
import Table from "@/components/Sub/Table";
import {
    merchantListTableHeader,
    merchantListSearchList,
    merchantListTableFilter,
} from "@/data/data";
import MerchantsListTableBody from "@/components/Sub/MerchantsListTableBody";
import SearchComponent from "@/components/Sub/SearchComponent";
import Pagination from "@/components/Sub/Pagination";
import TableFilter from "@/components/Sub/TableFilter";
import { MerchantsDetails } from "@/types/type";
import useGetMerchantsList from "@/hooks/getMerchantsList";
import { useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

function MerchantsListContent() {
    const searchParams = useSearchParams();
    const [merchantsList, setMerchantsList] = useState<MerchantsDetails[]>([]);
    const [allMerchantsList, setAllMerchantsList] = useState<MerchantsDetails[]>([]);
    const [originalMerchantsList, setOriginalMerchantsList] = useState<MerchantsDetails[]>([]);
    
    const [selectedPage, setSelectedPage] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState<string>("all");
    const [searchType, setSearchType] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");

    const { data: merchantsData, isLoading } = useGetMerchantsList();
    
    useEffect(() => {
        const type = searchParams.get("type") || (searchParams.get("q") ? "mchtName" : "");
        const value = searchParams.get("value") || searchParams.get("q") || "";
        setTimeout(() => {
            setSearchType(type);
            setSearchValue(value);
            setSelectedPage(0);
        }, 0);
    }, [searchParams]);
    
    const handlePreviousPage = () => {
        if (selectedPage > 0) {
            setSelectedPage(selectedPage - 1);
        }
    };
    const handleNextPage = () => {
        if (selectedPage < Math.ceil(merchantsList.length / 10) + 1) {
            setSelectedPage(selectedPage + 1);
        }
    };

    const handleFilterChange = (filterValue: string) => {
        setSelectedFilter(filterValue);
        setSelectedPage(0);
    };

    const handleSearch = (type: string, value: string) => {
        setSearchType(type);
        setSearchValue(value);
        setSelectedPage(0);
    };

    // getMerchantsList 훅에서 데이터를 가져와서 상태 업데이트
    useEffect(() => {
        if (merchantsData) {
            setTimeout(() => {
                setOriginalMerchantsList(merchantsData);
                setAllMerchantsList(merchantsData);
            }, 0);
        } else {
            setTimeout(() => {
                setOriginalMerchantsList([]);
                setAllMerchantsList([]);
            }, 0);
        }
    }, [merchantsData]);

    useEffect(() => {
        let filteredList: MerchantsDetails[] = [...originalMerchantsList];
        
        if (searchType && searchValue) {
            filteredList = filteredList.filter((merchant) => {
                switch (searchType) {
                    case "mchtCode":
                        return merchant.mchtCode === searchValue;
                    case "mchtName":
                        return merchant.mchtName.includes(searchValue);
                    case "status":
                        return merchant.status.includes(searchValue);
                    case "bizType":
                        return merchant.bizType.includes(searchValue);
                    case "bizNo":
                        return merchant.bizNo.includes(searchValue);
                    case "address":
                        return merchant.address.includes(searchValue);
                    case "phone":
                        return merchant.phone.includes(searchValue);
                    case "email":
                        return merchant.email.includes(searchValue);
                    default:
                        return true;
                }
            });
        }
        
        let sortedList: MerchantsDetails[] = [];
        
        if (selectedFilter === "all") {
            sortedList = filteredList;
        } else if (selectedFilter === "name") {
            sortedList = [...filteredList].sort((a, b) => 
                a.mchtName.localeCompare(b.mchtName)
            );
        } else if (selectedFilter === "registeredAtDesc") {
            sortedList = [...filteredList].sort((a, b) => 
                new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
            );
        } else if (selectedFilter === "registeredAtAsc") {
            sortedList = [...filteredList].sort((a, b) => 
                new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime()
            );
        } else if (selectedFilter === "updatedAtDesc") {
            sortedList = [...filteredList].sort((a, b) => 
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
        } else if (selectedFilter === "updatedAtAsc") {
            sortedList = [...filteredList].sort((a, b) => 
                new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            );
        }
        
        setTimeout(() => {
            setAllMerchantsList(sortedList);
        }, 0);
    }, [selectedFilter, originalMerchantsList, searchType, searchValue]);

    useEffect(() => {
        const start = selectedPage * 10;
        const end = start + 10;
        setTimeout(() => {
            setMerchantsList(allMerchantsList.slice(start, end));
        }, 0);
    }, [allMerchantsList, selectedPage]);

    return (
        <>
            <h3 className="mb-8 text-2xl font-ns-bold">가맹점 목록 조회</h3>
            <div className="flex flex-col justify-between items-center w-full">
                <div className="flex justify-end w-full">
                    <SearchComponent 
                        searchList={merchantListSearchList}
                        onSearch={handleSearch}
                        initialSearchType={searchType}
                        initialSearchValue={searchValue}
                        className="mb-4"
                    />
                </div>
                <TableFilter 
                    filterList={merchantListTableFilter} 
                    value={selectedFilter}
                    onChange={handleFilterChange}
                />
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center py-8 text-center text-xl font-ns-regular text-primary">
                        <LoaderCircle size={48} className="animate-spin" />
                    </div>
                ) : (
                    <>
                        <Table
                            tableHeader={merchantListTableHeader}
                            tableBody={<MerchantsListTableBody merchantsList={merchantsList} />}
                        />
                        {searchType && searchValue && allMerchantsList.length === 0 && (
                            <div className="w-full py-8 text-center text-xl font-ns-regular text-rose-500">
                                검색한 데이터가 존재하지 않습니다.
                            </div>
                        )}
                    </>
                )}
                <Pagination
                    length={Math.ceil(allMerchantsList.length / 10)}
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                />
            </div>
        </>
    );
}

export default function MerchantsList() {
    return (
        <Suspense fallback={
            <div className="w-full h-full flex justify-center items-center py-8 text-center text-xl font-ns-regular text-primary">
                <LoaderCircle size={48} className="animate-spin" />
            </div>
        }>
            <MerchantsListContent />
        </Suspense>
    );
}