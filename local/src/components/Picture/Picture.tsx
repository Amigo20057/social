import { Link } from 'react-router-dom'
import { IPicture } from '../../types/picture.types'
import styles from './Picture.module.css'

export const Picture = ({
	id,
	url,
	name,
}: IPicture & { isFullPicture?: boolean }) => {
	return (
		<div className={styles.container}>
			<Link to={`/picture/${id}`}></Link>
			<img
				className={styles.img}
				src={`http://localhost:4444/pictures/${url}`}
				alt={name}
			/>
		</div>
	)
}
