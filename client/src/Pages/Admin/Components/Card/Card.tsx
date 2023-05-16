import { useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

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

interface StatusCardProps {
    Icon: any
    value: string
    showedDataTime: string
}

const Card: React.FC<CardProps> = (props: CardProps) => {

    const [expandedCard, setExpandedCars] = useState<boolean>(false);

    return (
        <AnimatePresence>
            {
                expandedCard
                    ? (<ExpandedCard />)
                    : (<CompactedCard params={props} />)
            }
        </AnimatePresence>
    )
}

// Compacted Card
const CompactedCard = ({ params }) => {

    const Icon = params.png

    return (
        <div className="compacted-card"
            style={{
                background: params.color.backGround,
                boxShadow: params.color.boxShadow
            }}
        >
            <div className="percentage-circle">
                <CircularProgressbar
                    value={params.barValue}
                    text={`${params.barValue}%`}
                />
                <span>{params.title}</span>
            </div>
            <div className="detail">
                <Icon />
                <span>{params.value}</span>
                <span>time</span>
            </div>
        </div>
    )
}

// Expanded Card
const ExpandedCard = () => {
    return (
        <div className="expanded-card">

        </div>
    )
}

export default Card