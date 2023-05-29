import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { HostEaseRoutes } from "../../../../../Types/AppRoutes/HostEaseRoutes";
import { ITag } from "../../../../../Types/Types";
import { addTag, fetchTagById, updateTagById } from "../../../../../services/main.services";

import { buttonAnimation, fieldAnimation } from "../../../../../Animations/animations";
import "./TagForm.css";

// const tagToCreate: ITag = {
//     tag: "",
//     color: "",
// };

const TagCreate: React.FC = () => {

    const [tag, setTag] = useState<ITag>({} as ITag);
    const navigate = useNavigate()

    const { id } = useParams();

    useEffect(() => {

        const fetchTag = async () => {
            const tag = await fetchTagById(parseInt(id));
            setTag(tag.data.data);
        };
        if (id) {
            fetchTag();
        }
    }, [id])

    const createTag = async () => {
        if (tag && !tag.tag || !tag.color || tag.tag === "" || tag.color === "") {
            toast.error("Please fill all the fields.", {
                position: "top-right",
            });
        } else {
            await addTag(tag);
            toast.success("Tag created successfully");
            setTimeout(() => {
                navigate(HostEaseRoutes.AdminTags);
            }, 2000);
        }
    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag({
            ...tag,
            [e.target.name]: e.target.value,
        })
    };

    return (
        <div className="form-container">
            <AnimatePresence>
                <ToastContainer />
                <Formik
                    onSubmit={createTag}
                    initialValues={{
                        tag: "",
                        color: "",
                    }}>
                    {({ handleSubmit }) => (
                        <Form className="form" onSubmit={handleSubmit}>
                            <motion.h3 {...fieldAnimation} className="form-title">
                                Create Tag
                            </motion.h3>
                            <motion.div {...fieldAnimation} className="form-field">
                                <label htmlFor="tag">Tag:</label>
                                <input onChange={handleChangeText} className="field" id="tag" name="tag" type="text" />
                            </motion.div>
                            <motion.div {...fieldAnimation} className="form-field">
                                <label htmlFor="color">Color:</label>
                                <input onChange={handleChangeText} className="field" id="color" name="color" type="text" />
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

export default TagCreate;
