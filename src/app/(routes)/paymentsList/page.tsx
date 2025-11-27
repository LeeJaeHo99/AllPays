"use client";

import PeriodFilter from "@/components/DashBoard/main/PeriodFilter";
import PaymentsListSearch from "@/components/Sub/PaymentsListSearch";
import PaymentsListTable from "@/components/Sub/PaymentsListTable";
import { useState } from "react";

export default function PaymentsList() {
    const [selectedPeriod, setSelectedPeriod] = useState("전체");

    return (
        <>
            <h3 className="mb-4 text-2xl font-ns-bold">거래 내역 전체 조회</h3>
            <div className="flex justify-between items-center mb-10">
                <PeriodFilter
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={setSelectedPeriod}
                />
                <PaymentsListSearch />
            </div>
            <PaymentsListTable />
        </>
    );
}
