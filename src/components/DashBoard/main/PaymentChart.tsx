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
import { useEffect, useState, useMemo } from "react";
import { PaymentWithMerchant } from "@/types/type";
import useGetPaymentsList from "@/hooks/getPaymentsList";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface PaymentChartProps {
    selectedPeriod: string;
}

export default function PaymentChart({ selectedPeriod }: PaymentChartProps) {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            backgroundColor: string;
            borderColor: string;
            data: (number | null)[];
            spanGaps?: boolean;
        }[];
    }>({
        labels: [],
        datasets: [
            {
                label: "거래액",
                backgroundColor: "rgb(6, 73, 237)",
                borderColor: "rgb(6, 73, 237)",
                data: [],
            },
        ],
    });

    const { data: paymentsData, isLoading } = useGetPaymentsList();

    useEffect(() => {
        if (!paymentsData) {
            setChartData({
                labels: [],
                datasets: [
                    {
                        label: "거래액",
                        backgroundColor: "rgb(6, 73, 237)",
                        borderColor: "rgb(6, 73, 237)",
                        data: [],
                    },
                ],
            });
            return;
        }

        try {
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

                // 날짜 범위 설정
                let startDate: Date;
                const endDate = new Date("2025-11-10");

                if (selectedPeriod === "전체") {
                    startDate = new Date("2025-11-01");
                } else if (selectedPeriod === "1주일") {
                    startDate = new Date("2025-11-04");
                } else { // "오늘"
                    startDate = new Date("2025-11-10");
                }

                // 날짜 배열 생성
                const labels: string[] = [];
                const dateMap = new Map<string, number>();
                const labelDateMap = new Map<number, string>(); // 레이블 인덱스와 날짜 매핑

                // "오늘"인 경우 앞뒤로 빈 레이블 추가하여 중앙 정렬
                if (selectedPeriod === "오늘") {
                    // 앞에 3일, 뒤에 3일 추가 (총 7일, 가운데가 오늘)
                    const todayDate = new Date("2025-11-10");
                    let labelIndex = 0;
                    
                    // 앞에 3일 추가
                    for (let i = 3; i >= 1; i--) {
                        const date = new Date(todayDate);
                        date.setDate(date.getDate() - i);
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const day = String(date.getDate()).padStart(2, "0");
                        labels.push(`${month} / ${day}`);
                        labelIndex++;
                    }
                    // 오늘 날짜 (가운데)
                    const month = String(todayDate.getMonth() + 1).padStart(2, "0");
                    const day = String(todayDate.getDate()).padStart(2, "0");
                    labels.push(`${month} / ${day}`);
                    labelDateMap.set(labelIndex, "2025-11-10");
                    dateMap.set("2025-11-10", 0);
                    labelIndex++;
                    // 뒤에 3일 추가
                    for (let i = 1; i <= 3; i++) {
                        const date = new Date(todayDate);
                        date.setDate(date.getDate() + i);
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const day = String(date.getDate()).padStart(2, "0");
                        labels.push(`${month} / ${day}`);
                        labelIndex++;
                    }
                } else {
                    // "전체" 또는 "1주일"인 경우 기존 로직
                    const currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        const dateStr = currentDate.toISOString().split("T")[0];
                        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
                        const day = String(currentDate.getDate()).padStart(2, "0");
                        labels.push(`${month} / ${day}`);
                        dateMap.set(dateStr, 0);
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                }

                // 각 거래를 날짜별로 그룹화하고 합계 계산
                filteredData.forEach((payment) => {
                    const paymentDate = payment.paymentAt.split("T")[0];
                    if (dateMap.has(paymentDate)) {
                        const amount = parseFloat(payment.amount);
                        const amountInKRW = payment.currency === "USD" ? amount * 1450 : amount;
                        dateMap.set(paymentDate, dateMap.get(paymentDate)! + amountInKRW);
                    }
                });

                // 차트 데이터 생성
                const dataValues: (number | null)[] = [];
                if (selectedPeriod === "오늘") {
                    // "오늘"인 경우 레이블 순서대로 데이터 생성 (오늘만 표시, 나머지는 null)
                    labels.forEach((label, index) => {
                        const dateStr = labelDateMap.get(index);
                        if (dateStr) {
                            // 오늘 날짜만 데이터 표시
                            dataValues.push(dateMap.get(dateStr) || 0);
                        } else {
                            // 오늘이 아닌 날짜는 null로 설정하여 그래프에서 숨김
                            dataValues.push(null);
                        }
                    });
                } else {
                    // 기존 로직
                    dataValues.push(...Array.from(dateMap.values()));
                }

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "거래액",
                            backgroundColor: "rgb(6, 73, 237)",
                            borderColor: "rgb(6, 73, 237)",
                            data: dataValues,
                            spanGaps: false, // null 값 사이의 간격을 연결하지 않음
                        },
                    ],
                });
        } catch (error) {
            console.error(error);
            setChartData({
                labels: [],
                datasets: [
                    {
                        label: "거래액",
                        backgroundColor: "rgb(6, 73, 237)",
                        borderColor: "rgb(6, 73, 237)",
                        data: [],
                    },
                ],
            });
        }
    }, [selectedPeriod, paymentsData]);

    const options = useMemo(() => {
        const labels = chartData.labels;
        const isToday = selectedPeriod === "오늘";
        
        return {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false, // X축 배경선 숨김
                    },
                    offset: isToday, // "오늘"일 때만 offset 적용
                    ticks: {
                        callback: (value: unknown, index: number) => {
                            // "오늘"일 때 가운데(인덱스 3)만 표시하고 나머지는 숨김
                            if (isToday) {
                                return index === 3 ? labels[index] : "";
                            }
                            return labels[index];
                        },
                    },
                },
                y: {
                    grid: {
                        display: false, // Y축 배경선 숨김
                    },
                },
            },
            layout: {
                padding: isToday ? {
                    left: 0,
                    right: 0,
                } : undefined,
            },
        };
    }, [selectedPeriod, chartData.labels]);

    if (isLoading) {
        return (
            <div className="w-[70%]">
                <h3 className="mb-4 text-sm font-ns-regular text-gray">거래액 그래프</h3>
                <div className="flex items-center justify-center h-[300px]">
                    <p className="text-gray">로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[70%]">
            <h3 className="mb-4 text-sm font-ns-regular text-gray">거래액 그래프</h3>
            <Line data={chartData} options={options} />
        </div>
    );
}
