"use client";

import { useEffect, useState } from "react";
import { PaymentWithMerchant } from "@/types/type";
import { TODAY_DATE, WEEK_DATE } from "@/constants/date";

interface UseFilterPaymentsProps {
    originalPaymentList: PaymentWithMerchant[];
    selectedPeriod: string;
    searchType: string;
    searchValue: string;
}

export default function useFilterPayments({
    originalPaymentList,
    selectedPeriod,
    searchType,
    searchValue,
}: UseFilterPaymentsProps) {
    const [periodFilteredList, setPeriodFilteredList] = useState<PaymentWithMerchant[]>([]);

    useEffect(() => {
        if (!originalPaymentList.length) return;

        let filteredList: PaymentWithMerchant[] = [...originalPaymentList];

        // 기간 필터링
        if (selectedPeriod === "1주일") {
            const today = new Date(TODAY_DATE);
            const weekAgo = new Date(WEEK_DATE);
            filteredList = filteredList.filter((payment) => {
                const paymentDate = new Date(payment.paymentAt.split("T")[0]);
                return paymentDate >= weekAgo && paymentDate <= today;
            });
        } else if (selectedPeriod === "오늘") {
            const today = new Date(TODAY_DATE);
            filteredList = filteredList.filter(
                (payment) => new Date(payment.paymentAt.split("T")[0]).getTime() === today.getTime()
            );
        }

        // 검색 필터링
        if (searchType && searchValue.trim()) {
            filteredList = filteredList.filter((payment) => {
                if (searchType === "mchtName") {
                    return payment.mchtName?.toLowerCase().includes(searchValue.toLowerCase().trim()) || false;
                } else if (searchType === "payType") {
                    return payment.payType === searchValue.trim().toUpperCase();
                } else if (searchType === "status") {
                    return payment.status === searchValue.trim().toUpperCase();
                }
                return true;
            });
        }

        setTimeout(() => {
            setPeriodFilteredList(filteredList);
        }, 0);
    }, [selectedPeriod, originalPaymentList, searchType, searchValue]);

    return periodFilteredList;
}

