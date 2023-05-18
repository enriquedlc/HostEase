import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
// import { ApexChart } from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { ApexOptions } from 'apexcharts';

import { FaTimes } from 'react-icons/fa'

import './Card.css'

interface CardProps {
    title: string
    color: {
        backGround: string
        boxShadow: string
    }
    barValue: number
    value: string
    png: any

    series: {
        name: string
        data: number[]
    }[]
}

interface CompactedCardProps {
    params: CardProps;
    setExpanded: any;
}

interface ExpandedCardProps {
    params: CardProps;
    setExpanded: any;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
    const [expandedCard, setExpandedCard] = useState<boolean>(false);

    const handleExpand = () => {
        setExpandedCard(true);
    };

    const handleCollapse = () => {
        setExpandedCard(false);
    };

    return (
        <AnimatePresence>
            {expandedCard ? (
                <ExpandedCard params={props} setExpanded={handleCollapse} />
            ) : (
                <CompactedCard params={props} setExpanded={handleExpand} />
            )}
        </AnimatePresence>
    );
};

const CompactedCard: React.FC<CompactedCardProps> = ({ params, setExpanded }) => {
    const Icon = params.png;

    return (
        <div
            className="compacted-card"
            style={{
                background: params.color.backGround,
                boxShadow: params.color.boxShadow
            }}
            onClick={setExpanded}>
            <div className="percentage-circle">
                <CircularProgressbar value={params.barValue} text={`${params.barValue}%`} />
                <span>{params.title}</span>
            </div>
            <div className="detail">
                <Icon />
                <span className='detail-number'>{params.value}</span>
                <span>time</span>
            </div>
        </div>
    );
};

// Expanded Card
const ExpandedCard: React.FC<ExpandedCardProps> = ({ params, setExpanded }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartOptions: ApexOptions = {
                series: params.series,
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

            const chart = new ApexCharts(chartRef.current, chartOptions);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [params.series]);

    return (
        <motion.div
            className="expanded-card"
            style={{
                background: params.color.backGround,
                boxShadow: params.color.boxShadow
            }}>
            <div
                style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    color: "white",
                }}
                onClick={setExpanded}>
                <FaTimes />
            </div>
            <span>{params.title}</span>
            <div className="chart-container" ref={chartRef} />
            <span>last month</span>
        </motion.div>
    );
}


export default Card