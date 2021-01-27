import ContentLoader from "react-content-loader";

export default function Loader() {
    return (
        <ContentLoader  height={68}  uniqueKey="loader" className="col-12 pl-2">
            <rect x="0" y="0" rx="5" ry="5" width="40" height="40" />
            <rect x="80" y="3" rx="4" ry="4" width="300" height="13" />
            <rect x="80" y="25" rx="3" ry="3" width="200" height="10" />
        </ContentLoader>
    )
}