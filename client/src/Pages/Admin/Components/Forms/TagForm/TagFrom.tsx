import React from 'react'
import { useParams } from 'react-router-dom';
import TagCreate from './TagCreate';
import TagUpdate from './TagUpdate';

type Props = {}

const TagFrom = (props: Props) => {

    const { id } = useParams();

    return (
        <div>
            {id ? <TagUpdate /> : <TagCreate />}
        </div>
    )
}

export default TagFrom