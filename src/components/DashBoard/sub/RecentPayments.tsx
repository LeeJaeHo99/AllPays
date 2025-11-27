"use client";

import { useMemo } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { PaymentWithMerchant } from "@/types/type";
import RecentPaymentsItem from "./RecentPaymentsItem";
import useGetPaymentsList from "@/hooks/getPaymentsList";

export default function RecentPayments() {
    const { data: paymentsData, isLoading } = useGetPaymentsList();
    
    const recentPayments = useMemo<PaymentWithMerchant[]>(() => {
        if (!paymentsData) return [];

        const data = paymentsData as PaymentWithMerchant[];
        return [...data].reverse().slice(0, 5);
    }, [paymentsData]);

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
            {isLoading ? (
                <div className="flex justify-center items-center h-full py-8 animate-spin">
                    <p className="text-sm text-primary"><LoaderCircle size={32} /></p>
                </div>
            ) : recentPayments.length > 0 ? (
                <RecentPaymentsItem recentPayments={recentPayments} />
            ) : (
                <div className="flex justify-center items-center py-8">
                    <p className="text-sm text-gray">데이터가 없습니다.</p>
                </div>
            )}
        </div>
    );
}