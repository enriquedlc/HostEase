import { Button, CircularProgress, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { MdInfo } from 'react-icons/md';
import { Messages } from '../../../Types/Types';
import { fetchMessageById } from '../../../services/main.services';

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
    transform: 'translate(50%, 50%)',
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

type CommentModalProps = {
    commentId: number;
}

const CommentModal = (props: CommentModalProps) => {
    const { commentId } = props;
    const [comment, setComment] = useState<Messages | undefined>();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getCommentById = async (id: number) => {
        setLoading(true);
        setOpen(true);
        setComment((await fetchMessageById(id)).data.data);
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

        //TODO: FIX THIS
        if (comment?.data) {
            return (
                <ModalContent>
                    <Typography><b>Comment</b>: {comment?.data.map(comment => (comment?.message))}</Typography>
                    <Typography><b>Published at</b>: {comment?.data.map(comment => (comment?.publishedAt))}</Typography>
                    <Typography><b>Author</b>: {comment?.data.map(comment => (comment?.user?.userName))}</Typography>
                    <Typography><b></b> {comment?.data.map(comment => (comment?.user?.userEmail))}</Typography>
                </ModalContent>
            );
        } else {
            return <Typography>No data available.</Typography>;
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={() => getCommentById(commentId)}>
                <MdInfo />
            </Button>
            <Modal open={open} onClose={handleClose}>
                <ModalContainer>
                    <ModalTitle>Comment Details</ModalTitle>
                    {renderModalContent()}
                    <Button className='close-button' color="error" variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </ModalContainer>
            </Modal>
        </div>
    );
};

export default CommentModal;
