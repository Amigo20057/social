import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picture } from "../../components/Picture/Picture";
import { fetchPictures } from "../../redux/slices/pictures";
import { AppDispatch, RootState } from "../../redux/store";
import styles from "./Home.module.css";

type HomeProps = {
	searchQuery: string;
};

export const Home: React.FC<HomeProps> = ({ searchQuery }) => {
	const dispatch = useDispatch<AppDispatch>();
	const pictures = useSelector((state: RootState) => state.pictures);

	const filteredPictures = useMemo(() => {
		if (!searchQuery.trim()) return pictures.items;

		return pictures.items.filter(picture =>
			(picture.name || "").toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [pictures.items, searchQuery]);

	useEffect(() => {
		dispatch(fetchPictures());
	}, [dispatch]);

	if (!Array.isArray(pictures.items)) {
		console.error("pictures.items is not an array", pictures.items);
		return <div>Error loading pictures</div>;
	}

	return (
		<div className={styles.home}>
			{filteredPictures.map((picture, index) => (
				<Picture
					key={index}
					id={picture.id}
					url={picture.url}
					name={picture.name}
				/>
			))}
		</div>
	);
};
