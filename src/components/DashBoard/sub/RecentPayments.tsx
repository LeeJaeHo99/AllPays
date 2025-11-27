"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PaymentList, PaymentWithMerchant } from "@/types/type";
import RecentPaymentsItem from "./RecentPaymentsItem";

export default function RecentPayments() {
    const [recentPayments, setRecentPayments] = useState<PaymentWithMerchant[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const responsePayments = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/list`,
                    { cache: "force-cache" }
                );
                if (!responsePayments.ok) {
                    throw new Error("데이터를 불러오는데 실패했습니다.");
                }
                const result = await responsePayments.json();
                const data: PaymentList[] = result.data || [];
                const recentPaymentsData = data.reverse().slice(0, 5);

                // 각 결제에 대해 merchants 정보 가져오기
                if (recentPaymentsData.length > 0) {
                    const paymentsWithMerchants = await Promise.all(
                        recentPaymentsData.map(async (payment: PaymentList) => {
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

                    setRecentPayments(paymentsWithMerchants);
                } else {
                    setRecentPayments([]);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    console.log(recentPayments);
    return (
        <div className="w-[70%] flex flex-col bg-white rounded-lg mb-5 px-10 py-5 shadow-md shadow-slate-500/10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="mb-4 text-2xl font-ns-bold">최근 거래 내역</h2>
                <button className="flex justify-center items-center text-xs font-ns-regular text-gray hover:text-primary transition-all duration-300">
                    <Link href="/paymentsList">
                        <span>더보기</span>
                    </Link>
                    <ArrowUpRight size={16} />
                </button>
            </div>
            <RecentPaymentsItem recentPayments={recentPayments} />
        </div>
    );
}


