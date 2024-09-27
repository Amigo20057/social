import { Share } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { fetchLikePictures } from '../../redux/slices/pictures'
import { AppDispatch, RootState } from '../../redux/store'
import { IPicture } from '../../types/picture.types'
import styles from './FullPicture.module.css'

export const FullPicture = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [data, setData] = useState<IPicture | null>(null)
	const userData = useSelector((state: RootState) => state.auth.data)
	const [localLikes, setLocalLikes] = useState<number>(0)
	const [isFilled, setIsFilled] = useState(false)
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		if (id) {
			axios
				.get(`/picture/get-pictures/${id}`)
				.then(res => {
					setData(res.data)
					setLocalLikes(res.data.likes)
					setIsFilled(res.data.likesUsers?.includes(userData?.id))
				})
				.catch(err => {
					console.warn(err)
					alert('Помилка при отриманні картинки')
				})
		}
	}, [id, userData])

	const toggleHeart = async () => {
		if (!id || !data) {
			console.warn('ID или данные картинки не найдены')
			return
		}

		if (!userData?.id) {
			alert('Увійдіть до облікового запису')
			return
		}

		if (isFilled) {
			setLocalLikes(prevLikes => prevLikes - 1)
			setIsFilled(false)

			try {
				await dispatch(fetchLikePictures(id))
			} catch (err) {
				console.error('Ошибка при удалении лайка', err)
			}
		} else {
			setLocalLikes(prevLikes => prevLikes + 1)
			setIsFilled(true)

			try {
				await dispatch(fetchLikePictures(id))
			} catch (err) {
				console.error('Ошибка при добавлении лайка', err)
			}
		}
	}

	const [isCopied, setIsCopied] = useState(false)

	const handleCopy = () => {
		const pageUrl = window.location.href

		navigator.clipboard.writeText(pageUrl).then(() => {
			setIsCopied(true)

			setTimeout(() => {
				setIsCopied(false)
			}, 2000)
		})
	}

	return (
		<div className={styles.fullPicture}>
			<div className={styles.container}>
				<div className={styles.img}>
					{data && (
						<img
							className={styles.img}
							src={`http://localhost:4444/pictures/${data.url}`}
							alt={data.name}
						/>
					)}
				</div>
				<div className={styles.info}>
					<div className={styles.likes}>
						<div className={styles.like} onClick={toggleHeart}>
							{isFilled ? (
								<AiFillHeart className={styles.svg} size={34} color='red' />
							) : (
								<AiOutlineHeart className={styles.svg} size={34} color='red' />
							)}
							<h3>{localLikes}</h3>{' '}
						</div>
						<Share onClick={handleCopy} size={32} />
						{isCopied && <span>адреса скопійовано</span>}
					</div>
					<h1>{data?.name}</h1>
					<h3>{data?.description}</h3>
				</div>
			</div>
		</div>
	)
}
