import { Button, ThemeProvider, createTheme } from "@mui/material";
import { ImBin } from "react-icons/im";
import CommentModal from "../../../../Components/Modals/CommentModal/CommentModal";

const theme = createTheme({});

interface CustomActionsCommentProps {
    commentId: number
    onDelete: (id: number) => void;
}

const CustomCommentActions: React.FC<CustomActionsCommentProps> = ({ commentId, onDelete }) => {
    return (
        <div className='button-container'>
            <ThemeProvider theme={theme}>
                {/* <CommentModal commentId={commentId} /> */}
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => onDelete(commentId)}
                >
                    <ImBin />
                </Button>
            </ThemeProvider>
        </div>
    );
};

export default CustomCommentActions;
