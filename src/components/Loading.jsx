import "../styles/Loading.css";

const Loading = () => {
    return (
        <div className="">
            <div className="loader-box">
                <img 
                    src="/loading.gif"
                    alt="Loading..."
                    className="loader-gif"
                />
                <p className="loader-text">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;
