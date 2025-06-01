import { Upload } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchCreatePicture } from "../../redux/slices/pictures";
import { AppDispatch } from "../../redux/store";
import { ICreatePicture } from "../../types/picture.types";
import styles from "./CreatePicture.module.css";

export const CreatePicture = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch: AppDispatch = useDispatch<AppDispatch>();
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [redirect, setRedirect] = useState(false);
	const { register, handleSubmit } = useForm<ICreatePicture>();

	const onSubmit: SubmitHandler<ICreatePicture> = async value => {
		const formData = new FormData();
		const file = value.picture[0];

		formData.append("picture", file);
		formData.append("name", value.name);
		formData.append("description", value.description);

		const data = await dispatch(fetchCreatePicture(formData));
		if (!data.payload) {
			return alert("Помилка створення картинки");
		}
		setRedirect(true);
	};

	if (!isAuth) {
		return <Navigate to='/login' />;
	}

	if (redirect) {
		return <Navigate to='/' />;
	}

	return (
		<div className={styles.createPicture}>
			<div className={styles.container}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={!imagePreview ? styles.file : styles.hideFile}>
						<Upload />
						<h3>Виберiть файл</h3>
						<input
							accept='image/jpeg,image/png'
							type='file'
							{...register("picture", {
								required: true,
								onChange: e => {
									const file = e.target.files[0];
									console.log(URL.createObjectURL(file));
									if (file) {
										setImagePreview(URL.createObjectURL(file));
									}
								},
							})}
						/>
					</div>
					{imagePreview && (
						<div className={styles.preview}>
							<img
								style={{ maxWidth: "330px" }}
								src={imagePreview}
								alt='Preview'
							/>
						</div>
					)}
					<div className={styles.info}>
						<label htmlFor='name'>Назва</label>
						<input
							id='name'
							type='text'
							defaultValue=''
							{...register("name", { required: true })}
							placeholder='Додати назву'
						/>
						<label htmlFor='description'>Опис</label>
						<input
							id='description'
							type='text'
							defaultValue=''
							{...register("description", { required: true })}
							placeholder='Додати опис'
						/>
						<button type='submit'>Створити</button>
					</div>
				</form>
			</div>
		</div>
	);
};
