'use client'
import styles from '/Users/anna/my-drama-project/src/styles/infopage.module.css';
import { useState } from "react";

async function bookmarkDrama(drama: {
    title: string;
    year: string;
    image: string;
    rating: string;
    rank: number;
    genres: string[];
}) {
    const resp = await fetch("http://127.0.0.1:8000/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(drama),
    });
    if (!resp.ok) {
        throw new Error("Error bookmarking drama");
    }
    return await resp.json();
}

async function unbookmarkDrama(drama: {
    title: string;
    year: string;
    image: string;
    rating: string;
    rank: number;
    genres: string[];
}){
    const resp = await fetch(`http://127.0.0.1:8000/drama/${encodeURIComponent(drama.title)}`, {
        method: "DELETE"
    });
    if(!resp.ok){
        throw new Error("Error removing drama from bookmarks.")
    }
    return await resp.json();
}

export default function InfoPage({ drama }: {
    drama: {
        title: string;
        year: string;
        image: string;
        rating: string;
        rank: number;
        genres: string[];
    }
}) {
    const imageUrl = "https://pub-affc0001b76247f59177d2bd8ccdc395.r2.dev/the-prisoner-of-beauty.jpeg";
    const [bookmarked, setBookmarked] = useState(false);

    const handleBookmark = async () => {
        try {
            if (!bookmarked) {
                const result = await bookmarkDrama(drama);
                console.log("Bookmarked:", result);
                setBookmarked(true);
            }
            else{
                const result = await unbookmarkDrama(drama);
                console.log("Unbookmarked:", result);
                setBookmarked(false);
            }

        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={styles.main}>
            <div className={styles.intro}>
                <div className={styles.poster} style={{ "--parallax-url": `url(${imageUrl})` } as React.CSSProperties}></div>
                <section className={styles.description}>
                    <div className={styles.title}>
                        <div>
                            <h1>The Prisoner of Beauty</h1>
                        </div>

                    </div>
                    <h2>折腰</h2>

                    <section className={styles.infoContainer}>
                        <div className={styles.time}>
                            <img className={styles.icon} src="star_white.png"></img>
                            <p>8.9</p>
                        </div>
                        <div className={styles.time}>
                            <img className={styles.icon} src="calendar.png">
                            </img><p>2025</p>
                        </div>
                        <div className={styles.time}>
                            <img className={styles.icon} src="film.png"></img>
                            <p>35 Episodes</p>
                        </div>
                    </section>

                    <button className={`${styles.animatedButton} ${bookmarked ? styles.bookmarked : styles.default}`} onClick={handleBookmark}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={bookmarked ? styles.hide : styles.arr2} viewBox="0 0 24 24">
                            <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                            ></path>
                        </svg>
                        <img className={bookmarked ? styles.checkmark : styles.hide} src="checkmark.svg"/>
                        <span className={styles.text}>{bookmarked ? "BOOKMARKED DRAMA" : "BOOKMARK DRAMA"}</span>
                        <span className={styles.circle}></span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={bookmarked ? styles.hide : styles.arr1} viewBox="0 0 24 24">
                            <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                            ></path>
                        </svg>
                    </button>
                    <p><strong>Starring:</strong> Liu Yuning, Song Zuer</p>
                    <p><strong>Themes:</strong> novel “Zhe Yao” by Cang Yue (沧月)</p>
                    <p><strong>Synopsis: </strong>The Prisoner of Beauty is a 2025 Chinese historical drama where clever Xiao Qiao enters a strategic marriage with Wei Shao, a rival clan leader who survived the clan war orchestrated by Xiao Qiao's family. Although their families have a bitter feud, the couple builds trust and love as they work together to restore the critical Yongning Canal and bring prosperity to their people, eventually becoming lifelong companions.  </p>
                    <p><strong>Filming Location:</strong> Hengdian World Studios (Zhejiang, China)</p>
                    <p><strong>Adapted from:</strong> novel “Zhe Yao” by Cang Yue (沧月)</p>
                </section>
            </div>
            <div className={styles.popup}>
                <div className={styles.history}>
                    <h1 className={styles.headline}>Through the Lens of History</h1>
                    <p className={styles.historyText}>The Prisoner of Beauty (《折腰》) takes place in a fictional dynasty, but its world is modeled on the Han dynasty, giving the story cultural depth and authenticity. The Han era (206 BCE–220 CE) was defined by imperial power, frontier threats from the Xiongnu, and the influence of powerful clans during times of weakened central authority. The series mirrors this context through the Wei family’s battles with the Xiongnu and its blood feud with the Qiao family, reflecting how political instability and family rivalries shaped the era. Marriage as a political tool was common in Han society, and Xiao Qiao’s forced union with Wei Shao echoes these practices, turning her personal fate into a strategic alliance. While Han women were expected to be obedient under Confucian ideals, history records cases of women wielding influence behind the scenes. Xiao Qiao embodies this tension, stepping into roles of strategist, defender, and leader, a blend of historical plausibility and modern storytelling that emphasizes female agency. Wei Shao’s character arc also draws on Han values: Confucian teachings demanded that rulers prioritize the people’s welfare over revenge, and his shift from vengeance to benevolence fulfills that expectation. Visually, the series borrows from Han aesthetics, from flowing robes and embroidered motifs to hair ornaments and frontier armor, anchoring the fictional world in recognizable material culture. Though the dynasty itself is imagined, its Han-inspired setting shapes the themes of power, duty, love, and transformation, making the story resonate with both historical richness and contemporary appeal.</p>
                </div>
                <div className={styles.spotifyContainer}>
                    <div className={styles.currentplaying}>
                        <svg height="50px" width="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={styles.spotify}><stop stop-color="#f4e9c3" offset="0"></stop><stop stop-color="#f8eecd" offset=".219"></stop><stop stop-color="#fdf4dc" offset=".644"></stop><stop stop-color="#fff6e1" offset="1"></stop><path d="M51.03,37.34c0.16,0.98,1.08,1.66,2.08,1.66h5.39c2.63,0,4.75,2.28,4.48,4.96	C62.74,46.3,60.64,48,58.29,48H49c-1.22,0-2.18,1.08-1.97,2.34c0.16,0.98,1.08,1.66,2.08,1.66h8.39c1.24,0,2.37,0.5,3.18,1.32	C61.5,54.13,62,55.26,62,56.5c0,2.49-2.01,4.5-4.5,4.5h-49c-1.52,0-2.9-0.62-3.89-1.61C3.62,58.4,3,57.02,3,55.5	C3,52.46,5.46,50,8.5,50H14c1.22,0,2.18-1.08,1.97-2.34C15.81,46.68,14.89,44,13.89,44H5.5c-2.63,0-4.75-2.28-4.48-4.96	C1.26,36.7,3.36,35,5.71,35H8c1.71,0,3.09-1.43,3-3.16C10.91,30.22,9.45,29,7.83,29H4.5c-2.63,0-4.75-2.28-4.48-4.96	C0.26,21.7,2.37,20,4.71,20H20c0.83,0,1.58-0.34,2.12-0.88C22.66,18.58,23,17.83,23,17c0-1.66-1.34-3-3-3h-1.18	c-0.62-0.09-1.43,0-2.32,0h-9c-1.52,0-2.9-0.62-3.89-1.61S2,10.02,2,8.5C2,5.46,4.46,3,7.5,3h49c3.21,0,5.8,2.79,5.47,6.06	C61.68,11.92,60.11,14,57.24,14H52c-2.76,0-5,2.24-5,5c0,1.38,0.56,2.63,1.46,3.54C49.37,23.44,50.62,24,52,24h6.5	c3.21,0,5.8,2.79,5.47,6.06C63.68,32.92,61.11,35,58.24,35H53C51.78,35,50.82,36.08,51.03,37.34z" fill="url(#ipdIa4~cOclR8yt_ClW93a)"></path><linearGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(0 -534)" y2="590.253" y1="530.096" x2="32" x1="32" id="ipdIa4~cOclR8yt_ClW93b"><stop stop-color="#42d778" offset="0"></stop><stop stop-color="#3dca76" offset=".428"></stop><stop stop-color="#34b171" offset="1"></stop></linearGradient><path d="M57,32c0,12.837-9.663,23.404-22.115,24.837C33.942,56.942,32.971,57,32,57	c-1.644,0-3.25-0.163-4.808-0.471C15.683,54.298,7,44.163,7,32C7,18.192,18.192,7,32,7S57,18.192,57,32z" fill="url(#ipdIa4~cOclR8yt_ClW93b)"></path><path d="M41.683,44.394c-0.365,0-0.731-0.181-1.096-0.365c-3.471-2.009-7.674-3.105-12.24-3.105	c-2.559,0-5.116,0.364-7.491,0.912c-0.365,0-0.914,0.183-1.096,0.183c-0.914,0-1.461-0.732-1.461-1.462	c0-0.913,0.547-1.463,1.279-1.643c2.923-0.732,5.846-1.096,8.951-1.096c5.116,0,9.866,1.276,13.885,3.655	c0.548,0.364,0.914,0.73,0.914,1.642C43.145,43.847,42.414,44.394,41.683,44.394z M44.241,38.181c-0.547,0-0.912-0.18-1.279-0.364	c-3.835-2.375-9.135-3.839-15.163-3.839c-2.924,0-5.664,0.366-7.674,0.916c-0.549,0.18-0.731,0.18-1.096,0.18	c-1.096,0-1.827-0.912-1.827-1.826c0-1.096,0.549-1.645,1.461-2.009c2.74-0.73,5.481-1.279,9.317-1.279	c6.213,0,12.241,1.463,16.991,4.384c0.73,0.364,1.096,1.096,1.096,1.826C46.069,37.269,45.337,38.181,44.241,38.181z M47.165,30.876	c-0.548,0-0.731-0.182-1.279-0.364c-4.385-2.559-10.961-4.021-17.356-4.021c-3.289,0-6.577,0.366-9.5,1.096	c-0.366,0-0.731,0.182-1.279,0.182c-1.279,0.183-2.193-0.912-2.193-2.192c0-1.279,0.731-2.009,1.644-2.192	c3.471-1.096,7.125-1.462,11.327-1.462c6.943,0,14.25,1.462,19.731,4.567c0.73,0.366,1.278,1.096,1.278,2.193	C49.357,29.961,48.442,30.876,47.165,30.876z" fill="#fff"></path></svg>
                        <p className={styles.heading}>The Prisoner of Beauty OST</p>
                    </div>
                    <div className={styles.loader}>
                        <div className={styles.song}>
                            <p className={styles.name}>Time in a Bottle</p>
                            <p className={styles.artist}>Jim Corce</p>
                        </div>
                        <div className={styles.albumcover}></div>
                        <div className={styles.loading}>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                        </div>
                    </div>
                    <div className={styles.loader}>
                        <div className={styles.song}>
                            <p className={styles.name}>My Way</p>
                            <p className={styles.artist}>Frank Sinatra</p>
                        </div>
                        <div className={styles.albumcover}></div>
                        <div className={styles.play}></div>
                    </div>
                    <div className={styles.loader}>
                        <div className={styles.song}>
                            <p className={styles.name}>My Way</p>
                            <p className={styles.artist}>Frank Sinatra</p>
                        </div>
                        <div className={styles.albumcover}></div>
                        <div className={styles.play}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

