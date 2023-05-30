import { Button, ThemeProvider, createTheme } from "@mui/material";
import { ImBin } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import CategoryModal from "../../../../Components/Modals/CategoryModal/CategoryModal";
import { HostEaseRoutes } from "../../../../Types/AppRoutes/HostEaseRoutes";

const theme = createTheme({});

interface CustomActionsCategoryProps {
    categoryId: number
    onDelete: (id: number) => void;
}

const CustomCategoryActions: React.FC<CustomActionsCategoryProps> = ({ categoryId, onDelete }) => {
    return (
        <div className='button-container'>
            <ThemeProvider theme={theme}>
                <CategoryModal categoryId={categoryId} />
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => onDelete(categoryId)}
                >
                    <ImBin />
                </Button>
                <Link
                    to={`${HostEaseRoutes.AdminCategories}/update/${categoryId}`}
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

export default CustomCategoryActions;
