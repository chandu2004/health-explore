import styles from '../styles/SearchBar.module.css'

export default function Search() {
    return (
        <div className={`${styles.search} row my-1 mx-0 m-sm-4 p-2`}>
            <div className="input-group">
            <span className="input-group-append">
                <div className="input-group-text bg-transparent border-0"><i className="fa fa-search"></i></div>
            </span>
            <input className={`${styles.input} form-control border-0`} type="search" placeholder="Search for any job, title, keyword or company" id="example-search-input" />
        </div>
        </div>
    )
}