export default function VideoDeepGesture() {
  return (
    <iframe
      className="w-full mx-auto"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/eZghfNGmZn8?si=9l-jilNvdi-JPFwT"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
