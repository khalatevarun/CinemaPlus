import { img_300, unavailable } from '../../config/config';
import { Badge } from '@material-ui/core';
import './SingleContent.css';
import ContentModal from '../ContentModal/ContentModal';

import AddCircleIcon from '@material-ui/icons/AddCircle';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  customRef,
}) => {
  return (
    <ContentModal media_type={media_type} id={id} customRef={customRef}>
      <Badge
        className="custom-badge"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        badgeContent={vote_average}
      />

      <img
        className="poster"
        alt={title}
        src={poster ? `${img_300}/${poster}` : unavailable}
      />
      <div className="title">{title}</div>
      <div>
        <div className="type">
          {' '}
          {media_type === 'tv' ? 'TV Series' : 'Movie'}
        </div>
        <div className="date">{date}</div>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
