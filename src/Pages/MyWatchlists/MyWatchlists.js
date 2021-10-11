import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import WatchlistTabs from '../../components/WatchlistTabs/WatchlistTabs';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import SingleContent from '../../components/SingleContent/SingleContent';
import './MyWatchlist.css';
const MyWatchlists = () => {
  const watchlists = useSelector((state) => state.auth.watchlists);

  const [activeWatchlist, setActiveWatchlist] = useState(0);

  const [watchlistData, setWatchlistData] = useState([]);

  console.log('WATCHLISTS>>>', watchlists);

  const getWatchlistData = async () => {
    const docRef = doc(db, 'watchlists', watchlists[activeWatchlist].id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data().list);
      setWatchlistData(docSnap.data().list);
    } else {
      // dodata.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  console.log('CURRENT WATCHLIST DATA IS>>>>>', watchlistData);
  const shareWatchlist = () => {
    const sharelink = `cinemaplus.netlify.com/watchlist:${activeWatchlist}`;
  };
  const editWatchlist = () => {};
  const removeMovieFromWatchlist = () => {};

  useEffect(() => {
    getWatchlistData();
  }, [activeWatchlist]);

  return (
    <div>
      <WatchlistTabs
        activeWatchlist={activeWatchlist}
        setActiveWatchlist={setActiveWatchlist}
        watchlists={watchlists}
      />
      <div class="mywatchlists">
        {watchlistData &&
          watchlistData.map((data) => (
            <SingleContent
              key={data.id}
              id={data.id}
              poster={data.poster}
              title={data.title}
              date={data.date}
              media_type={data.media_type}
              vote_average={data.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default MyWatchlists;
