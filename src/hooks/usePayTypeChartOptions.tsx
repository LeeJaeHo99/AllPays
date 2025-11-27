"use client";

import { useMemo } from "react";
import { ChartOptions } from "chart.js";

export default function usePayTypeChartOptions() {
    const options = useMemo<ChartOptions<"doughnut">>(
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
                        label: (context: { parsed?: number; dataset: { data: number[] } }) => {
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

    return options;
}

