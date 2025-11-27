"use client";

import { useEffect, useState } from "react";
import PeriodFilter from "@/components/DashBoard/main/PeriodFilter";
import PaymentsListRadios from "@/components/Sub/PaymentsListRadios";
import Table from "@/components/Sub/Table";
import Pagination from "@/components/Sub/Pagination";
import PaymentsListTableBody from "@/components/Sub/PaymentsListTableBody";
import TableFilter from "@/components/Sub/TableFilter";
import SearchComponent from "@/components/Sub/SearchComponent";
import { paymentListTableHeader, paymentListTableFilter, paymentListSearchList } from "@/data/data";
import { PaymentWithMerchant } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";
import useFilterPayments from "@/hooks/useFilterPayments";
import useSortAndFilterPayments from "@/hooks/useSortAndFilterPayments";
import { LoaderCircle } from "lucide-react";

export default function PaymentsList() {
    const [selectedPeriod, setSelectedPeriod] = useState<string>("전체");
    const [selected, setSelected] = useState<string>("all");
    const [selectedFilter, setSelectedFilter] = useState<string>("all");
    const [paymentList, setPaymentList] = useState<PaymentWithMerchant[]>([]);
    const [originalPaymentList, setOriginalPaymentList] = useState<PaymentWithMerchant[]>([]);
    const [selectedPage, setSelectedPage] = useState<number>(0);
    const [searchType, setSearchType] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");

    const { data: paymentsData, isLoading } = useGetPaymentsList();

    // 기간 및 검색 필터링
    const periodFilteredList = useFilterPayments({
        originalPaymentList,
        selectedPeriod,
        searchType,
        searchValue,
    });

    // 결제 상태 필터링 및 정렬
    const allPaymentList = useSortAndFilterPayments({
        filteredList: periodFilteredList,
        selected,
        selectedFilter,
    });

    const handleSelect = (status: string): void => {
        setSelected(status);
        setSelectedPage(0);
    };

    const handleFilterChange = (filter: string): void => {
        setSelectedFilter(filter);
        setSelectedPage(0);
    };

    const handlePeriodChange = (period: string): void => {
        setSelectedPeriod(period);
        setSelectedPage(0);
    };

    const handleSearch = (type: string, value: string): void => {
        setSearchType(type);
        setSearchValue(value);
        setSelectedPage(0);
    };

    const handlePreviousPage = (): void => {
        if (selectedPage > 0) {
            setSelectedPage(selectedPage - 1);
        }
    };
    const handleNextPage = (): void => {
        if (selectedPage < Math.ceil(allPaymentList.length / 10) - 1) {
            setSelectedPage(selectedPage + 1);
        }
    };

    useEffect(() => {
        if (paymentsData) {
            const paymentsWithMerchants = paymentsData as PaymentWithMerchant[];

            setTimeout(() => {
                setOriginalPaymentList(paymentsWithMerchants);
            }, 0);
        } else {
            setTimeout(() => {
                setOriginalPaymentList([]);
            }, 0);
        }
    }, [paymentsData]);

    useEffect(() => {
        const start = selectedPage * 10;
        const end = start + 10;
        setTimeout(() => {
            setPaymentList(allPaymentList.slice(start, end));
        }, 0);
    }, [allPaymentList, selectedPage]);

    return (
        <>
            <h3 className="mb-8 text-2xl font-ns-bold">거래 내역 전체 조회</h3>
            <div className="flex justify-between items-end">
                <PeriodFilter
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={handlePeriodChange}
                />
                <SearchComponent
                    searchList={paymentListSearchList}
                    onSearch={handleSearch}
                    className="mb-4"
                />
            </div>
            <div className="flex justify-between items-center">
                <PaymentsListRadios
                    selected={selected}
                    handleSelect={handleSelect}
                    count={[
                        periodFilteredList?.length || 0,
                        periodFilteredList?.filter(
                            (payment) => payment.status === "SUCCESS"
                        ).length || 0,
                        periodFilteredList?.filter(
                            (payment) => payment.status === "FAILED"
                        ).length || 0,
                        periodFilteredList?.filter(
                            (payment) => payment.status === "CANCELLED"
                        ).length || 0,
                        periodFilteredList?.filter(
                            (payment) => payment.status === "PENDING"
                        ).length || 0,
                    ]}
                />
                <TableFilter
                    filterList={paymentListTableFilter}
                    value={selectedFilter}
                    onChange={handleFilterChange}
                />
            </div>

            <Table
                tableHeader={paymentListTableHeader}
                tableBody={<PaymentsListTableBody paymentList={paymentList} />}
            />
            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center py-8 text-center text-xl font-ns-regular text-primary">
                    <LoaderCircle size={48} className="animate-spin" />
                </div>
            ) : allPaymentList.length === 0 ? (
                <div className="w-full py-8 text-center text-xl font-ns-regular text-rose-500">
                    해당 데이터는 존재하지 않습니다.
                </div>
            ) : null}
            <Pagination
                length={Math.ceil(allPaymentList.length / 10)}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
        </>
    );
}