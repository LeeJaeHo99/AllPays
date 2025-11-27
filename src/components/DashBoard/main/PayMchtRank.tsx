"use client";

import { useMemo } from "react";
import { PaymentWithMerchant, PayMchtRankProps, RankItem } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";
import useFilterPayments from "@/hooks/useFilterPayments";
import PayMchtRankItem from "./PayMchtRankItem";
export default function PayMchtRank({ selectedPeriod }: PayMchtRankProps) {
    const { data: paymentsData } = useGetPaymentsList();
    
    const filteredPayments = useFilterPayments({
        originalPaymentList: (paymentsData as PaymentWithMerchant[]) || [],
        selectedPeriod,
        searchType: "",
        searchValue: "",
    });
    
    const topMerchants = useMemo<RankItem[]>(() => {
        if (!filteredPayments.length) return [];

        const filteredData = [...filteredPayments];
        
        const merchantCountMap = new Map<string, number>();
        
        filteredData.forEach((payment) => {
            const mchtName = payment.mchtName || "알 수 없음";
            merchantCountMap.set(mchtName, (merchantCountMap.get(mchtName) || 0) + 1);
        });

        return Array.from(merchantCountMap.entries())
            .map(([mchtName, count]) => ({ mchtName, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [filteredPayments]);

    return (
        <div className="flex flex-col justify-start w-[30%] h-full">
            <h3 className="mb-12 text-sm font-ns-regular text-gray">
                가맹점 별 거래 횟수 랭킹
            </h3>
            <div className="flex flex-col gap-8">
                {topMerchants.length > 0 && (
                    topMerchants.map((merchant, index) => (
                        <PayMchtRankItem
                            key={merchant.mchtName}
                            rank={index + 1}
                            payMcht={merchant.mchtName}
                            count={merchant.count}
                        />
                    ))
                )}
            </div>
        </div>
    );
}