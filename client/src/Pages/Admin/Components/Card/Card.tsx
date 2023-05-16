import { useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

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
    return (
        <div
            className="expanded-card"
            style={{
                background: params.color.backGround,
                boxShadow: params.color.boxShadow
            }}>
            <div onClick={setExpanded}>
                <FaTimes />
            </div>
            <span>{params.title}</span>
            <div className="chart-container">
                Chart
            </div>
            <span>last x hours</span>
        </div>
    )
}

export default Card