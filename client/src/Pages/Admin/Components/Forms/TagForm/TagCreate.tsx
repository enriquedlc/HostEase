import React from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { addTag } from "../../../../../services/main.services";
import { ITag } from "../../../../../Types/Types";
import "./TagForm.css";

type Props = {};

const tagToCreate: ITag = {
  tag: "",
  color: "",
};

const TagCreate: React.FC<Props> = (props: Props) => {
  const createTag = async (values: FormikValues, { resetForm }: any) => {
    if (!values.tag || !values.color) {
      alert("Please enter a tag and color");
      return;
    }

    tagToCreate.tag = values.tag;
    tagToCreate.color = values.color;

    console.log(tagToCreate);

    await addTag(tagToCreate);

    resetForm(); // Reset the form after successful submission
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
          }}
        >
          {({ handleSubmit }) => (
            <Form className="form" onSubmit={handleSubmit}>
              <motion.h3 {...fieldAnimation} className="form-title">
                Create tag
              </motion.h3>
              <motion.div {...fieldAnimation} className="form-field">
                <label htmlFor="tag">Tag:</label>
                <Field className="field" id="tag" name="tag" type="text" />
              </motion.div>
              <motion.div {...fieldAnimation} className="form-field">
                <label htmlFor="color">Color:</label>
                <Field className="field" id="color" name="color" type="text" />
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
