import { img_300, unavailable } from "../../config/config";
import { Badge } from "@material-ui/core"
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <ContentModal media_type={media_type} id={id} >
      <Badge badgeContent={vote_average} color={vote_average>6? 'primary':'secondary'}/>
      <img
        className="poster"
        alt={title}
        src={poster ? `${img_300}/${poster}` : unavailable}
      />
      <b className="title">{title}</b>
      <div>
        <p className="type"> {media_type === "tv" ? "TV Series" : "Movie"}</p>
        <p className="date">{date}</p>
      </div>
     
    </ContentModal>
  );
};

export default SingleContent;
