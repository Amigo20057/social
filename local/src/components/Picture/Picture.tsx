import { IPicture } from '../../types/picture.types'
import styles from './Picture.module.css'

export const Picture = ({ url, name }: IPicture) => {
	return (
		<img
			className={styles.img}
			src={`http://localhost:4444/pictures/${url}`}
			alt={name}
		/>
	)
}
