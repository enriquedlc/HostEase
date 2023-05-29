import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const deleteToast = (toDelete: string, id: number) => {
    toast.success(`${toDelete} with id ${id} deleted ❌`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}