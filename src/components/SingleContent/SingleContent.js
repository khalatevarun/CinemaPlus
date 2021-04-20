import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";

const SingleContent = ({ id, poster, title, date, vote_average }) => {
  return (
    <div className="media">
      <img
        className="poster"
        alt={title}
        src={poster ? `${img_300}/${poster}` : unavailable}
      />
      <b className="title">{title}</b>
      <span className="subTitle">{date}</span>
    </div>
  );
};

export default SingleContent;
