"use client";

import { useMemo } from "react";
import { ChartOptions } from "chart.js";

interface UsePaymentLineChartOptionsProps {
    labels: string[];
    selectedPeriod: string;
}

export default function usePaymentLineChartOptions({
    labels,
    selectedPeriod,
}: UsePaymentLineChartOptionsProps) {
    const options = useMemo<ChartOptions<"line">>(() => {
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
                        display: false,
                    },
                    offset: isToday,
                    ticks: {
                        callback: (value: unknown, index: number) => {
                            if (isToday) {
                                return index === 3 ? labels[index] : "";
                            }
                            return labels[index];
                        },
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
            layout: {
                padding: isToday
                    ? {
                          left: 0,
                          right: 0,
                      }
                    : undefined,
            },
        };
    }, [selectedPeriod, labels]);

    return options;
}

