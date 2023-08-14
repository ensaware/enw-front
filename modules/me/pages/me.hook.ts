import { ChangeEvent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ICareer, IUser } from "@/commons/entities";
import { all, updateCareer } from "@/commons/services";
import { LocalStorageKeys, getLocalStorage, setLocalStorage } from "@/commons/utils";
import { ICareer as initialICareer} from "..";

const useMeHook = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedCareer, setSelectedCareer] = useState<string | undefined>("");
	const [user] = useState<IUser>(getLocalStorage(LocalStorageKeys.AUTH));
	const [viewData, setViewData] = useState<ICareer[] | null>(null);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);

		const fetchData = async () => {
			try {
				const { data } : { data: ICareer[] } = await all();

				if(isMounted) {
					setSelectedCareer(user.career?.id);
					setViewData(data);
				}
			} finally {
				setLoading(false);
			}
		}

		fetchData();
		return () => {
			isMounted = false;
		};
	}, [user.career]);


	const validateSchema = Yup.object().shape({
		career_id: Yup.string().required("Por favor selecciona una carrera.")
	});

	const initialValues: initialICareer = {
		career_id: ""
	};

	const createFormik = useFormik({
		initialValues: initialValues,
		validationSchema: validateSchema,
		onSubmit: async (values: initialICareer) => {
			setLoading(true);

			try {
				const { data }: { data : IUser } = await updateCareer(values.career_id);
				setLocalStorage(LocalStorageKeys.AUTH, JSON.stringify(data));
			} finally {
				setLoading(false);
			}
		}
	});

	const onChangeCareerId = (e: ChangeEvent<HTMLSelectElement>) => {
		const careerId = e.target.value;
		setSelectedCareer(careerId);
		createFormik.setFieldValue("career_id", careerId);
	}

	return {
		createFormik,
		loading,
		onChangeCareerId,
		selectedCareer,
		user,
		viewData
	}
}

export { useMeHook }
