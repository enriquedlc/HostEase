import { Button, CircularProgress, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { MdInfo } from 'react-icons/md';
import { Category } from '../../../Types/Types';
import { fetchCategoryById } from '../../../services/main.services';

const ModalContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '3rem',
    backgroundColor: '#fff',
    borderRadius: '4px',
    width: '50vw',
    maxHeight: '60vh',
    overflow: 'auto',
    transform: 'translate(50%, 50%)', // Center horizontally and vertically
}));


const ModalTitle = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
});

const ModalContent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
});

const LoadingContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
});

type CategoryModalProps = {
    categoryId: number;
}

const CategoryModal = (props: CategoryModalProps) => {
    const { categoryId } = props;
    const [category, setCategory] = useState<Category | undefined>();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getCategoryById = async (id: number) => {
        setLoading(true);
        setOpen(true);
        setCategory((await fetchCategoryById(id)).data.data);
        setLoading(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderModalContent = () => {
        if (loading) {
            return (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            );
        }

        if (category) {
            return (
                <ModalContent>
                    <Typography><b>ID</b>: {category.id}</Typography>
                    <Typography><b>Category name</b>: {category.categoryName}</Typography>
                </ModalContent>
            );
        } else {
            return <Typography>No data available.</Typography>;
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={() => getCategoryById(categoryId)}>
                <MdInfo />
            </Button>
            <Modal open={open} onClose={handleClose}>
                <ModalContainer>
                    <ModalTitle>Category Details</ModalTitle>
                    {renderModalContent()}
                    <Button className='close-button' color="error" variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </ModalContainer>
            </Modal>
        </div>
    );
};

export default CategoryModal;
