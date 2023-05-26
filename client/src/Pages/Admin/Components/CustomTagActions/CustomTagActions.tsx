import { Button, ThemeProvider, createTheme } from "@mui/material";
import { ImBin } from "react-icons/im";
import EventModal from "../../../../Components/Modals/EventModal/EventModal";
import { MdEdit } from "react-icons/md";
import TagModal from "../../../../Components/Modals/TagModal/TagModal";


const theme = createTheme({});

interface CustomActionsTagProps {
    tagId: number
    onDelete: (id: number) => void;
}

const CustomTagActions: React.FC<CustomActionsTagProps> = ({ tagId, onDelete }) => {
    return (
        <div className='button-container'>
            <ThemeProvider theme={theme}>
                <TagModal tagId={tagId} />
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => onDelete(tagId)}
                >
                    <ImBin />
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => onDelete(tagId)}
                >
                    <MdEdit />
                </Button>
            </ThemeProvider>
        </div>
    );
};

export default CustomTagActions;
