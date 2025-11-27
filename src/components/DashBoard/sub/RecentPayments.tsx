"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PaymentWithMerchant } from "@/types/type";
import RecentPaymentsItem from "./RecentPaymentsItem";
import useGetPaymentsList from "@/hooks/getPaymentsList";

export default function RecentPayments() {
    const { data: paymentsData } = useGetPaymentsList();
    const [recentPayments, setRecentPayments] = useState<PaymentWithMerchant[]>([]);

    useEffect(() => {
        if (paymentsData) {
            const data = paymentsData as PaymentWithMerchant[];
            // 최근 5개의 거래만 가져오기 (역순)
            const recentPaymentsData = [...data].reverse().slice(0, 5);
            setRecentPayments(recentPaymentsData);
        } else {
            setRecentPayments([]);
        }
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
            <RecentPaymentsItem recentPayments={recentPayments} />
        </div>
    );
}


