"use client";

import Btn from "../../Btn";
import SelectedDate from "./SelectedDate";

interface PeriodFilterProps {
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
}

export default function PeriodFilter({
    selectedPeriod,
    onPeriodChange,
}: PeriodFilterProps) {
    return (
        <div className="flex items-center gap-2 mb-6">
            <Btn
                text="전체"
                selected={selectedPeriod === "전체"}
                onClick={() => onPeriodChange("전체")}
            />
            <Btn
                text="1주일"
                selected={selectedPeriod === "1주일"}
                onClick={() => onPeriodChange("1주일")}
            />
            <Btn
                text="오늘"
                selected={selectedPeriod === "오늘"}
                onClick={() => onPeriodChange("오늘")}
            />
            <SelectedDate period={selectedPeriod} />
        </div>
    );
}

