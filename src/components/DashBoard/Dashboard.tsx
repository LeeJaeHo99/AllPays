"use client";

import { useState } from "react";
import PeriodFilter from "./main/PeriodFilter";
import PaymentTotal from "./main/PaymentTotal";
import PaymentChart from "./main/PaymentChart";
import PayTypeRank from "./main/PayTypeRank";
import RecentPayments from "./sub/RecentPayments";
import SearchMerchants from "./sub/SearchMerchants";
import PayTypeChart from "./sub/PayTypeChart";

export default function Dashboard() {
    const [selectedPeriod, setSelectedPeriod] = useState("전체");

    return (
        <>
            <div className="flex flex-col bg-white rounded-lg mb-5 px-10 py-5 shadow-md shadow-slate-500/10">
                <h2 className="mb-4 text-2xl font-ns-bold">거래액 확인</h2>
                <PeriodFilter
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={setSelectedPeriod}
                />
                <PaymentTotal />
                <div className="flex justify-between items-start gap-10">
                    <PaymentChart />
                    <PayTypeRank />
                </div>
            </div>
            <div className="flex justify-between items-between gap-5">
                <RecentPayments />
                <div className="flex flex-col justify-between items-between gap-5 w-[30%]">
                    <div className="flex justify-between items-between gap-5 w-full h-[50%]">
                        <PayTypeChart />
                        <PayTypeChart />
                    </div>
                    <SearchMerchants />
                </div>
            </div>
        </>
    );
}
