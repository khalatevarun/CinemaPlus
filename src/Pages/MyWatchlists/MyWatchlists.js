import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import WatchlistTabs from '../../components/WatchlistTabs/WatchlistTabs';

const MyWatchlists = () => {
  const [selectedWatchlist, setSelectedWatchlists] = useState([]);
  const [watchlistData, setWatchlistData] = useState([]);

  const getWatchlistData = () => {};
  const shareWatchlist = () => {
    const sharelink = `cinemaplus.netlify.com/watchlist:${selectedWatchlist}`;
  };
  const editWatchlist = () => {};
  const removeMovieFromWatchlist = () => {};

  useEffect(() => {
    getWatchlistData();
  }, [selectedWatchlist]);

  return <WatchlistTabs />;
};

export default MyWatchlists;
