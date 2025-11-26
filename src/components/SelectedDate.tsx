"use client";

import { useState, useEffect } from "react";

export default function SelectedDate({ period }: { period: string }) {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    useEffect(() => {
        if (period === "전체") {
            setStartDate("2025-11-01");
            setEndDate("2025-11-10");
        } else if (period === "1주일") {
            setStartDate("2025-11-04");
            setEndDate("2025-11-10");
        } else {
            setStartDate("2025-11-10");
            setEndDate("2025-11-10");
        }
    }, [period]);

    return (
        <div className="flex items-center gap-2 ml-4">
            <div className="px-2 py-1 rounded-md border border-1 border-solid border-slate-400 text-xs font-ns-bold">
                {startDate}
            </div>
            <span className="text-md font-ns-regular">~</span>
            <div className="px-2 py-1 rounded-md border border-1 border-solid border-slate-400 text-xs font-ns-bold">
                {endDate}
            </div>
        </div>
    );
}
