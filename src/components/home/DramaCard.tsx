
import styles from '/Users/anna/my-drama-project/src/styles/dramacard.module.css'

interface Drama {
    title: string;
    year: string;
    image: string;
    rating: string;
    rank: number;
    genres: string[];
  }

interface DramaCardProps{
    drama: Drama;
}

// props: movie name, year, number of episodes, completed/ongoing, rating, theme words(3), leads, rank
export default function DramaCard({drama}: DramaCardProps){
    // const isOngoing = drama.year?.includes("–");
    return(
        <div>
           
            <div className={styles.card}>
                {drama.rank < 4 ? (
                    <div>
                        <img className={styles.star} src="star.png"/>
                        <div className={styles.rank}>{drama.rank}</div>
                    </div>
                ) : (
                    <div className={styles.rank2}>{drama.rank}</div>
                )}
                <img className={styles.heart} src="heart.png"/>
                <div className={styles.rating}>{drama.rating}</div>
                <img className={styles.poster} src={drama.image}/>
                <p className={styles.title}>{drama.title}</p>
                <div className={styles.nav}>
                    <span>30 Episodes</span>
                    <span>{drama.year}</span>
                </div>
                {/* {isOngoing ? (<div className={styles.ongoing + " " + styles.status}>Ongoing</div>):
                (<div className={styles.complete + " " + styles.status}>Complete</div>)} */}
                
                <div className={styles.genreContainer}>
                    {drama.genres.map((genre, id) => (
                        <div key={id} className={styles.genre}> {genre} </div>
                    ))}
                </div>
            </div>
        </div>
    )
}