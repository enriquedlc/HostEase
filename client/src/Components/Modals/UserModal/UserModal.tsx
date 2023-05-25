import React, { useState } from 'react';
import { Modal, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { User } from '../../../Types/Types';

const ModalContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '3rem',
    backgroundColor: '#fff',
    borderRadius: '4px',
    width: '60vw',
    maxHeight: '50vh',
    overflow: 'auto',
    transform: 'translate(35%, 50%)', // Center horizontally and vertically
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

type UserModalProps = {
    userId: number;
}

const UserModal = (props: UserModalProps) => {
    const { userId } = props;
    const [user, setUser] = useState<User | undefined>();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchUserById = (id: number) => {
        setLoading(true);

        axios.get(`http://localhost:8080/hostease/users/${id}`)
            .then((response) => {
                setUser(response.data.data);
                setLoading(false);
                setOpen(true);
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
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

        if (user) {
            return (
                <ModalContent>
                    <Typography>ID: {user.id}</Typography>
                    <Typography>Nickname: {user.nickname}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Phone: {user.phone}</Typography>
                    <Typography>Joined at: {user.joinedAt}</Typography>
                    <Typography>Role: {user.role}</Typography>
                </ModalContent>
            );
        } else {
            return <Typography>No data available.</Typography>;
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={() => fetchUserById(userId)}>
                Show Details
            </Button>
            <Modal open={open} onClose={handleClose}>
                <ModalContainer>
                    <ModalTitle>User Details</ModalTitle>
                    {renderModalContent()}
                    <Button color="error" variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </ModalContainer>
            </Modal>
        </div>
    );
};

export default UserModal;
