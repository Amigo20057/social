import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectIsAuth } from '../../redux/slices/auth'
import { RootState } from '../../redux/store'
import { ProfileBar } from '../ProfileBar/ProfileBar'
import styles from './Header.module.css'

interface HeaderProps {
	setSearchQuery: (query: string) => void
}

export const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
	const isAuth = useSelector(selectIsAuth)
	const userData = useSelector((state: RootState) => state.auth.data)
	const [activeBtn, setActiveBtn] = useState(1)
	const [isOpen, setIsOpen] = useState(false)
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
								width: '205px',
								padding: '20px',
								height: '48px',
								display: 'flex',
								alignItems: 'center',
								color: '#000',
								fontSize: '20px',
								fontWeight: '700',
								marginRight: '20px',
							}}
						>
							<img width={80} height={80} src='/icon.png' alt='icon' />
							<p>PicNest</p>
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
				<input
					type='text'
					placeholder='Пошук'
					onChange={e => setSearchQuery(e.target.value)}
				/>
			</div>
			{!isAuth ? (
				<div className={styles.auth}>
					<Link to='/login'>Увійти</Link>
					<Link to='/register'>Зареєструватися</Link>
				</div>
			) : (
				<div className={styles.profile}>
					{userData && userData.avatar ? (
						<img
							onClick={() => {
								setIsOpen(!isOpen)
							}}
							src={`http://localhost:4444/avatars/${userData.avatar}`}
							alt='avatar'
						/>
					) : (
						<img
							onClick={() => {
								setIsOpen(!isOpen)
							}}
							src='./def-avatar.png'
							alt='default-avatar'
						/>
					)}
					<ChevronDown
						onClick={() => {
							setIsOpen(!isOpen)
						}}
						size={24}
						color='#000'
					/>
				</div>
			)}
			<ProfileBar isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	)
}
