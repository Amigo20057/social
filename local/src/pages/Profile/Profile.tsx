import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Picture } from '../../components/Picture/Picture'
import { fetchLikedPictures } from '../../redux/slices/pictures'
import { AppDispatch, RootState } from '../../redux/store'
import styles from './Profile.module.css'

export const Profile = () => {
	const dispatch = useDispatch<AppDispatch>()
	const pictures = useSelector((state: RootState) => state.pictures)

	useEffect(() => {
		dispatch(fetchLikedPictures())
	}, [dispatch])

	return (
		<div className={styles.profile}>
			<h1>Картинки якi вам сподобались</h1>
			<div className={styles.pictures}>
				{pictures.items.map((picture, index) => (
					<Picture
						key={index}
						id={picture.id}
						url={picture.url}
						name={picture.name}
					/>
				))}
			</div>
		</div>
	)
}
