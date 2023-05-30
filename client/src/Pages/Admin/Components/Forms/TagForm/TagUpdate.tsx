import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { buttonAnimation, fieldAnimation } from "../../../../../Animations/animations";
import { HostEaseRoutes } from "../../../../../Types/AppRoutes/HostEaseRoutes";
import { ITag } from "../../../../../Types/Types";
import { fetchTagById, updateTagById } from "../../../../../services/main.services";

import "../Form.css";

const initialTagState = {
	tag: "",
	color: "",
}

const TagUpdate: React.FC = () => {

	const [tag, setTag] = useState<ITag>(initialTagState);

	const { id } = useParams();
	const navigate = useNavigate()

	const updateTag = async () => {
		if (!tag.tag || !tag.color || tag.tag === "" || tag.color === "") {
			toast.error("Please fill all the fields.", {
				position: "top-right",
			});
		} else {
			await updateTagById(tag, parseInt(id!));
			toast.success("Tag updated successfully");
			setTimeout(() => {
				navigate(HostEaseRoutes.AdminTags);
			}, 2000);
		}
	};

	useEffect(() => {
		const fetchTag = async () => {
			const tag = await fetchTagById(parseInt(id!));
			setTag(tag.data.data);
		};
		if (id) {
			fetchTag();
		}
	}, [id]);

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
					onSubmit={updateTag}
					initialValues={{
						tag: "",
						color: "",
					}}
				>
					{({ handleSubmit }) => (
						<Form className="form" onSubmit={handleSubmit}>
							<motion.h3 {...fieldAnimation} className="form-title">
								Update tag
							</motion.h3>
							<motion.div {...fieldAnimation} className="form-field">
								<label htmlFor="tag">Tag:</label>
								<input
									value={tag.tag}
									onChange={handleChangeText}
									className="field"
									id="tag"
									name="tag"
									type="text"
								/>
							</motion.div>
							<motion.div {...fieldAnimation} className="form-field">
								<label htmlFor="color">Color:</label>
								<input
									value={tag.color}
									onChange={handleChangeText}
									className="field"
									id="color"
									name="color"
									type="text"
								/>
							</motion.div>
							<motion.button
								{...buttonAnimation}
								className="submit-button"
								type="submit"
							>
								Update
							</motion.button>
						</Form>
					)}
				</Formik>
			</AnimatePresence>
		</div>
	);
};

export default TagUpdate;
