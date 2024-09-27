import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Picture } from '../../components/Picture/Picture'
import { fetchPictures } from '../../redux/slices/pictures'
import { AppDispatch, RootState } from '../../redux/store'
import styles from './Home.module.css'

export const Home: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const pictures = useSelector((state: RootState) => state.pictures)

	useEffect(() => {
		dispatch(fetchPictures())
	}, [dispatch])

	console.log(pictures.items)

	return (
		<div className={styles.home}>
			{pictures.items.map((picture, index) => (
				<Picture
					key={index}
					id={picture.id}
					url={picture.url}
					name={picture.name}
				/>
			))}
		</div>
	)
}
