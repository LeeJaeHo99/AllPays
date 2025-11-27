"use client";

import PeriodFilter from "@/components/DashBoard/main/PeriodFilter";
import PaymentsListRadios from "@/components/Sub/PaymentsListRadios";
import Table from "@/components/Sub/Table";
import Pagination from "@/components/Sub/Pagination";
import PaymentsListTableBody from "@/components/Sub/PaymentsListTableBody";
import TableFilter from "@/components/Sub/TableFilter";
import SearchComponent from "@/components/Sub/SearchComponent";
import { paymentListTableHeader, paymentListTableFilter, paymentListSearchList } from "@/data/data";
import { useEffect, useState } from "react";
import { PaymentWithMerchant } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";

export default function PaymentsList() {
    const [selectedPeriod, setSelectedPeriod] = useState("전체");
    const [selected, setSelected] = useState("all");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [paymentList, setPaymentList] = useState<PaymentWithMerchant[]>([]);
    const [allPaymentList, setAllPaymentList] = useState<PaymentWithMerchant[]>(
        []
    );
    const [originalPaymentList, setOriginalPaymentList] = useState<
        PaymentWithMerchant[]
    >([]);
    const [selectedPage, setSelectedPage] = useState(0);
    const [periodFilteredList, setPeriodFilteredList] = useState<
        PaymentWithMerchant[]
    >([]);
    const [searchType, setSearchType] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");

    const { data: paymentsData, isLoading } = useGetPaymentsList();

    const handleSelect = (status: string) => {
        setSelected(status);
        setSelectedPage(0);
    };

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setSelectedPage(0);
    };

    const handlePeriodChange = (period: string) => {
        setSelectedPeriod(period);
        setSelectedPage(0);
    };

    const handleSearch = (type: string, value: string) => {
        setSearchType(type);
        setSearchValue(value);
        setSelectedPage(0);
    };

    const handlePreviousPage = () => {
        if (selectedPage > 0) {
            setSelectedPage(selectedPage - 1);
        }
    };
    const handleNextPage = () => {
        if (selectedPage < Math.ceil(allPaymentList.length / 10) - 1) {
            setSelectedPage(selectedPage + 1);
        }
    };

    // getPaymentsList 훅에서 데이터를 가져와서 상태 업데이트
    useEffect(() => {
        if (paymentsData) {
            const paymentsWithMerchants = paymentsData as PaymentWithMerchant[];
            setOriginalPaymentList(paymentsWithMerchants);
            setAllPaymentList(paymentsWithMerchants);
        } else {
            setOriginalPaymentList([]);
            setAllPaymentList([]);
            setPeriodFilteredList([]);
        }
    }, [paymentsData]);

    // 기간 필터링 및 검색 필터링된 리스트를 계산하여 periodFilteredList에 저장 (count 계산용)
    useEffect(() => {
        if (!originalPaymentList.length) {
            setPeriodFilteredList([]);
            return;
        }

        let filteredList: PaymentWithMerchant[] = [...originalPaymentList];

        // 기간 필터링
        if (selectedPeriod === "1주일") {
            const today = new Date("2025-11-10");
            const weekAgo = new Date("2025-11-04");
            filteredList = filteredList.filter((payment) => {
                const paymentDate = new Date(payment.paymentAt.split("T")[0]);
                return paymentDate >= weekAgo && paymentDate <= today;
            });
        } else if (selectedPeriod === "오늘") {
            const today = "2025-11-10";
            filteredList = filteredList.filter(
                (payment) => payment.paymentAt.split("T")[0] === today
            );
        }
        // "전체"는 필터링하지 않음

        // 검색 필터링
        if (searchType && searchValue.trim()) {
            filteredList = filteredList.filter((payment) => {
                if (searchType === "mchtName") {
                    // 상점 이름은 부분 일치 검색
                    return payment.mchtName?.toLowerCase().includes(searchValue.toLowerCase().trim()) || false;
                } else if (searchType === "payType") {
                    // 결제 타입은 정확한 일치 검색
                    return payment.payType === searchValue.trim().toUpperCase();
                } else if (searchType === "status") {
                    // 결제 상태는 정확한 일치 검색
                    return payment.status === searchValue.trim().toUpperCase();
                }
                return true;
            });
        }

        // 기간 및 검색 필터링된 리스트 저장 (count 계산용)
        setPeriodFilteredList(filteredList);
    }, [selectedPeriod, originalPaymentList, searchType, searchValue]);

    useEffect(() => {
        let filteredList: PaymentWithMerchant[] = [...periodFilteredList];

        // 기간 필터링은 이미 periodFilteredList에 적용되어 있음

        // 결제 상태 필터링
        if (selected === "completed") {
            filteredList = filteredList.filter(
                (payment) => payment.status === "SUCCESS"
            );
        } else if (selected === "failed") {
            filteredList = filteredList.filter(
                (payment) => payment.status === "FAILED"
            );
        } else if (selected === "canceled") {
            filteredList = filteredList.filter(
                (payment) => payment.status === "CANCELLED"
            );
        } else if (selected === "pending") {
            filteredList = filteredList.filter(
                (payment) => payment.status === "PENDING"
            );
        }

        // 정렬
        let sortedList: PaymentWithMerchant[] = [];

        // 금액 비교를 위한 헬퍼 함수 (USD는 1450을 곱한 값으로 비교)
        const getAmountForSort = (payment: PaymentWithMerchant): number => {
            const amount = parseFloat(payment.amount);
            return payment.currency === "USD" ? amount * 1450 : amount;
        };

        if (selectedFilter === "all") {
            sortedList = filteredList;
        } else if (selectedFilter === "amountAsc") {
            sortedList = [...filteredList].sort(
                (a, b) => getAmountForSort(a) - getAmountForSort(b)
            );
        } else if (selectedFilter === "amountDesc") {
            sortedList = [...filteredList].sort(
                (a, b) => getAmountForSort(b) - getAmountForSort(a)
            );
        } else if (selectedFilter === "paymentAtDesc") {
            sortedList = [...filteredList].sort(
                (a, b) =>
                    new Date(b.paymentAt).getTime() -
                    new Date(a.paymentAt).getTime()
            );
        } else if (selectedFilter === "paymentAtAsc") {
            sortedList = [...filteredList].sort(
                (a, b) =>
                    new Date(a.paymentAt).getTime() -
                    new Date(b.paymentAt).getTime()
            );
        }

        setAllPaymentList(sortedList);
    }, [selected, selectedFilter, periodFilteredList]);

    useEffect(() => {
        const start = selectedPage * 10;
        const end = start + 10;
        setPaymentList(allPaymentList.slice(start, end));
    }, [allPaymentList, selectedPage]);

    return (
        <>
            <h3 className="mb-4 text-2xl font-ns-bold">거래 내역 전체 조회</h3>
            <div className="flex justify-between items-end mb-4">
                <PeriodFilter
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={handlePeriodChange}
                />
                <SearchComponent
                    searchList={paymentListSearchList}
                    onSearch={handleSearch}
                    className="mb-0"
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
                <div className="w-full py-8 text-center text-xl font-ns-regular text-gray">
                    데이터를 불러오는 중...
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
