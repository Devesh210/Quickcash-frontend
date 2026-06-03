function ListLoader({ isLoading }) {
    return (isLoading ? <div className="loader-container loadingavcds"><div id="loader"></div></div> : null);
}
export default ListLoader;