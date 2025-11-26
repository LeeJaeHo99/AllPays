"use client";

import { useEffect, useState } from "react";

export default function PaymentTotal() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [cancelAmount, setCancelAmount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    
    useEffect(() => {

    }, []);

    return (
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 border-1 border-solid pb-6">
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">총 거래액</p>
                <p className="text-xl font-ns-bold">100,000,000원</p>
            </div>
            <span className="text-2xl font-ns-bold text-rose-500"> - </span>
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">취소 / 실패 거래액</p>
                <p className="text-xl font-ns-bold">100,000,000원</p>
            </div>
            <span className="text-2xl font-ns-bold text-primary"> = </span>
            <div className="flex flex-col">
                <p className="text-xs font-ns-regular text-gray">순 거래액</p>
                <p className="text-xl font-ns-bold">100,000,000원</p>
            </div>
        </div>
    );
}