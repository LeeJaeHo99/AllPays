"use client";

import { useEffect, useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PaymentWithMerchant } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PayTypeChartProps {
    type: "payType" | "status";
    selectedPeriod: string;
}

export default function PayTypeChart({ type, selectedPeriod }: PayTypeChartProps) {
    const { data: paymentsData, isLoading } = useGetPaymentsList();
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    }>({
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: [],
            },
        ],
    });

    useEffect(() => {
        if (!paymentsData) {
            setChartData({
                labels: [],
                datasets: [
                    {
                        label: "",
                        data: [],
                        backgroundColor: [],
                    },
                ],
            });
            return;
        }

        const data = paymentsData as PaymentWithMerchant[];

        // 기간 필터링
        let filteredData = [...data];
        
        if (selectedPeriod === "1주일") {
            const today = new Date("2025-11-10");
            const weekAgo = new Date("2025-11-04");
            filteredData = filteredData.filter((payment) => {
                const paymentDate = new Date(payment.paymentAt.split("T")[0]);
                return paymentDate >= weekAgo && paymentDate <= today;
            });
        } else if (selectedPeriod === "오늘") {
            const today = "2025-11-10";
            filteredData = filteredData.filter((payment) => 
                payment.paymentAt.split("T")[0] === today
            );
        }

        if (type === "payType") {
            // 결제 수단별 카운트
            const payTypeCountMap = new Map<string, number>();
            filteredData.forEach((payment) => {
                const payType = payment.payType || "알 수 없음";
                payTypeCountMap.set(payType, (payTypeCountMap.get(payType) || 0) + 1);
            });

            const payTypeColors: { [key: string]: string } = {
                ONLINE: "#3B82F6",      // 파란색
                MOBILE: "#10B981",      // 초록색
                DEVICE: "#F59E0B",      // 주황색
                VACT: "#8B5CF6",        // 보라색
                BILLING: "#EF4444",     // 빨간색
            };

            const payTypeLabels: { [key: string]: string } = {
                ONLINE: "온라인",
                MOBILE: "모바일",
                DEVICE: "디바이스",
                VACT: "가상계좌",
                BILLING: "청구",
            };

            const labels = Array.from(payTypeCountMap.keys()).map(
                (key) => payTypeLabels[key] || key
            );
            const values = Array.from(payTypeCountMap.values());
            const backgroundColor = Array.from(payTypeCountMap.keys()).map(
                (key) => payTypeColors[key] || "#9E9E9E"
            );

            setChartData({
                labels,
                datasets: [
                    {
                        label: "결제 수단",
                        data: values,
                        backgroundColor,
                    },
                ],
            });
        } else {
            // 결제 상태별 카운트
            const statusCountMap = new Map<string, number>();
            filteredData.forEach((payment) => {
                const status = payment.status || "알 수 없음";
                statusCountMap.set(status, (statusCountMap.get(status) || 0) + 1);
            });

            const statusColors: { [key: string]: string } = {
                SUCCESS: "#22C55E",
                FAILED: "#EF4444",
                CANCELLED: "#6B7280",
                PENDING: "#F59E0B",
                "알 수 없음": "#9E9E9E",
            };

            const statusLabels: { [key: string]: string } = {
                SUCCESS: "결제완료",
                FAILED: "결제실패",
                CANCELLED: "결제취소",
                PENDING: "승인대기",
                "알 수 없음": "알 수 없음",
            };

            const labels = Array.from(statusCountMap.keys()).map(
                (status) => statusLabels[status] || status
            );
            const values = Array.from(statusCountMap.values());
            const backgroundColor = Array.from(statusCountMap.keys()).map(
                (status) => statusColors[status] || "#9E9E9E"
            );

            setChartData({
                labels,
                datasets: [
                    {
                        label: "결제 상태",
                        data: values,
                        backgroundColor,
                    },
                ],
            });
        }
    }, [paymentsData, selectedPeriod, type]);

    const options = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false, // 범례 숨김
                },
                tooltip: {
                    position: "nearest" as const,
                    intersect: false,
                    bodyFont: {
                        size: 11,
                    },
                    titleFont: {
                        size: 11,
                    },
                    padding: 8,
                    callbacks: {
                        label: (context: { label?: string; parsed?: number; dataset: { data: number[] } }) => {
                            const label = context.label || "";
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce(
                                (a: number, b: number) => a + b,
                                0
                            );
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${value}건 (${percentage}%)`;
                        },
                    },
                },
            },
        }),
        []
    );

    const title = type === "payType" ? "결제 수단 비율" : "결제 성공 비율";

    if (isLoading) {
        return (
            <div className="w-[50%] h-full bg-white rounded-lg mb-5 px-4 py-3 shadow-md shadow-slate-500/10">
                <h2 className="mb-4 text-md font-ns-bold">{title}</h2>
                <div className="flex justify-center items-center h-[120px]">
                    <p className="text-sm text-gray">로딩 중...</p>
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
