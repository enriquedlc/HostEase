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
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
        ],
    },
};


const CustomContent = () => {

    const dataChart = {
        series: [
            {
                name: "Review",
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