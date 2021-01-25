import styles from '../styles/Content.module.css'

export default function Footer() {
    return (
        <div className={`${styles.content} row  mt-4 mb-0 mx-0 m-sm-4`}>
            <div className={`col-12 col-sm-6`}>
                <h5 className="pt-4">About Us</h5>
                <p>We are a team of doctors, nurses, technologists and executives dedicated to help nurses find jobs that they love.</p>
                <p>All copyrights reserved &copy; 2020 - Health Explore</p>
            </div>
            <div className={`${styles.content} col-12 col-sm-3`}>
                <h5 className="pt-4">Sitemap</h5>
                <p>Nurses</p>
                <p>Employers</p>
                <p>Social Networking</p>
                <p>Jobs</p>
            </div>
            <div className={`${styles.content} col-12 col-sm-3`}>
                <h5 className="pt-4">Privacy</h5>
                <p>Terms of use</p>
                <p>Privacy Policy</p>
                <p>Cookie Policy</p>
            </div>
        </div>
    )
}