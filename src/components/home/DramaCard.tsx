
import styles from '/Users/anna/my-drama-project/src/styles/dramacard.module.css'

type DramaCardProps = {
    title: string
    poster: string
    year: number
    episodes: number
    status: string
    genres: string[]
    rank: number
}
// props: movie name, year, number of episodes, completed/ongoing, rating, theme words(3), leads, rank
export default function DramaCard({
    title,
    poster,
    year,
    episodes,
    status,
    genres= [],
    rank
} : DramaCardProps){
    return(
        <div>
           
            <div className={styles.card}>
                {rank < 4 ? (
                    <div>
                        <img className={styles.star} src="star.png"/>
                        <div className={styles.rank}>{rank}</div>
                    </div>
                ) : (
                    <div className={styles.rank2}>{rank}</div>
                )}
                <img className={styles.heart} src="heart.png"/>
                <div className={styles.rating}> 9.8</div>
                <img className={styles.poster} src={poster}/>
                <p className={styles.title}>{title}</p>
                <div className={styles.nav}>
                    <span>{episodes} Episodes</span>
                    <span>{year}</span>
                </div>
                <div className={styles.status}>{status}</div>
                <div className={styles.genreContainer}>
                    {genres.map((genre, id) => (
                        <div key={id} className={styles.genre}> {genre} </div>
                    ))}
                </div>
            </div>
        </div>
    )
}