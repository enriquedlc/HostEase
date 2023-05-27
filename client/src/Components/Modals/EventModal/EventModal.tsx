import { Button, CircularProgress, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useState } from 'react';
import { HostEaseEvent } from '../../../Types/Types';
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

type EventModalProps = {
    eventId: number;
}

const EventModal = (props: EventModalProps) => {
    const { eventId } = props;
    const [event, setEvent] = useState<HostEaseEvent | undefined>();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchEventById = (id: number) => {
        setLoading(true);

        axios.get(`http://localhost:8080/hostease/singleEvent/${id}`)
            .then((response) => {
                setEvent(response.data.data);
                setLoading(false);
                setOpen(true);
            })
            .catch((error) => {
                console.error('Error fetching event:', error);
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

        if (event) {
            return (
                <ModalContent>
                    <Typography><b>ID</b>: {event.id}</Typography>
                    <Typography><b>Title</b>: {event.title}</Typography>
                    <Typography><b>Category</b>: {event?.category?.categoryName}</Typography>
                    <Typography><b>Start time</b>: {event.startTime}</Typography>
                    <Typography><b>Likes</b>: {event.likes}</Typography>
                    <Typography><b>Comments</b>: {event.messages}</Typography>
                    <Typography><b>Owner</b>: {event.owner.nickname}</Typography>
                </ModalContent>
            );
        } else {
            return <Typography>No data available.</Typography>;
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={() => fetchEventById(eventId)}>
                <MdInfo />
            </Button>
            <Modal open={open} onClose={handleClose}>
                <ModalContainer>
                    <ModalTitle>Event Details</ModalTitle>
                    {renderModalContent()}
                    <Button className='close-button' color="error" variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </ModalContainer>
            </Modal>
        </div>
    );
};

export default EventModal;
