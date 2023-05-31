import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { HostEaseRoutes } from "../../../../../Types/AppRoutes/HostEaseRoutes";
import { Category } from "../../../../../Types/Types";
import { addCategory, fetchCategoryById } from "../../../../../services/main.services";

import { buttonAnimation, fieldAnimation } from "../../../../../Animations/animations";

import "../Form.css";

const CategoryCreate: React.FC = () => {

    const [category, setCategory] = useState<Category>({} as Category);
    const navigate = useNavigate()

    const { id } = useParams();

    useEffect(() => {
        const fetchCategory = async () => {
            const category = await fetchCategoryById(parseInt(id!));
            setCategory(category.data.data);
        };
        if (id) {
            fetchCategory();
        }
    }, [id])

    const createCategory = async () => {
        if (category && !category.categoryName || category.categoryName === "") {
            toast.error("Please fill all the fields.", {
                position: "top-right",
            });
        } else {
            await addCategory(category);
            toast.success("Category created successfully");
            setTimeout(() => {
                navigate(HostEaseRoutes.AdminCategories);
            }, 2000);
        }
    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        })
    };

    return (
        <div className="form-container">
            <AnimatePresence>
                <ToastContainer />
                <Formik
                    onSubmit={createCategory}
                    initialValues={{
                        categoryName: "",
                    }}>
                    {({ handleSubmit }) => (
                        <Form className="form" onSubmit={handleSubmit}>
                            <motion.h3 {...fieldAnimation} className="form-title">
                                Update Category
                            </motion.h3>
                            <motion.div {...fieldAnimation} className="form-field">
                                <label htmlFor="category-name">Category name:</label>
                                <input value={id ? category.categoryName : ""} onChange={handleChangeText} className="field" id="category-name" name="categoryName" type="text" />
                            </motion.div>
                            <motion.button
                                {...buttonAnimation}
                                className="submit-button"
                                type="submit"
                            >
                                Create
                            </motion.button>
                        </Form>
                    )}
                </Formik>
            </AnimatePresence>
        </div>
    );
};

export default CategoryCreate;
