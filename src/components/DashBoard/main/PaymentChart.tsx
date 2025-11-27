"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PaymentChartProps } from "@/types/chartType";
import useGetPaymentsList from "@/hooks/getPaymentsList";
import useFilterPayments from "@/hooks/useFilterPayments";
import usePaymentLineChartData from "@/hooks/usePaymentLineChartData";
import usePaymentLineChartOptions from "@/hooks/usePaymentLineChartOptions";
import { LoaderCircle } from "lucide-react";
import { PaymentWithMerchant } from "@/types/type";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function PaymentChart({ selectedPeriod }: PaymentChartProps) {
    const { data: paymentsData, isLoading } = useGetPaymentsList();
    
    const filteredPayments = useFilterPayments({
        originalPaymentList: (paymentsData as PaymentWithMerchant[]) || [],
        selectedPeriod,
        searchType: "",
        searchValue: "",
    });

    // 차트 데이터 생성
    const chartData = usePaymentLineChartData({
        filteredPayments,
        selectedPeriod,
    });

    // 차트 옵션 설정
    const options = usePaymentLineChartOptions({
        labels: chartData.labels,
        selectedPeriod,
    });

    if (isLoading) {
        return (
            <div className="w-[70%]">
                <h3 className="mb-4 text-sm font-ns-regular text-gray">
                    거래액 그래프
                </h3>
                <div className="flex justify-center items-center h-full py-8 animate-spin">
                    <p className="text-sm text-primary"><LoaderCircle size={32} /></p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[70%]">
            <h3 className="mb-4 text-sm font-ns-regular text-gray">
                거래액 그래프
            </h3>
            <Line data={chartData} options={options} />
        </div>
    );
}