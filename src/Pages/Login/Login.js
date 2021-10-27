import { useEffect, useState } from 'react';
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom';
// import ErrorDialog from '../components/ErrorDialog';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

import './Login.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { green } from '@material-ui/core/colors';

import {
  TextField,
  Grid,
  createMuiTheme,
  ThemeProvider,
  withStyles,
  Link,
} from '@material-ui/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../constants/actionTypes';
import LoadingBackdrop from '../../components/LoadingBackdrop/LoadingBackdrop';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        color: 'white',
      },

      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

export default function Login() {
  const {
    signInInWithEmailAndPassword,
    authenticated,
    signUpWithEmailAndPassword,
    user,
  } = useFirebaseAuth();
  const [email, setEmail] = useState(null);
  const [formType, setFormType] = useState(false);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [wishlists, setWishlists] = useState([]);
  const [name, setName] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const signupUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signUpWithEmailAndPassword(email, password);
      console.log('Response>>', response);
      try {
        const docRef = await setDoc(doc(db, 'users', response.user.uid), {
          name: name,
        });

        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } catch (err) {
      console.log('You have got an error: ', err.code);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage(
          'Sorry, This Email is already in use with another account.'
        );
        setOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signInInWithEmailAndPassword(email, password);
      const docRef = doc(db, 'users', response.user.uid);
      const docSnap = await getDoc(docRef);
      console.log('NAME OF LOGGED IN USER IS>>>', docSnap.data().name);
      setName(docSnap.data().name);

      const q = query(
        collection(db, 'watchlists'),
        where('createdById', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      // setWishlists(
      //   querySnapshot.docs.map((doc) => ({ name: doc.data().name, id: doc.id }))
      // );
      const watchlists = querySnapshot.docs.map((doc) => ({
        name: doc.data().name,
        id: doc.id,
      }));
      dispatch({
        type: LOGIN,
        data: { user, watchlists, name: docSnap.data().name },
      });
      history.push('/movies');
      // history.push('/mywatchlists');
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        setErrorMessage('You have entered wrong password. Please try again!');
        setOpen(true);
      } else if (err.code === 'auth/user-not-found') {
        setErrorMessage(
          'The email you have provided is not registered yet. Create a new account and login. Thanks!'
        );
        setOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCloseErrorDialog = () => {
    setErrorMessage('');
  };

  if (authenticated) {
  }

  const auth = getAuth();

  const toggleForm = () => {
    setFormType(!formType);
  };

  const getWishlists = async (user) => {
    const q = query(
      collection(db, 'wishlists'),
      where('createdById', '==', user.uid)
    );

    const querySnapshot = await getDocs(q);
    setWishlists(
      querySnapshot.docs.map((doc) => ({ name: doc.data().name, id: doc.id }))
    );
  };

  return (
    <div className="login">
      <LoadingBackdrop loading={loading} />
      {/* <Link to="/">
        <img src={logo} alt="" height="300px" />
      </Link> */}
      {formType ? (
        <div className="login__container">
          <h1>Welcome Back to CinemaPlus</h1>
          <form onSubmit={(e) => loginUser(e)}>
            <Grid container direction="column">
              <CssTextField
                variant="outlined"
                label="Email"
                required
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
              <br />

              <CssTextField
                type="password"
                variant="outlined"
                label="Password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <br />

              <Button variant="contained" type="submit">
                Login
              </Button>
              <div className="change-form-link">
                Don't have an account? <span onClick={toggleForm}>Sign Up</span>
              </div>
            </Grid>
            <Divider
              style={{
                marginTop: '10px',
                borderColor: 'grey',
                border: '0.5px solid grey',
                backgroundColor: 'grey',
              }}
            />
            <div className="change-form-link">
              Go back to{' '}
              <Link
                to="/"
                underline="none"
                style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#21e18c',
                }}
              >
                <span>Home</span>
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="login__container">
          <h1>Welcome to CinemaPlus</h1>
          <form onSubmit={(e) => signupUser(e)}>
            <Grid container direction="column">
              <CssTextField
                variant="outlined"
                label="Full Name"
                required
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              <br />

              <CssTextField
                variant="outlined"
                label="Email"
                required
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
              <br />

              <CssTextField
                type="password"
                variant="outlined"
                label="Password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <br />

              <Button variant="contained" type="submit">
                Sign Up
              </Button>

              <div className="change-form-link">
                Already have an account? <span onClick={toggleForm}>Login</span>
              </div>
            </Grid>
          </form>
          <Divider
            style={{
              marginTop: '10px',
              borderColor: 'grey',
              border: '0.5px solid grey',
              backgroundColor: 'grey',
            }}
          />
          <div className="change-form-link">
            Go back to{' '}
            <Link
              to="/"
              underline="none"
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#21e18c',
              }}
            >
              <span>Home</span>
            </Link>
          </div>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Oops! Something went wrong.'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
