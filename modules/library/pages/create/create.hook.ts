import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import Webcam from "react-webcam";
import { ICreate } from "../../entities/create.entity";
import { create } from "@/commons/services";
import { IViewLibrary } from "@/commons/entities/library.entity";

const useCreateHook = () => {
	const webcamRef = useRef<Webcam>(null);

	const [imgCamara, setImgCamara] = useState<string | null | undefined>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [library, setLibrary] = useState<IViewLibrary | null>(null);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot();
		setImgCamara(imageSrc);
	}, [webcamRef, setImgCamara]);

	const validateSchema = Yup.object().shape({
		image: Yup.mixed().required("Por favor selecciona una imagen.")
	})

	const initialValues: ICreate = {
		image: null,
	};

	const createFormik = useFormik({
		initialValues: initialValues,
		validationSchema: validateSchema,
		onSubmit: async () => {
			const formData = new FormData();
			formData.append("image", selectedImage ? selectedImage : "");

			const { data }: { data : IViewLibrary } = await create(formData);
			setLibrary(data);
		},
	});

	const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedImage(e.target.files[0]);
			createFormik.setFieldValue("image", e.target.files[0].name);
		}
	};

	return {
		capture,
		createFormik,
		imgCamara,
		library,
		onChangeImage,
	};
};

export { useCreateHook };
