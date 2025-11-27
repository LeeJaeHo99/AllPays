"use client";

import { PaymentWithMerchant, PaymentTotalProps } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";
import useFilterPayments from "@/hooks/useFilterPayments";
import usePaymentAmounts from "@/hooks/usePaymentAmounts";

const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString("ko-KR");
};

export default function PaymentTotal({ selectedPeriod }: PaymentTotalProps) {
    const { data: paymentsData, isLoading } = useGetPaymentsList();
    
    // 기간 필터링
    const filteredPayments = useFilterPayments({
        originalPaymentList: (paymentsData as PaymentWithMerchant[]) || [],
        selectedPeriod,
        searchType: "",
        searchValue: "",
    });
    
    // 거래액 계산
    const { totalAmount, cancelAmount, netAmount } = usePaymentAmounts({
        filteredPayments,
    });

    return (
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 border-1 border-solid pb-6">
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">총 거래액</p>
                <p className="text-xl font-ns-bold">
                    {isLoading ? "..." : `${formatNumber(totalAmount)}원`}
                </p>
            </div>
            <span className="text-2xl font-ns-bold text-rose-500"> - </span>
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">취소 / 실패 거래액</p>
                <p className="text-xl font-ns-bold">
                    {isLoading ? "..." : `${formatNumber(cancelAmount)}원`}
                </p>
            </div>
            <span className="text-2xl font-ns-bold text-primary"> = </span>
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">순 거래액</p>
                <p className="text-xl font-ns-bold">
                    {isLoading ? "..." : `${formatNumber(netAmount)}원`}
                </p>
            </div>
        </div>
    );
}