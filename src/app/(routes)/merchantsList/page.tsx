"use client";

import { useEffect, useState } from "react";
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

export default function MerchantsList() {
    const [merchantsList, setMerchantsList] = useState<MerchantsDetails[]>([]);
    const [allMerchantsList, setAllMerchantsList] = useState<MerchantsDetails[]>([]);
    const [originalMerchantsList, setOriginalMerchantsList] = useState<MerchantsDetails[]>([]);
    
    const [selectedPage, setSelectedPage] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState<string>("all");
    const [searchType, setSearchType] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    
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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/merchants/details`,
                    { cache: "force-cache" }
                );
                if (!response.ok) {
                    throw new Error("데이터를 불러오는데 실패했습니다.");
                }
                const result = await response.json();
                const data = result.data || [];
                setOriginalMerchantsList(data);
                setAllMerchantsList(data);
            } catch (error) {
                setOriginalMerchantsList([]);
                setAllMerchantsList([]);
                console.error(error);
            }
        }
        fetchData();
    }, []);

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
        
        setAllMerchantsList(sortedList);
    }, [selectedFilter, originalMerchantsList, searchType, searchValue]);

    useEffect(() => {
        const start = selectedPage * 10;
        const end = start + 10;
        setMerchantsList(allMerchantsList.slice(start, end));
    }, [allMerchantsList, selectedPage]);

    return (
        <>
            <h3 className="mb-4 text-2xl font-ns-bold">가맹점 목록 조회</h3>
            <div className="flex flex-col justify-between items-center w-full">
                <div className="flex justify-end w-full">
                    <SearchComponent 
                        searchList={merchantListSearchList}
                        onSearch={handleSearch}
                    />
                </div>
                <TableFilter 
                    filterList={merchantListTableFilter} 
                    value={selectedFilter}
                    onChange={handleFilterChange}
                />
                <Table
                    tableHeader={merchantListTableHeader}
                    tableBody={<MerchantsListTableBody merchantsList={merchantsList} />}
                />
                {searchType && searchValue && allMerchantsList.length === 0 && (
                    <div className="w-full py-8 text-center text-xl font-ns-regular text-rose-500">
                        검색한 데이터가 존재하지 않습니다.
                    </div>
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