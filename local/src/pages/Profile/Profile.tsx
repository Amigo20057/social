import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Picture } from '../../components/Picture/Picture'
import { selectIsAuth } from '../../redux/slices/auth'
import { fetchLikedPictures } from '../../redux/slices/pictures'
import { fetchUpdateUser } from '../../redux/slices/user'
import { AppDispatch, RootState } from '../../redux/store'
import { IUser } from '../../types/user.types'
import styles from './Profile.module.css'

export const Profile = () => {
	const isAuth = useSelector(selectIsAuth)
	const [redirect, setRedirect] = useState(false)
	const userData = useSelector((state: RootState) => state.auth.data)
	const dispatch = useDispatch<AppDispatch>()
	const pictures = useSelector((state: RootState) => state.pictures)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const { register, handleSubmit, setValue } = useForm()

	useEffect(() => {
		dispatch(fetchLikedPictures())
	}, [dispatch])

	useEffect(() => {
		if (userData) {
			setValue('name', userData.name || '')
		}
	}, [userData, setValue])

	const onSubmit: SubmitHandler<IUser> = async (value: IUser) => {
		if (!userData) {
			return alert('User data is not available.')
		}

		const formData = new FormData()

		formData.append('name', value.name || userData.name || '')

		if (value.avatar && value.avatar[0]) {
			formData.append('avatar', value.avatar[0])
		}

		const data = await dispatch(fetchUpdateUser(formData))
		if (!data.payload) {
			return alert('Помилка оновлення данних')
		}

		console.log(formData)
		setRedirect(true)
	}

	if (!isAuth) {
		return <Navigate to='/login' />
	}

	if (redirect) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.profile}>
			<div className={styles.userInfo}>
				<h1>Зміна профілю</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.avatar}>
						{imagePreview ? (
							<img src={imagePreview} alt='Preview' />
						) : userData && userData.avatar ? (
							<img
								src={`http://localhost:4444/avatars/${userData.avatar}`}
								alt='avatar'
							/>
						) : (
							<img src='./def-avatar.png' alt='default-avatar' />
						)}
						<button
							type='button'
							onClick={() => document.getElementById('avatarUpload')?.click()}
						>
							Змінити
						</button>
						<input
							type='file'
							id='avatarUpload'
							accept='image/jpeg,image/png'
							style={{ display: 'none' }}
							{...register('avatar', {
								onChange: e => {
									const file = e.target.files[0]
									if (file) {
										setImagePreview(URL.createObjectURL(file))
									}
								},
							})}
						/>
					</div>
					<label htmlFor='name'>Ім'я акаунту</label>
					<input
						type='text'
						id='name'
						{...register('name')}
						defaultValue={userData?.name}
					/>
					<button className={styles.save} type='submit'>
						Зберегти
					</button>
				</form>
			</div>
			<h1>Картинки які вам сподобались</h1>
			<div className={styles.pictures}>
				{pictures.items.length > 0 ? (
					pictures.items.map((picture, index) => (
						<Picture
							key={index}
							id={picture.id}
							url={picture.url}
							name={picture.name}
						/>
					))
				) : (
					<h1>вам нічого не сподобалось(((</h1>
				)}
			</div>
		</div>
	)
}
