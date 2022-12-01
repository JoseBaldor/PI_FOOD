export const Loading = () => {
  return (
    <div className="containerLoading">
      <h2 className="largeFont">Wait a few seconds</h2>
      <div className="imgLoadging">
        <img
          src="https://www.twomato.nz/assets/images/loader.gif"
          alt="loading..."
        />
      </div>
    </div>
  );
};

export default Loading;
