"use client";

import { useEffect, useState } from "react";
import { PaymentList } from "@/types/type";
import PeriodFilter from "./main/PeriodFilter";
import PaymentTotal from "./main/PaymentTotal";
import PaymentChart from "./main/PaymentChart";
import PayTypeRank from "./main/PayTypeRank";
import RecentPayments from "./sub/RecentPayments";
import SearchMerchants from "./sub/SearchMerchants";
import PayTypeChart from "./sub/PayTypeChart";

export default function Dashboard() {
    const [selectedPeriod, setSelectedPeriod] = useState("전체");
    const [data, setData] = useState<PaymentList[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/list`
                );
                const result = await response.json();
                setData(result.data || []);
            } catch (error) {
                setData([]);
                console.error(error);
            }
        }
        fetchData();
    }, []);

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

                {/* {data.map((item) => (
                <div key={item.paymentCode}>
                    <p>결제 코드:{item.paymentCode}</p>
                    <p>상점 코드:{item.mchtCode}</p>
                    <p>금액:{item.amount}</p>
                    <p>통화:{item.currency}</p>
                    <p>결제 타입:{item.payType}</p>
                    <p>결제 상태:{item.status}</p>
                    <p>결제 시간:{item.paymentAt}</p>
                </div>
            ))} */}
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
