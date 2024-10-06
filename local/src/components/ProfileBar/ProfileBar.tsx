import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/slices/auth'
import { AppDispatch, RootState } from '../../redux/store'
import styles from './ProfileBar.module.css'

type Props = {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ProfileBar = ({ isOpen, setIsOpen }: Props) => {
	const userData = useSelector((state: RootState) => state.auth.data)
	const dispatch = useDispatch<AppDispatch>()
	const menuRef = useRef<HTMLDivElement | null>(null)

	const onClickLogout = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		setIsOpen(false)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, setIsOpen])

	return (
		<div ref={menuRef} className={isOpen ? styles.open : styles.menu}>
			<h4 style={{ fontWeight: '400' }}>Акаунт</h4>
			<Link to='/profile' className={styles.account}>
				<div className={styles.avatar}>
					{userData && userData.avatar ? (
						<img
							src={`http://localhost:4444/avatars/${userData.avatar}`}
							alt='avatar'
						/>
					) : (
						<img src='./def-avatar.png' alt='default-avatar' />
					)}
				</div>
				<div className={styles.info}>
					<h3>{userData && userData.name ? userData.name : ''}</h3>
					<p>{userData && userData.email ? userData.email : ''}</p>
				</div>
			</Link>
			<div className={styles.additionally}>
				<h4 style={{ fontWeight: '400' }}>Додатково</h4>
				<button onClick={onClickLogout} className={styles.logout}>
					<h3>Вийти</h3>
				</button>
			</div>
		</div>
	)
}
