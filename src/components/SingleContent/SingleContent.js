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
  arrayRemove,
} from '@firebase/firestore';
import { db } from '../../firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { ADD_WATCHLIST } from '../../constants/actionTypes';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  customRef,
  remove,
  removeWatchlistId,
  getWatchlistData,
}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.user.uid);
  const userName = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();

  console.log('ISLLOG ED IN>>>>', isLoggedIn);

  const [openWatchlistOptions, setOpenWatchlistOptions] = useState(false);

  const [visibleContentModal, setVisibleContentModal] = useState(false);

  const [constWatchlist, setConstWatchlist] = useState(null);

  const [loading, setLoading] = useState(false);

  const toggleContentModal = () => {
    setVisibleContentModal(!visibleContentModal);
  };

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
      dispatch({
        type: ADD_WATCHLIST,
        data: { name: newWatchListName, id: docRef.id },
      });
      //TODO: write a function to add the new watchlist created to the global state
      setConstWatchlist(docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };

  const addMovieToWatchlist = async (watchlistId) => {
    setLoading(true);
    const watchlistRef = doc(db, 'watchlists', watchlistId);

    try {
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

  const removeMovieFromWatchlist = async (watchlistId) => {
    setLoading(true);
    const watchlistRef = doc(db, 'watchlists', watchlistId);

    try {
      await updateDoc(watchlistRef, {
        list: arrayRemove({
          id: id,
          poster: poster,
          title: title,
          date: date,
          media_type: media_type,
          vote_average: vote_average,
        }),
      });
      toggleContentModal();
      getWatchlistData(watchlistId);
    } catch (e) {
      console.error('Error removing document: ', e);
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
      removeMovieFromWatchlist={removeMovieFromWatchlist}
      addNewWatchlist={addNewWatchlist}
      remove={remove}
      removeWatchlistId={removeWatchlistId}
      visibleContentModal={visibleContentModal}
      toggleContentModal={toggleContentModal}
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
