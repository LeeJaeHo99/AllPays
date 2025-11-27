"use client";

import { useEffect, useState } from "react";
import { PaymentWithMerchant } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";

interface RankItem {
    mchtName: string;
    count: number;
}

interface PayMchtRankProps {
    selectedPeriod: string;
}

export default function PayMchtRank({ selectedPeriod }: PayMchtRankProps) {
    const { data: paymentsData } = useGetPaymentsList();
    const [topMerchants, setTopMerchants] = useState<RankItem[]>([]);

    useEffect(() => {
        if (!paymentsData) {
            setTopMerchants([]);
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
        
        // mchtName별로 카운트
        const merchantCountMap = new Map<string, number>();
        
        filteredData.forEach((payment) => {
            const mchtName = payment.mchtName || "알 수 없음";
            merchantCountMap.set(mchtName, (merchantCountMap.get(mchtName) || 0) + 1);
        });

        // 카운트 순으로 정렬하고 상위 5개만 가져오기
        const sortedMerchants = Array.from(merchantCountMap.entries())
            .map(([mchtName, count]) => ({ mchtName, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        setTopMerchants(sortedMerchants);
    }, [paymentsData, selectedPeriod]);

    return (
        <div className="flex flex-col justify-start w-[30%] h-full">
            <h3 className="mb-12 text-sm font-ns-regular text-gray">
                가맹점 별 거래 횟수 랭킹
            </h3>
            <div className="flex flex-col gap-8">
                {topMerchants.length > 0 ? (
                    topMerchants.map((merchant, index) => (
                        <PayMchtRankItem
                            key={merchant.mchtName}
                            rank={index + 1}
                            payMcht={merchant.mchtName}
                            count={merchant.count}
                        />
                    ))
                ) : (
                    <div className="text-sm font-ns-regular text-gray">
                        데이터가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}

function PayMchtRankItem({ rank, payMcht, count }: { rank: number; payMcht: string; count: number }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
                <p className="px-2 py-1 rounded-md text-xs font-ns-bold text-white bg-black">
                    {rank}
                </p>
                <div className="flex justify-start items-center ml-2 text-sm font-ns-regular">
                    {payMcht}
                </div>
            </div>
            <p className="text-sm font-ns-regular">
                <span className="font-ns-bold text-primary">{count}</span>건
            </p>
        </div>
    );
}
