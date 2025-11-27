"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PaymentWithMerchant } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";
import useFilterPayments from "@/hooks/useFilterPayments";
import usePayTypeChartData from "@/hooks/usePayTypeChartData";
import usePayTypeChartOptions from "@/hooks/usePayTypeChartOptions";
import { LoaderCircle } from "lucide-react";
import { PayTypeChartProps } from "@/types/chartType";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PayTypeChart({ type, selectedPeriod }: PayTypeChartProps) {
    const { data: paymentsData, isLoading } = useGetPaymentsList();
    
    // 기간 필터링
    const filteredPayments = useFilterPayments({
        originalPaymentList: (paymentsData as PaymentWithMerchant[]) || [],
        selectedPeriod,
        searchType: "",
        searchValue: "",
    });
    
    // 차트 데이터 생성
    const chartData = usePayTypeChartData({
        filteredPayments,
        type,
    });

    // 차트 옵션 설정
    const options = usePayTypeChartOptions();

    const title = type === "payType" ? "결제 수단 비율" : "결제 성공 비율";

    if (isLoading) {
        return (
            <div className="w-[50%] h-full bg-white rounded-lg mb-5 px-4 py-3 shadow-md shadow-slate-500/10">
                <h2 className="mb-4 text-md font-ns-bold">{title}</h2>
                <div className="flex justify-center items-center h-full py-8 animate-spin">
                    <p className="text-sm text-primary"><LoaderCircle size={32} /></p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[50%] h-full bg-white rounded-lg mb-5 px-4 py-3 shadow-md shadow-slate-500/10 overflow-visible">
            <h2 className="mb-4 text-md font-ns-bold">{title}</h2>
            <div className="flex justify-center items-center h-[120px] overflow-visible">
                {chartData.labels.length > 0 ? (
                    <div className="w-[120px] h-[120px] overflow-visible">
                        <Doughnut data={chartData} options={options} />
                    </div>
                ) : (
                    <p className="text-sm text-gray">데이터가 없습니다.</p>
                )}
            </div>
        </div>
    );
}