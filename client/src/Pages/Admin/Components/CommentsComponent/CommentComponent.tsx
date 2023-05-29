import { useEffect, useState } from 'react'

import { Message } from '../../../../Types/Types'

import { MdMessage } from 'react-icons/md'
import { fetchAllMessages } from '../../../../services/main.services'
import { calculateChartBarValue, getCommentsByMonth } from '../../../../utils/Card.utils'

import './CommentComponent.css'
import Card from '../Card/Card'
import CommentTable from '../Tables/CommentTable'

const CommentComponent = () => {

    const [comments, setComments] = useState<Message[]>([])

    useEffect(() => {
        const getAllComments = async () => {
            setComments((await fetchAllMessages()).data.data)
        }
        getAllComments()
    }, [])

    const CommentsCardData = {
        title: "Comments",
        color: {
            backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: calculateChartBarValue(getCommentsByMonth(comments)),
        value: comments.length.toString(),
        png: MdMessage,
        series: [
            {
                name: "Comments",
                data: getCommentsByMonth(comments)
            }
        ]
    }

    return (
        <div className="main-dashboard">
            <h1 className='main-dashboard-title'>Comments</h1>
            <Card
                title={CommentsCardData.title}
                color={CommentsCardData.color}
                barValue={CommentsCardData.barValue}
                value={CommentsCardData.value}
                png={CommentsCardData.png}
                series={CommentsCardData.series}
            />
            <CommentTable />
        </div>
    )
}

export default CommentComponent