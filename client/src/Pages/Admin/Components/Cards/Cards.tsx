import { MdOutlineGroup } from 'react-icons/md'
import './Cards.css'

const CardsData = [
    {
        title: "Users",
        color: {
            backGround: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
        },
        barValue: 70,
        value: "10.000",
        png: MdOutlineGroup,
        series: [
            {
                name: "Users",
                data: [31, 40, 28, 51, 42, 109, 100]
            }
        ]
    },
    {
        title: "Users",
        color: {
            backGround: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
        },
        barValue: 70,
        value: "10.000",
        png: MdOutlineGroup,
        series: [
            {
                name: "Users",
                data: [31, 40, 28, 51, 42, 109, 100]
            }
        ]
    },
    {
        title: "Users",
        color: {
            backGround: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
        },
        barValue: 70,
        value: "10.000",
        png: MdOutlineGroup,
        series: [
            {
                name: "Users",
                data: [31, 40, 28, 51, 42, 109, 100]
            }
        ]
    }
]

const Cards = () => {
    return (
        <div className="cards">
            Card 1
            Card 2
            Card 3
        </div>
    )
}

export default Cards