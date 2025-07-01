'use client';

const Loading = () => {
  return (
    <div
      id="preloader"
      className="h-screen w-screen fixed top-0 left-0 bg-[#05050F] z-50 overflow-hidden"
    >
      <div className="preloader-container h-screen w-screen fixed top-0 left-0 overflow-hidden">
        <div className="cssload-loader">
          <div className="cssload-inner cssload-one"></div>
          <div className="cssload-inner cssload-two"></div>
          <div className="cssload-inner cssload-three"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
