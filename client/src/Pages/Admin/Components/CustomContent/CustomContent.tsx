import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import './CustomContent.css';

const chartOptions: ApexOptions = {
    chart: {
        type: "area",
        height: "auto",
    },
    fill: {
        colors: ["#fff"],
        type: "gradient",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        colors: ["white"],
    },
    tooltip: {
        x: {
            format: "dd/MM/yy HH:mm",
        },
    },
    grid: {
        show: true,
    },
    xaxis: {
        type: "datetime",
        categories: [
            "2018-09-19T10:00:00.000Z",
            "2018-09-19T12:30:00.000Z",
            "2018-09-19T13:30:00.000Z",
            "2018-09-19T15:30:00.000Z",
            "2018-09-19T16:30:00.000Z",
            "2018-09-19T18:30:00.000Z",
            "2018-09-19T20:30:00.000Z",
        ],
    },
};


const CustomContent = () => {

    const dataChart = {
        series: [
            {
                name: "Connected users",
                data: [10, 50, 30, 90, 40, 120, 100]
            }
        ]
    }

    return (
        <div className="custom-content">
            <Chart options={chartOptions} series={dataChart.series} type='area' />
        </div>
    )
}

export default CustomContent