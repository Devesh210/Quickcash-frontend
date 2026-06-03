// function Loader({ isLoading }) {
//     return (isLoading ? <div className="loader-container"><div id="loader"></div></div> : null);
// }
// export default Loader;

function Loader({ isLoading }) {
    return (isLoading ?
        <div className="loadingavcds">
            <div className="loader-container">
                <div id="loader"></div>
            </div>
        </div> : null);
}
export default Loader;