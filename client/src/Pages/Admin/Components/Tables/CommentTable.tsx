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

import { MessageData, Messages } from "../../../../Types/Types";
import CustomCommentActions from "../CustomActions/CustomCommentActions";

import './Table.css';
import SearchBar from "../SearchBar/SearchBar";

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
            const messages = response.data.data.map((item: MessageData) => ({
                id: item.id,
                message: item.message,
                publishedAt: item.publishedAt,
                user: item.user,
            }));
            setComments(messages);
            setFilteredComments(messages); // Set the filteredComments to the messages initially
            setIsLoading(false);
        }
        getAllComments();
    }, []);


    const columns: GridColDef[] = useMemo(() => [
        {
            field: "message",
            headerName: "Message body",
            width: 380,
        },
        {
            field: "user",
            headerName: "Author",
            width: 200,
            editable: false,
            align: "left",
            renderCell: (params) => (
                params.row.user?.userName
            )
        },
        {
            field: 'publishedAt',
            headerName: 'Published at',
            width: 220,
            editable: false,
            align: 'left',
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 180,
            editable: false,
            align: "left",
            renderCell: (params) => (
                <CustomCommentActions
                    commentId={params.row.id}
                    onDelete={handleDeleteClick} />
            )
        },
    ], []);

    return (
        <div className="table">
            <h3 className="table-title">Comments</h3>
            <Box
                sx={{
                    height: 380,
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
