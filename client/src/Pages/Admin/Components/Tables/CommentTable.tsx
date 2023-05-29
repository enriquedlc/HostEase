import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

import { deleteMessageById, fetchAllMessages } from "../../../../services/main.services";
import { deleteToast } from '../../../../utils/AdminToast';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HostEaseRoutes } from "../../../../Types/AppRoutes/HostEaseRoutes";
import SearchBar from "../SearchBar/SearchBar";

import { Messages } from "../../../../Types/Types";
import CustomCommentActions from "../CustomActions/CustomCommentActions";

import './Table.css';

const CommentTable = () => {
    const navigate = useNavigate()
    const [comments, setComments] = useState<Messages[]>([])
    const [filteredComments, setFilteredComments] = useState<Messages[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleDeleteClick = useCallback((id: number) => {
        deleteMessageById(id).then(() => {
            deleteToast("Message", id)
            setTimeout(() => {
                navigate(HostEaseRoutes.Admin)
            }, 2000)
        })
    }, [navigate, comments]);

    console.log(comments)

    useEffect(() => {
        const getAllComments = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2200));
            const response = await fetchAllMessages();
            setComments(response.data.data);
            setIsLoading(false);
        }
        getAllComments();
    }, []);

    const columns: GridColDef[] = useMemo(() => [
        {
            field: "message",
            headerName: "Message body",
            width: 250,
        },
        {
            field: "user",
            headerName: "Author",
            width: 180,
            editable: false,
            align: "left",
            renderCell: (params) => (
                params.row.user.userName
            )
        },
        {
            field: 'publishedAt',
            headerName: 'Published at',
            width: 180,
            editable: false,
            align: 'left',
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            editable: false,
            align: "left",
            renderCell: (params) => (
                <CustomCommentActions
                    commentId={params.row.id}
                    onDelete={handleDeleteClick} />
            )
        },
    ], []);

    // TODO: FIX THIS
    const handleSearch = (value: string) => {
        if (comments && comments.length > 0) {
            const filteredComments = comments.filter((messages) =>
                messages.data?.some((message) =>
                    message.message.toLowerCase().includes(value.toLowerCase())
                )
            );
            setFilteredComments(filteredComments);
        }
    };

    return (
        <div className="table">
            <h3 className="table-title">Comments</h3>
            <SearchBar onSearch={handleSearch} />
            <Box
                sx={{
                    height: 280,
                    width: "100%",
                    background: "white",
                    maxHeight: "70%",
                    boxShadow: "0px 15px 20px 0px #80808029",
                }}
            >
                {isLoading ? (
                    <div className="loading-container">
                        <ReactLoading type="bars" color="#FC929D" height={50} width={50} />
                    </div>
                ) : (
                    <DataGrid
                        rows={filteredComments.length > 0 ? filteredComments : comments}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                )}
            </Box>
            <ToastContainer />
        </div>
    );

};

export default CommentTable;
