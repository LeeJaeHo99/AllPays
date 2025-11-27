"use client";

import { useEffect, useState } from "react";
import { PaymentWithMerchant } from "@/types/type";
import { USD_TO_KRW } from "@/constants/date";

interface UseSortAndFilterPaymentsProps {
    filteredList: PaymentWithMerchant[];
    selected: string;
    selectedFilter: string;
}

export default function useSortAndFilterPayments({
    filteredList,
    selected,
    selectedFilter,
}: UseSortAndFilterPaymentsProps) {
    const [sortedAndFilteredList, setSortedAndFilteredList] = useState<PaymentWithMerchant[]>([]);

    useEffect(() => {
        let resultList: PaymentWithMerchant[] = [...filteredList];

        // 결제 상태 필터링
        if (selected === "completed") {
            resultList = resultList.filter(
                (payment) => payment.status === "SUCCESS"
            );
        } else if (selected === "failed") {
            resultList = resultList.filter(
                (payment) => payment.status === "FAILED"
            );
        } else if (selected === "canceled") {
            resultList = resultList.filter(
                (payment) => payment.status === "CANCELLED"
            );
        } else if (selected === "pending") {
            resultList = resultList.filter(
                (payment) => payment.status === "PENDING"
            );
        }

        // 금액 비교를 위한 헬퍼 함수 (USD는 1450을 곱한 값으로 비교)
        const getAmountForSort = (payment: PaymentWithMerchant): number => {
            const amount = parseFloat(payment.amount);
            if (isNaN(amount)) return 0;
            return payment.currency === "USD" ? amount * USD_TO_KRW : amount;
        };

        // 정렬
        if (selectedFilter === "amountAsc") {
            resultList = [...resultList].sort(
                (a, b) => getAmountForSort(a) - getAmountForSort(b)
            );
        } else if (selectedFilter === "amountDesc") {
            resultList = [...resultList].sort(
                (a, b) => getAmountForSort(b) - getAmountForSort(a)
            );
        } else if (selectedFilter === "paymentAtDesc") {
            resultList = [...resultList].sort(
                (a, b) =>
                    new Date(b.paymentAt).getTime() -
                    new Date(a.paymentAt).getTime()
            );
        } else if (selectedFilter === "paymentAtAsc") {
            resultList = [...resultList].sort(
                (a, b) =>
                    new Date(a.paymentAt).getTime() -
                    new Date(b.paymentAt).getTime()
            );
        }

        setTimeout(() => {
            setSortedAndFilteredList(resultList);
        }, 0);
    }, [filteredList, selected, selectedFilter]);

    return sortedAndFilteredList;
}

