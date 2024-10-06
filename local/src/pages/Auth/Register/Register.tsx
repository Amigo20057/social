import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { fetchRegister, selectIsAuth } from '../../../redux/slices/auth'
import { AppDispatch } from '../../../redux/store'
import { IRegister } from '../../../types/auth.types'
import styles from './Register.module.css'

export const Register: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch: AppDispatch = useDispatch<AppDispatch>()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegister>()

	const onSubmit: SubmitHandler<IRegister> = async value => {
		const data = await dispatch(fetchRegister(value))
		if (!data.payload) {
			return alert('Не вдалося зареєструватися')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.register}>
			<div className={styles.container}>
				<h1 style={{ padding: '10px 10px 0 10px' }}>
					Ласкаво просимо до PicNest
				</h1>
				<p style={{ padding: '10px 115px 10px' }}>
					Знаходьте нові ідеї для натхнення
				</p>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor='name'>Ім'я акаунту</label>
					<input
						id='name'
						type='text'
						defaultValue=''
						{...register('name', { required: true })}
						placeholder="Введiть ім'я акаунту"
					/>
					{errors.name && <span>Укажіть ім'я акаунту.</span>}
					<label htmlFor='email'>Адреса електронної пошти</label>
					<input
						id='email'
						type='email'
						defaultValue=''
						{...register('email', { required: true })}
						placeholder='Введiть адресу ел.пошти'
					/>
					{errors.email && <span>Укажіть свою адресу електронної пошти.</span>}
					<label htmlFor='password'>Пароль</label>
					<input
						id='password'
						type='password'
						defaultValue=''
						{...register('password', { required: true })}
						placeholder='Введiть пароль'
					/>
					{errors.password && <span>Укажіть пароль.</span>}
					<button type='submit'>Продовжити</button>
				</form>
				<Link to='/login' className={styles.login}>
					<h4>Вже реєструвалися?</h4>
				</Link>
			</div>
		</div>
	)
}
