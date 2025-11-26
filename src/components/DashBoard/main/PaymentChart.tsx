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

export default function PaymentChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels: [
            "11 / 04",
            "11 / 05",
            "11 / 06",
            "11 / 07",
            "11 / 08",
            "11 / 09",
            "11 / 10",
        ],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(6, 73, 237)",
                borderColor: "rgb(6, 73, 237)",
                data: [0, 10, 5, 2, 20, 30, 55],
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
        scales: {
            x: {
                grid: {
                    display: false, // X축 배경선 숨김
                },
            },
            y: {
                grid: {
                    display: false, // Y축 배경선 숨김
                },
            },
        },
    };
    return (
        <div className="w-[70%]">
            <h3 className="mb-4 text-sm font-ns-regular text-gray">거래액 그래프</h3>
            <Line data={data} options={options} />
        </div>
    );
}
