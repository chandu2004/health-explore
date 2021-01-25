import styles from '../styles/NavBar.module.css'

export default function NavBar() {
    return (
        <nav className={`${styles.navColor} navbar navbar-expand-lg navbar-light`}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className={`${styles.brand} navbar-brand`} href="#">HEALTH EXLPORE</a>
            <p className={` ${styles.jo} ${styles.right} my-2 my-sm-0 px-2 py-1 mr-4 d-block d-lg-none`} role='button'>JO<span className={` ${styles.badge}`}>2</span></p>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ml-5">
                    <li className="nav-item ml-4">
                        <a className="nav-link" href="#">PROFILE</a>
                    </li>
                    <li className="nav-item  ml-4">
                        <a className="nav-link" href="#">JOBS</a>
                    </li>
                    <li className="nav-item  ml-4">
                        <a className="nav-link" href="#">PROFESSIONAL NETWORK</a>
                    </li>
                    <li className="nav-item  ml-4">
                        <a className="nav-link" href="#">LOUNGE</a>
                    </li>
                    <li className="nav-item  ml-4">
                        <a className="nav-link" href="#">SALARY</a>
                    </li>
                </ul>
                <form className={`${styles.noWrap} form-inline`}>
                    <button className={`${styles.button} btn btn-outline-success my-2 my-sm-0 mr-4 d-none d-lg-block`} type="submit">CREATE JOB</button>
                    <p className={` ${styles.jo} my-2 my-sm-0 px-2 py-1 mr-4 d-none d-lg-block`} role='button'>JO<span className={` ${styles.badge}`}>2</span></p>
                    <p className={` my-2 my-sm-0 d-none d-lg-block`} role='button'>LOGOUT</p>
                </form>
            </div>
        </nav>
    )
}