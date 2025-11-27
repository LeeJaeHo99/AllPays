"use client";

import { useMemo } from "react";
import { PaymentWithMerchant } from "@/types/type";
import { ChartData } from "@/types/chartType";
import { EMPTY_CHART_DATA, PAY_TYPE_COLORS, PAY_TYPE_LABELS, STATUS_COLORS, STATUS_LABELS } from "@/constants/chart";

interface UsePayTypeChartDataProps {
    filteredPayments: PaymentWithMerchant[];
    type: "payType" | "status";
}

export default function usePayTypeChartData({
    filteredPayments,
    type,
}: UsePayTypeChartDataProps) {
    const chartData = useMemo<ChartData>(() => {
        if (!filteredPayments.length) return EMPTY_CHART_DATA;

        const filteredData = [...filteredPayments];

        if (type === "payType") {
            // 결제 수단별 카운트
            const payTypeCountMap = new Map<string, number>();
            filteredData.forEach((payment) => {
                const payType = payment.payType || "알 수 없음";
                payTypeCountMap.set(payType, (payTypeCountMap.get(payType) || 0) + 1);
            });

            const labels = Array.from(payTypeCountMap.keys()).map(
                (key) => PAY_TYPE_LABELS[key] || key
            );
            const values = Array.from(payTypeCountMap.values());
            const backgroundColor = Array.from(payTypeCountMap.keys()).map(
                (key) => PAY_TYPE_COLORS[key] || "#9E9E9E"
            );

            return {
                labels,
                datasets: [
                    {
                        label: "결제 수단",
                        data: values,
                        backgroundColor,
                    },
                ],
            };
        } else {
            // 결제 상태별 카운트
            const statusCountMap = new Map<string, number>();
            filteredData.forEach((payment) => {
                const status = payment.status || "알 수 없음";
                statusCountMap.set(status, (statusCountMap.get(status) || 0) + 1);
            });

            const labels = Array.from(statusCountMap.keys()).map(
                (status) => STATUS_LABELS[status] || status
            );
            const values = Array.from(statusCountMap.values());
            const backgroundColor = Array.from(statusCountMap.keys()).map(
                (status) => STATUS_COLORS[status] || "#9E9E9E"
            );

            return {
                labels,
                datasets: [
                    {
                        label: "결제 상태",
                        data: values,
                        backgroundColor,
                    },
                ],
            };
        }
    }, [filteredPayments, type]);

    return chartData;
}

