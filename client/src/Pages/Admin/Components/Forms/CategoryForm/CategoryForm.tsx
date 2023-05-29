import { useParams } from "react-router-dom";
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoryUpdate";

type Props = {}

const CategoryForm = () => {

    const { id } = useParams();

    return (
        <>
            {id ? <CategoryUpdate /> : <CategoryCreate />}
        </>
    )
}

export default CategoryForm