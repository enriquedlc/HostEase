import { Button, ThemeProvider, createTheme } from "@mui/material";
import { useCallback } from "react";
import UserModal from "../../../../Components/Modals/UserModal/UserModal";
import { ImBin } from "react-icons/im";

const theme = createTheme({});

interface CustomActionsProps {
    id: number
    onDelete: (id: number) => void;
}

const CustomActions: React.FC<CustomActionsProps> = ({ id, onDelete }) => {
    return (
        <div className='button-container'>
            <ThemeProvider theme={theme}>
                <UserModal userId={id} />
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => onDelete(id)}
                >
                    <ImBin />
                </Button>
            </ThemeProvider>
        </div>
    );
};

export default CustomActions;
