export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
    }[];
}

export interface PayTypeChartProps {
    type: "payType" | "status";
    selectedPeriod: string;
}

export interface PaymentChartProps {
    selectedPeriod: string;
}

export interface LineChartData {
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        data: (number | null)[];
        spanGaps?: boolean;
    }[];
}