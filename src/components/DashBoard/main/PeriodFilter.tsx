import Btn from "../../Btn";
import SelectedDate from "./SelectedDate";
import { PeriodFilterProps } from "@/types/type";

export default function PeriodFilter({selectedPeriod, onPeriodChange,}: PeriodFilterProps) {
    return (
        <div className="flex items-center gap-2 w-[50%] mb-6">
            <Btn
                text="전체"
                selected={selectedPeriod === "전체"}
                onClick={(): void => onPeriodChange("전체")}
            />
            <Btn
                text="1주일"
                selected={selectedPeriod === "1주일"}
                onClick={(): void => onPeriodChange("1주일")}
            />
            <Btn
                text="오늘"
                selected={selectedPeriod === "오늘"}
                onClick={(): void => onPeriodChange("오늘")}
            />
            <SelectedDate period={selectedPeriod} />
        </div>
    );
}

