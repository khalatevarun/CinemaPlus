import { img_300, unavailable } from '../../config/config';
import { Badge } from '@material-ui/core';
import './SingleContent.css';
import ContentModal from '../ContentModal/ContentModal';
import {
  addDoc,
  collection,
  doc,
  arrayUnion,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../../firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  customRef,
}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.user.uid);
  const userName = useSelector((state) => state.auth.name);

  console.log('ISLLOG ED IN>>>>', isLoggedIn);

  const [openWatchlistOptions, setOpenWatchlistOptions] = useState(false);

  const [constWatchlist, setConstWatchlist] = useState(null);

  const [loading, setLoading] = useState(false);

  const addNewWatchlist = async (newWatchListName) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'watchlists'), {
        createdById: userId,
        createdByName: userName,
        name: newWatchListName,
        list: [
          {
            id: id,
            poster: poster,
            title: title,
            date: date,
            media_type: media_type,
            vote_average: vote_average,
          },
        ],
      });
      console.log('Document written with ID: ', docRef.id);
      setConstWatchlist(docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };

  const addMovieToWatchlist = async (id) => {
    setLoading(true);
    console.log('Doc id>>', constWatchlist);

    try {
      const watchlistRef = doc(db, 'watchlists', id);

      await updateDoc(watchlistRef, {
        list: arrayUnion({
          id: id,
          poster: poster,
          title: title,
          date: date,
          media_type: media_type,
          vote_average: vote_average,
        }),
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWatchlist = () => {
    if (!isLoggedIn) {
      // prompt user to login first
      return;
    }

    setOpenWatchlistOptions(!openWatchlistOptions);
  };

  return (
    <ContentModal
      media_type={media_type}
      id={id}
      customRef={customRef}
      handleAddWatchlist={handleAddWatchlist}
      openWatchlistOptions={openWatchlistOptions}
      addMovieToWatchlist={addMovieToWatchlist}
      addNewWatchlist={addNewWatchlist}
    >
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
