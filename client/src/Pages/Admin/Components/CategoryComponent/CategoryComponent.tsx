import CategoryTable from '../Tables/CategoryTable'

import './CategoryComponent.css'

const CategoryComponent: React.FC = () => {

    return (
        <div className='main-dashboard-category'>
            <CategoryTable />
        </div>
    )
}

export default CategoryComponent