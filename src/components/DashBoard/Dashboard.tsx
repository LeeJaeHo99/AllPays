"use client";

import { useState } from "react";
import PeriodFilter from "./main/PeriodFilter";
import PaymentTotal from "./main/PaymentTotal";
import PaymentChart from "./main/PaymentChart";
import PayMchtRank from "./main/PayMchtRank";
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
                <PaymentTotal selectedPeriod={selectedPeriod} />
                <div className="flex justify-between items-start gap-10">
                    <PaymentChart selectedPeriod={selectedPeriod} />
                    <PayMchtRank selectedPeriod={selectedPeriod} />
                </div>
            </div>
            <div className="flex justify-between items-between gap-5">
                <RecentPayments />
                <div className="flex flex-col justify-between items-between gap-5 w-[30%] overflow-visible">
                    <div className="flex justify-between items-between gap-5 w-full h-[50%] overflow-visible">
                        <PayTypeChart type="payType" selectedPeriod={selectedPeriod} />
                        <PayTypeChart type="status" selectedPeriod={selectedPeriod} />
                    </div>
                    <SearchMerchants />
                </div>
            </div>
        </>
    );
}
