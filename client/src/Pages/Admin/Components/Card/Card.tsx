import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getLastMonths } from '../../../../utils/Card.utils'; 
import ApexCharts, { ApexOptions } from 'apexcharts';

import { FaTimes } from 'react-icons/fa';

import './Card.css';

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
                <CompactedCardContainer params={props} setExpanded={handleExpand} />
            )}
        </AnimatePresence>
    );
};

const CompactedCardContainer: React.FC<CompactedCardProps> = ({ params, setExpanded }) => {
    const isSingleCard = params.series.length === 1; // Verificar si hay solo una tarjeta

    return (
        <div className={`compacted-card-container ${isSingleCard ? 'single-card' : ''}`}>
            {params.series.map((param, index) => (
                <CompactedCard key={index} params={params} setExpanded={setExpanded} />
            ))}
        </div>
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
                    categories: getLastMonths(),
                },
            };

            const chart = new ApexCharts(chartRef.current, chartOptions);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, []);

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