'use client'
import SearchBar from '/Users/anna/my-drama-project/src/components/SearchBar.tsx';
import styles from '../styles/header.module.css'

export default function Header() {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src="/logo3.png" />
            <div className={styles.search}>
                <SearchBar></SearchBar>
            </div>
        </div>
    )
}