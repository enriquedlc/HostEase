import { Button, ThemeProvider, createTheme } from "@mui/material";
import { ImBin } from "react-icons/im";
import UserModal from "../../../../Components/Modals/UserModal/UserModal";

const theme = createTheme({});

interface CustomActionsUserProps {
    id: number
    onDelete: (id: number) => void;
}

const CustomUserActions: React.FC<CustomActionsUserProps> = ({ id, onDelete }) => {
    return (
        <div className='button-container'>
            <ThemeProvider theme={theme}>
                <UserModal userId={id} />
            </ThemeProvider>
        </div>
    );
};

export default CustomUserActions;
