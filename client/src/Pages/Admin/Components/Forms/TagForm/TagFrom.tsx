import { useParams } from 'react-router-dom';
import TagCreate from './TagCreate';
import TagUpdate from './TagUpdate';

const TagFrom = () => {

    const { id } = useParams();

    return (
        <div>
            {id ? <TagUpdate /> : <TagCreate />}
        </div>
    )
}

export default TagFrom