import { Button, CircularProgress, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useState } from 'react';
import { Tag } from '../../../Types/Types';
import { MdInfo } from 'react-icons/md';

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

type TagModalProps = {
    tagId: number;
}

const TagModal = (props: TagModalProps) => {
    const { tagId } = props;
    const [tag, setTag] = useState<Tag | undefined>();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTagById = (id: number) => {
        setLoading(true);

        axios.get(`http://localhost:8080/hostease/tags/${id}`)
            .then((response) => {
                setTag(response.data.data);
                setLoading(false);
                setOpen(true);
            })
            .catch((error) => {
                console.error('Error fetching tag:', error);
                setLoading(false);
            });
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

        if (tag) {
            return (
                <ModalContent>
                    <Typography><b>ID</b>: {tag.id}</Typography>
                    <Typography><b>Title</b>: {tag.tag}</Typography>
                    <Typography><b>Color</b>: {tag?.color}</Typography>
                </ModalContent>
            );
        } else {
            return <Typography>No data available.</Typography>;
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={() => fetchTagById(tagId)}>
                <MdInfo />
            </Button>
            <Modal open={open} onClose={handleClose}>
                <ModalContainer>
                    <ModalTitle>Tag Details</ModalTitle>
                    {renderModalContent()}
                    <Button className='close-button' color="error" variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </ModalContainer>
            </Modal>
        </div>
    );
};

export default TagModal;
