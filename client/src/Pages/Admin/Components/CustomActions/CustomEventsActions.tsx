import { Button, ThemeProvider, createTheme } from "@mui/material";
import { ImBin } from "react-icons/im";
import EventModal from "../../../../Components/Modals/EventModal/EventModal";


const theme = createTheme({});

interface CustomActionsEventProps {
    eventId: number
    onDelete: (id: number) => void;
}

const CustomEventActions: React.FC<CustomActionsEventProps> = ({ eventId, onDelete }) => {
    return (
        <div className='button-container'>
            <ThemeProvider theme={theme}>
                <EventModal eventId={eventId} />
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => onDelete(eventId)}
                >
                    <ImBin />
                </Button>
            </ThemeProvider>
        </div>
    );
};

export default CustomEventActions;
