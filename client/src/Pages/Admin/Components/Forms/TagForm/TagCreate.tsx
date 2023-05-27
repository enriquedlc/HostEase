import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { HostEaseRoutes } from "../../../../../Types/AppRoutes/HostEaseRoutes";
import { ITag } from "../../../../../Types/Types";
import { addTag } from "../../../../../services/main.services";

import "./TagForm.css";

const tagToCreate: ITag = {
    tag: "",
    color: "",
};

const TagCreate: React.FC = () => {

    const [tag, setTag] = React.useState<ITag>(tagToCreate);
    const navigate = useNavigate()

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

    console.log(tag)

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag({
            ...tag,
            [e.target.name]: e.target.value,
        })
    };


    const fieldAnimation = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const buttonAnimation = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
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
                                Create tag
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
