"use client";

import { useMemo } from "react";
import { PaymentWithMerchant } from "@/types/type";
import { USD_TO_KRW } from "@/constants/date";

interface UsePaymentAmountsProps {
    filteredPayments: PaymentWithMerchant[];
}

interface PaymentAmounts {
    totalAmount: number;
    cancelAmount: number;
    netAmount: number;
}

export default function usePaymentAmounts({
    filteredPayments,
}: UsePaymentAmountsProps): PaymentAmounts {
    const { totalAmount, cancelAmount, netAmount } = useMemo(() => {
        if (!filteredPayments.length) {
            return { totalAmount: 0, cancelAmount: 0, netAmount: 0 };
        }

        const filteredData = [...filteredPayments];

        // 선택한 기간에 따라 거래액 계산
        // 환율 1450원 적용

        let total = 0;
        let cancel = 0;

        filteredData.forEach((payment) => {
            const amount = parseFloat(payment.amount);
            if (isNaN(amount)) return;
            
            const amountInKRW = payment.currency === "USD" ? amount * USD_TO_KRW : amount;
            total += amountInKRW;

            if (payment.status === "FAILED" || payment.status === "CANCELLED") {
                cancel += amountInKRW;
            }
        });

        return {
            totalAmount: total,
            cancelAmount: cancel,
            netAmount: total - cancel,
        };
    }, [filteredPayments]);

    return { totalAmount, cancelAmount, netAmount };
}

