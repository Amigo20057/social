import { Link } from 'react-router-dom'
import { IPicture } from '../../types/picture.types'
import styles from './Picture.module.css'

export const Picture = ({
	id,
	url,
	name,
}: // isFullPicture,
IPicture & { isFullPicture?: boolean }) => {
	// const [isFilled, setIsFilled] = useState(false)

	// console.log(id)
	// console.log(isFullPicture)

	// const toggleHeart = () => {
	// 	setIsFilled(!isFilled)
	// }

	return (
		<div className={styles.container}>
			<Link to={`/picture/${id}`}></Link>
			<img
				className={styles.img}
				src={`http://localhost:4444/pictures/${url}`}
				alt={name}
			/>
			{/* <div onClick={toggleHeart}>
				{isFilled ? (
					<AiFillHeart className={styles.svg} size={34} color='red' />
				) : (
					<AiOutlineHeart className={styles.svg} size={34} color='red' />
				)}
			</div> */}
		</div>
	)
}
