import { ChartData, LineChartData } from "@/types/chartType";

export const PAY_TYPE_COLORS: { [key: string]: string } = {
    ONLINE: "#3B82F6",
    MOBILE: "#10B981",
    DEVICE: "#F59E0B",
    VACT: "#8B5CF6",
    BILLING: "#EF4444",
};

export const PAY_TYPE_LABELS: { [key: string]: string } = {
    ONLINE: "온라인",
    MOBILE: "모바일",
    DEVICE: "디바이스",
    VACT: "가상계좌",
    BILLING: "청구",
};

export const STATUS_COLORS: { [key: string]: string } = {
    SUCCESS: "#22C55E",
    FAILED: "#EF4444",
    CANCELLED: "#6B7280",
    PENDING: "#F59E0B",
    "알 수 없음": "#9E9E9E",
};

export const STATUS_LABELS: { [key: string]: string } = {
    SUCCESS: "결제완료",
    FAILED: "결제실패",
    CANCELLED: "결제취소",
    PENDING: "승인대기",
    "알 수 없음": "알 수 없음",
};


export const EMPTY_CHART_DATA: ChartData = {
    labels: [],
    datasets: [
        {
            label: "",
            data: [],
            backgroundColor: [],
        },
    ],
};

export const EMPTY_LINE_CHART_DATA: LineChartData = {
    labels: [],
    datasets: [
        {
            label: "거래액",
            backgroundColor: "rgb(6, 73, 237)",
            borderColor: "rgb(6, 73, 237)",
            data: [],
        },
    ],
};