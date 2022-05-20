import { useEffect, useRef } from "react";
import "./App.css";
import Chart from "chart.js/auto";
import { io } from "socket.io-client";

function App() {
    const socket = useRef();
    let chart;
    const updateChartData = (chart, data, dataSetIndex) => {
        chart.data.datasets[dataSetIndex].data = data;
        chart.update();
    };
    useEffect(() => {
        socket.current = io("http://localhost:3003");

        socket.current.on("data1", (res) => {
            updateChartData(chart, res, 0);
        });
        chart = new Chart("line", {
            type: "line",
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: "Realtime Chart",
                },
            },
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mei",
                    "Jun",
                    "Jul",
                    "Agu",
                    "Sep",
                    "Okt",
                    "Nov",
                    "Des",
                ],
                datasets: [
                    {
                        type: "line",
                        label: "Realtime Chart",
                        data: [
                            243, 156, 365, 30, 156, 265, 356, 543, 211, 90, 431,
                            66,
                        ],
                        backgroundColor: "rgba(255,0,255,0.4)",
                        borderColor: "rgba(255,0,255,0.4)",
                        fill: false,
                    },
                ],
            },
        });
    }, []);

    return (
        <div className="App">
            <canvas id="line"></canvas>
        </div>
    );
}

export default App;
