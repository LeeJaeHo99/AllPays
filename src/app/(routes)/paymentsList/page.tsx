"use client";

import PeriodFilter from "@/components/DashBoard/main/PeriodFilter";
import PaymentsListRadios from "@/components/Sub/PaymentsListRadios";
import Table from "@/components/Sub/Table";
import Pagination from "@/components/Sub/Pagination";
import PaymentsListTableBody from "@/components/Sub/PaymentsListTableBody";
import TableFilter from "@/components/Sub/TableFilter";
import {
    paymentListTableHeader,
    paymentListTableFilter,
} from "@/data/data";
import { useEffect, useState } from "react";
import { PaymentList, PaymentWithMerchant } from "@/types/type";

export default function PaymentsList() {
    const [selectedPeriod, setSelectedPeriod] = useState("전체");
    const [selected, setSelected] = useState("all");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [paymentList, setPaymentList] = useState<PaymentWithMerchant[]>([]);
    const [allPaymentList, setAllPaymentList] = useState<PaymentWithMerchant[]>([]);
    const [originalPaymentList, setOriginalPaymentList] = useState<
        PaymentWithMerchant[]
    >([]);
    const [selectedPage, setSelectedPage] = useState(0);

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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/list`, 
                    { cache: "force-cache" }
                );
                if (!response.ok) {
                    throw new Error("데이터를 불러오는데 실패했습니다.");
                }
                const result = await response.json();
                const data: PaymentList[] = result.data || [];

                // 각 결제에 대해 merchants 정보 가져오기
                if (data.length > 0) {
                    const paymentsWithMerchants = await Promise.all(
                        data.map(async (payment: PaymentList) => {
                            try {
                                const responseMerchants = await fetch(
                                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/merchants/details/${payment.mchtCode}`,
                                    { cache: "force-cache" }
                                );
                                if (!responseMerchants.ok) {
                                    throw new Error("데이터를 불러오는데 실패했습니다.");
                                }
                                const resultMerchants = await responseMerchants.json();
                                return {
                                    ...payment,
                                    mchtName: resultMerchants.data?.mchtName || "",
                                } as PaymentWithMerchant;
                            } catch (error) {
                                console.error(`Failed to fetch merchant for ${payment.mchtCode}:`, error);
                                return {
                                    ...payment,
                                    mchtName: "",
                                } as PaymentWithMerchant;
                            }
                        })
                    );

                    setOriginalPaymentList(paymentsWithMerchants);
                    setAllPaymentList(paymentsWithMerchants);
                } else {
                    setOriginalPaymentList([]);
                    setAllPaymentList([]);
                }
            } catch (error) {
                setOriginalPaymentList([]);
                setAllPaymentList([]);
                console.error(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
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
            filteredList = filteredList.filter((payment) => 
                payment.paymentAt.split("T")[0] === today
            );
        }
        // "전체"는 필터링하지 않음
        
        // 결제 상태 필터링
        if (selected === "completed") {
            filteredList = filteredList.filter((payment) => payment.status === "SUCCESS");
        } else if (selected === "failed") {
            filteredList = filteredList.filter((payment) => payment.status === "FAILED");
        } else if (selected === "canceled") {
            filteredList = filteredList.filter((payment) => payment.status === "CANCELLED");
        } else if (selected === "pending") {
            filteredList = filteredList.filter((payment) => payment.status === "PENDING");
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
            sortedList = [...filteredList].sort((a, b) => 
                getAmountForSort(a) - getAmountForSort(b)
            );
        } else if (selectedFilter === "amountDesc") {
            sortedList = [...filteredList].sort((a, b) => 
                getAmountForSort(b) - getAmountForSort(a)
            );
        } else if (selectedFilter === "paymentAtDesc") {
            sortedList = [...filteredList].sort((a, b) => 
                new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime()
            );
        } else if (selectedFilter === "paymentAtAsc") {
            sortedList = [...filteredList].sort((a, b) => 
                new Date(a.paymentAt).getTime() - new Date(b.paymentAt).getTime()
            );
        }
        
        setAllPaymentList(sortedList);
    }, [selected, selectedFilter, selectedPeriod, originalPaymentList]);

    useEffect(() => {
        const start = selectedPage * 10;
        const end = start + 10;
        setPaymentList(allPaymentList.slice(start, end));
    }, [allPaymentList, selectedPage]);

    return (
        <>
            <h3 className="mb-4 text-2xl font-ns-bold">거래 내역 전체 조회</h3>
            <div className="flex justify-between items-center">
                <PeriodFilter
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={handlePeriodChange}
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
                component={
                    <PaymentsListRadios
                        selected={selected}
                        handleSelect={handleSelect}
                        count={[originalPaymentList.length, originalPaymentList.filter((payment) => payment.status === 'SUCCESS').length, originalPaymentList.filter((payment) => payment.status === 'FAILED').length, originalPaymentList.filter((payment) => payment.status === 'CANCELLED').length, originalPaymentList.filter((payment) => payment.status === 'PENDING').length]}
                    />
                }
            />
            {allPaymentList.length === 0 && (
                <div className="w-full py-8 text-center text-xl font-ns-regular text-rose-500">
                    해당 데이터는 존재하지 않습니다.
                </div>
            )}
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