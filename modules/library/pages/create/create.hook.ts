import { ChangeEvent, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { ICreate } from "../../entities/create.entity";
import { create } from "@/commons/services";
import { IViewLibrary } from "@/commons/entities/library.entity";

const useCreateHook = () => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [library, setLibrary] = useState<IViewLibrary | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const validateSchema = Yup.object().shape({
		image: Yup.mixed().required("Por favor selecciona una imagen.")
	})

	const initialValues: ICreate = {
		image: null,
	};

	const createFormik = useFormik({
		initialValues: initialValues,
		validationSchema: validateSchema,
		onSubmit: async (values: ICreate, action) => {
			setLoading(true);

			const formData = new FormData();
			formData.append("image", selectedImage ? selectedImage : "");

			try {
				const { data }: { data : IViewLibrary } = await create(formData);
				setLibrary(data);
				action.resetForm();
			} finally {
				setLoading(false);
			}
		},
	});

	const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedImage(e.target.files[0]);
			createFormik.setFieldValue("image", e.target.files[0].name);
		}
	};

	return {
		createFormik,
		library,
		loading,
		onChangeImage
	};
};

export { useCreateHook };
