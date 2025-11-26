import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function PayTypeChart() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                ],
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    return (
        <div className="w-[50%] h-full bg-white rounded-lg mb-5 px-4 py-3 shadow-md shadow-slate-500/10">
            <h2 className="mb-4 text-md font-ns-bold">거래 수단 비율 & </h2>
            <div className="flex justify-center items-center">
                <Doughnut
                    data={data}
                    options={options}
                    className="w-full h-full max-w-[100px] max-h-[100px]"
                />
            </div>
        </div>
    );
}
