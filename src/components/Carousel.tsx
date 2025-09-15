'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DramaCard from '/Users/anna/my-drama-project/src/components/home/DramaCard.tsx'
import styles from '/Users/anna/my-drama-project/src/styles/carousel.module.css'

const dramas = [
    { id: 1, title: 'The Untamed', poster: 'https://pic4.iqiyipic.com/image/20250806/8a/f6/a_100609808_m_601_en_1080_608.jpg', year: 2019, episodes: 50, status: 'Completed', genres: ['Fantasy', 'Drama', 'Friendship'], rank: 1 },
    { id: 2, title: 'Love O2O', poster: 'https://0.soompi.io/wp-content/uploads/2019/03/03225811/love-o2o-zheng-shuang-yang-yang.jpg', year: 2016, episodes: 30, status: 'Completed', genres: ['Romance', 'Comedy', 'Youth'], rank: 2 },
    { id: 3, title: 'Nirvana in Fire', poster: 'https://1.vikiplatform.com/c/32827c/c6e81adaad.jpg?x=b&a=0x0', year: 2015, episodes: 54, status: 'Completed', genres: ['Historical', 'Strategy', 'Action'], rank: 3 },
    { id: 4, title: 'Hidden Love', poster: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2024/09/duan-jiaxu-chen-zheyuan-holding-sang-zhi-zhao-lusi-in-hidden-love.jpg', year: 2023, episodes: 25, status: 'Completed', genres: ['Romance', 'Youth', 'Slice of Life'], rank: 4 },
    { id: 5, title: 'Meteor Garden', poster: 'https://6.soompi.io/wp-content/uploads/image/20250610221421_the-prisoner-of-beauty-cover-liu-yu-ning-song-zu-er-1.png?s=900x600&e=t', year: 2018, episodes: 49, status: 'Completed', genres: ['Romance', 'Youth', 'School'], rank: 5 },
    { id: 6, title: 'Eternal Love', poster: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjR3tdZVC3pYoeESR7XacNbKmnIxdtoa6Vga4Pz7DZHjzNJW5btnBgiKDIqWPcFf2TTkjBTgKnsH3aXHtz28_spt5K0m7OlaghWbx0KNi4pe9l5cYlrA-tFc2-vM6-LNmJd7YZIRgi-HaI/s640/Three+Lives+Three+Worlds+5.png', year: 2017, episodes: 58, status: 'Completed', genres: ['Fantasy', 'Romance', 'Historical'], rank: 6 },
    { id: 7, title: 'Ashes of Love', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTvQk5FVTyw8XHDigRwjBeSFy1DP9g733xRQ&s', year: 2018, episodes: 63, status: 'Completed', genres: ['Fantasy', 'Romance', 'Drama'], rank: 7 },
    { id: 8, title: 'You Are My Glory', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJGgpMzKaAmsn9TVWhkonqndCuxlLTM3rgw&s', year: 2021, episodes: 32, status: 'Completed', genres: ['Romance', 'E-sports', 'Youth'], rank: 8 },
    { id: 9, title: 'Go Ahead', poster: 'https://1.vikiplatform.com/c/36770c/6b0872461a.jpg?x=b&a=0x0', year: 2020, episodes: 40, status: 'Completed', genres: ['Family', 'Drama', 'Youth'], rank: 9 },
    { id: 10, title: 'Put Your Head on My Shoulder', poster: 'https://1.vikiplatform.com/c/36780c/d3c9f19da3.jpg?x=b&a=0x0', year: 2019, episodes: 24, status: 'Completed', genres: ['Romance', 'Comedy', 'Youth'], rank: 10 },
    { id: 11, title: 'Legend of Fuyao', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVYpUdLiV0GV1kxabrMtR8CjscHK7raiIp_g&shttps://pic2.iqiyipic.com/image/20230316/c0/88/a_100115143_m_601_en_1080_608.jpg', year: 2018, episodes: 66, status: 'Completed', genres: ['Historical', 'Fantasy', 'Romance'], rank: 11 },
    { id: 12, title: 'Love Between Fairy and Devil', poster: 'https://pic4.iqiyipic.com/image/20250806/8a/f6/a_100609808_m_601_en_1080_608.jpg', year: 2022, episodes: 36, status: 'Completed', genres: ['Fantasy', 'Romance', 'Xianxia'], rank: 12 },
]

export default function Carousel() {
    const [page, setPage] = useState(0)
    const itemsPerPage = 4
    const cardWidthRem = 18 // fixed card width
    const gapRem = 1 // gap between cards
    const maxPage = Math.ceil(dramas.length / itemsPerPage)

    const paginate = (direction: number) => {
        // loop around if reaching start/end
        setPage((prev) => (prev + direction + maxPage) % maxPage)
    }

    return (
        <div className={styles.carousel}>

            {page > 0 && (
                <button
                    onClick={() => paginate(-1)}
                    className={`${styles.arrowBtn} ${styles.leftArrow}`}
                >
                    &#10094;
                </button>
            )}

            <button onClick={() => paginate(1)} className={`${styles.arrowBtn} ${styles.rightArrow}`}>&#10095;</button>

            {/* Cards */}
            <div className={styles.cardsWrapper}>
                <motion.div
                    className={styles.cardsTrack}
                    animate={{ x: `-${page * itemsPerPage * (cardWidthRem + gapRem) +4}rem` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                >
                    {dramas.map((drama) => (
                        <div key={drama.id} className={styles.cardSlot} style={{ width: `${cardWidthRem}rem` }}>
                            <DramaCard {...drama} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}