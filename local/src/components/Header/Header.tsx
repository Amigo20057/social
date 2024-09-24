import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectIsAuth } from '../../redux/slices/auth'
import styles from './Header.module.css'

export const Header: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)
	const [activeBtn, setActiveBtn] = useState(1)
	const navigate = useNavigate()

	const buttons = [
		{ id: 1, label: 'Головна' },
		...(isAuth ? [{ id: 2, label: 'Створити' }] : []),
	]

	const handleButtonClick = (id: number) => {
		setActiveBtn(id)
		if (id === 1) {
			navigate('/')
		} else if (id === 2) {
			navigate('/create')
		}
	}

	return (
		<div className={styles.header}>
			<div className={styles.menu}>
				<div className={styles.avatar}>
					{isAuth ? (
						<img width={80} height={80} src='/icon.png' alt='icon' />
					) : (
						<div
							style={{
								width: '150px',
								padding: '20px',
								height: '48px',
								display: 'flex',
								alignItems: 'center',
								color: '#000',
								fontSize: '20px',
								fontWeight: '700',
							}}
						>
							<img width={80} height={80} src='/icon.png' alt='icon' />
							<p>Pinterest</p>
						</div>
					)}
				</div>
				<div className={styles.buttons}>
					{buttons.map(button => (
						<button
							key={button.id}
							onClick={() => handleButtonClick(button.id)}
							className={activeBtn === button.id ? styles.active : ''}
						>
							{button.label}
						</button>
					))}
				</div>
			</div>
			<div className={isAuth ? styles.search : styles.searchHide}>
				<input type='text' placeholder='Пошук' />
			</div>
			{!isAuth ? (
				<div className={styles.auth}>
					<Link to='/login'>Увійти</Link>
					<Link to='/register'>Зареєструватися</Link>
				</div>
			) : (
				<div className={styles.profile}>
					<button></button>
				</div>
			)}
		</div>
	)
}
