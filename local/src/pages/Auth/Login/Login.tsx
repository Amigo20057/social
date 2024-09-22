import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { fetchLogin, selectIsAuth } from '../../../redux/slices/auth'
import { AppDispatch } from '../../../redux/store'
import { ILogin } from '../../../types/auth.types'
import styles from './Login.module.css'

export const Login: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch: AppDispatch = useDispatch<AppDispatch>()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILogin>()

	const onSubmit: SubmitHandler<ILogin> = async value => {
		const data = await dispatch(fetchLogin(value))
		if (!data.payload) {
			return alert('Не вдалося авторизуватися')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.login}>
			<div className={styles.container}>
				<h1 style={{ padding: '10px 10px 0 10px' }}>
					Ласкаво просимо до Pinterest
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
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
				<Link to='/register' className={styles.register}>
					<h4>Ще не зареєструвалися?</h4>
				</Link>
			</div>
		</div>
	)
}
