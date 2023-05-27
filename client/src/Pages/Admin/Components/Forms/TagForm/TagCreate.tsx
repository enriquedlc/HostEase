import { Formik, Form, Field, FormikValues } from "formik"
import React from "react"
import { AnimatePresence, motion } from "framer-motion";

import "./TagForm.css"

type Props = {};

const TagCreate: React.FC = (props: Props) => {
    const createTag = (values: FormikValues) => {
        console.log(values);
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
                <Formik
                    onSubmit={createTag}
                    initialValues={{
                        tag: "",
                        color: "",
                    }}>
                    <Form className="form" onSubmit={createTag}>
                        <motion.h3 {...fieldAnimation} className="form-title">
                            Create tag
                        </motion.h3>
                        <motion.div {...fieldAnimation} className="form-field">
                            <label htmlFor="tag">Tag:</label>
                            <Field id="tag" name="tag" type="text" />
                        </motion.div>
                        <motion.div {...fieldAnimation} className="form-field">
                            <label htmlFor="color">Color:</label>
                            <Field id="color" name="color" type="text" />
                        </motion.div>
                        <motion.button {...buttonAnimation} className="submit-button" type="submit">
                            Create
                        </motion.button>
                    </Form>
                </Formik>
            </AnimatePresence>
        </div>
    );
};

export default TagCreate;