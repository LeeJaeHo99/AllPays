"use client";

import { useMemo } from "react";
import { PaymentWithMerchant } from "@/types/type";
import { LineChartData } from "@/types/chartType";
import { TODAY_DATE, WEEK_DATE, USD_TO_KRW } from "@/constants/date";
import { EMPTY_LINE_CHART_DATA } from "@/constants/chart";

interface UsePaymentLineChartDataProps {
    filteredPayments: PaymentWithMerchant[];
    selectedPeriod: string;
}

export default function usePaymentLineChartData({
    filteredPayments,
    selectedPeriod,
}: UsePaymentLineChartDataProps) {
    const chartData = useMemo<LineChartData>(() => {
        if (!filteredPayments.length) return EMPTY_LINE_CHART_DATA;

        try {
            const filteredData = [...filteredPayments];

            let startDate: Date;
            const endDate = new Date(TODAY_DATE);

            if (selectedPeriod === "전체") {
                startDate = new Date("2025-11-01");
            } else if (selectedPeriod === "1주일") {
                startDate = new Date(WEEK_DATE);
            } else {
                startDate = new Date(TODAY_DATE);
            }

            const labels: string[] = [];
            const dateMap = new Map<string, number>();
            const labelDateMap = new Map<number, string>();

            // 오늘 클릭 시 오늘 날짜 그래프 가운데로 정렬, 나머지는 그대로
            if (selectedPeriod === "오늘") {
                const todayDate = new Date(TODAY_DATE);
                let labelIndex = 0;

                for (let i = 3; i >= 1; i--) {
                    const date = new Date(todayDate);
                    date.setDate(date.getDate() - i);
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    labels.push(`${month} / ${day}`);
                    labelIndex++;
                }
                const month = String(todayDate.getMonth() + 1).padStart(2, "0");
                const day = String(todayDate.getDate()).padStart(2, "0");
                labels.push(`${month} / ${day}`);
                labelDateMap.set(labelIndex, TODAY_DATE);
                dateMap.set(TODAY_DATE, 0);
                labelIndex++;
                for (let i = 1; i <= 3; i++) {
                    const date = new Date(todayDate);
                    date.setDate(date.getDate() + i);
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    labels.push(`${month} / ${day}`);
                    labelIndex++;
                }
            } else {
                const currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    const dateStr = currentDate.toISOString().split("T")[0];
                    const month = String(currentDate.getMonth() + 1).padStart(
                        2,
                        "0"
                    );
                    const day = String(currentDate.getDate()).padStart(2, "0");
                    labels.push(`${month} / ${day}`);
                    dateMap.set(dateStr, 0);
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }

            filteredData.forEach((payment) => {
                const paymentDate = payment.paymentAt.split("T")[0];
                if (dateMap.has(paymentDate)) {
                    const amount = parseFloat(payment.amount);
                    const amountInKRW =
                        payment.currency === "USD"
                            ? amount * USD_TO_KRW
                            : amount;
                    dateMap.set(
                        paymentDate,
                        dateMap.get(paymentDate)! + amountInKRW
                    );
                }
            });

            const dataValues: (number | null)[] = [];
            if (selectedPeriod === "오늘") {
                labels.forEach((label, index) => {
                    const dateStr = labelDateMap.get(index);
                    if (dateStr) {
                        dataValues.push(dateMap.get(dateStr) || 0);
                    } else {
                        dataValues.push(null);
                    }
                });
            } else {
                dataValues.push(...Array.from(dateMap.values()));
            }

            return {
                labels,
                datasets: [
                    {
                        label: "거래액",
                        backgroundColor: "rgb(6, 73, 237)",
                        borderColor: "rgb(6, 73, 237)",
                        data: dataValues,
                        spanGaps: false,
                    },
                ],
            };
        } catch (error) {
            console.error(error);
            return EMPTY_LINE_CHART_DATA;
        }
    }, [selectedPeriod, filteredPayments]);

    return chartData;
}

