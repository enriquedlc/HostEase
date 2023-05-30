import { Button, ThemeProvider, createTheme } from "@mui/material";
import { ImBin } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import TagModal from "../../../../Components/Modals/TagModal/TagModal";
import { HostEaseRoutes } from "../../../../Types/AppRoutes/HostEaseRoutes";

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
                <Link
                    to={`${HostEaseRoutes.AdminTags}/update/${tagId}`}
                >
                    <Button
                        color="secondary"
                        variant="contained"
                    >
                        <MdEdit />
                    </Button>
                </Link>
            </ThemeProvider>
        </div>
    );
};

export default CustomTagActions;
