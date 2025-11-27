"use client";

import { useEffect, useState } from "react";
import { PaymentWithMerchant } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";

interface PaymentTotalProps {
    selectedPeriod: string;
}

export default function PaymentTotal({ selectedPeriod }: PaymentTotalProps) {
    const [totalAmount, setTotalAmount] = useState(0);
    const [cancelAmount, setCancelAmount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    
    const { data: paymentsData, isLoading } = useGetPaymentsList();
    
    useEffect(() => {
        if (!paymentsData) {
            setTotalAmount(0);
            setCancelAmount(0);
            setNetAmount(0);
            return;
        }

        const data = paymentsData as PaymentWithMerchant[];

        // 기간 필터링
        let filteredData = [...data];
        
        if (selectedPeriod === "1주일") {
            const today = new Date("2025-11-10");
            const weekAgo = new Date("2025-11-04");
            filteredData = filteredData.filter((payment) => {
                const paymentDate = new Date(payment.paymentAt.split("T")[0]);
                return paymentDate >= weekAgo && paymentDate <= today;
            });
        } else if (selectedPeriod === "오늘") {
            const today = "2025-11-10";
            filteredData = filteredData.filter((payment) => 
                payment.paymentAt.split("T")[0] === today
            );
        }
        // "전체"는 필터링하지 않음

        // 총 거래액 계산 (USD는 1450원 환율 적용)
        let total = 0;
        let cancel = 0;

        filteredData.forEach((payment) => {
            const amount = parseFloat(payment.amount);
            const amountInKRW = payment.currency === "USD" ? amount * 1450 : amount;
            total += amountInKRW;

            // 취소/실패 거래액 계산
            if (payment.status === "FAILED" || payment.status === "CANCELLED") {
                cancel += amountInKRW;
            }
        });

        setTotalAmount(total);
        setCancelAmount(cancel);
        setNetAmount(total - cancel);
    }, [selectedPeriod, paymentsData]);

    // 숫자를 천 단위 콤마로 포맷팅
    const formatNumber = (num: number): string => {
        return Math.round(num).toLocaleString("ko-KR");
    };

    if (isLoading) {
        return (
            <div className="flex justify-between items-center mb-10 border-b border-slate-200 border-1 border-solid pb-6">
                <div className="flex flex-col">
                    <p className="text-xs font-ns-regular text-gray">총 거래액</p>
                    <p className="text-xl font-ns-bold">로딩 중...</p>
                </div>
                <span className="text-2xl font-ns-bold text-rose-500"> - </span>
                <div className="flex flex-col">
                    <p className="text-xs font-ns-regular text-gray">취소 / 실패 거래액</p>
                    <p className="text-xl font-ns-bold">로딩 중...</p>
                </div>
                <span className="text-2xl font-ns-bold text-primary"> = </span>
                <div className="flex flex-col">
                    <p className="text-xs font-ns-regular text-gray">순 거래액</p>
                    <p className="text-xl font-ns-bold">로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 border-1 border-solid pb-6">
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">총 거래액</p>
                <p className="text-xl font-ns-bold">{formatNumber(totalAmount)}원</p>
            </div>
            <span className="text-2xl font-ns-bold text-rose-500"> - </span>
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">취소 / 실패 거래액</p>
                <p className="text-xl font-ns-bold">{formatNumber(cancelAmount)}원</p>
            </div>
            <span className="text-2xl font-ns-bold text-primary"> = </span>
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">순 거래액</p>
                <p className="text-xl font-ns-bold">{formatNumber(netAmount)}원</p>
            </div>
        </div>
    );
}