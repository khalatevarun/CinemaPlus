import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#1a2634',
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState();
  const history = useHistory();

  useEffect(() => {
    if (value === 0) history.push('/');
    if (value === 1) history.push('/search');
    if (value === 2) history.push('./mywatchlists');
    if (value === 3) history.push('./movies');
    if (value === 4) history.push('/series');
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: '#21e18c' }}
        // label="Trending"
        value={0}
        icon={<WhatshotIcon />}
      />

      <BottomNavigationAction
        value={1}
        style={{ color: '#21e18c' }}
        // label="Search"
        icon={<SearchIcon />}
      />

      <BottomNavigationAction
        style={{ color: '#21e18c' }}
        // label="Search"
        value={2}
        icon={<FavoriteIcon />}
      />

      <BottomNavigationAction
        style={{ color: '#21e18c' }}
        // label="Movies"
        value={3}
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        value={4}
        style={{ color: '#21e18c' }}
        // label="TV Series"
        icon={<TvIcon />}
      />
    </BottomNavigation>
  );
}
