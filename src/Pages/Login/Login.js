import { useState } from 'react';
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
import { TextField, Grid } from '@material-ui/core';
import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Login() {
  const {
    signInInWithEmailAndPassword,
    authenticated,
    signUpWithEmailAndPassword,
  } = useFirebaseAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState(null);
  const history = useHistory();

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

      history.push('/movies');
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
      await signInInWithEmailAndPassword(email, password);
      history.push('/movies');
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
    return <Redirect to="/movies" />;
  }

  return (
    <div className="login">
      {/* <Link to="/">
        <img src={logo} alt="" height="300px" />
      </Link> */}
      <div className="login__container">
        <h1>Sign-in</h1>
        <form onSubmit={loginUser}>
          <Grid container direction="column">
            <TextField
              variant="outlined"
              label="Full Name"
              required
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <br />

            <TextField
              variant="outlined"
              label="Email"
              required
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <br />

            <TextField
              type="password"
              variant="outlined"
              label="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <br />

            <Button variant="contained" type="submit">
              Sign In
            </Button>

            <button className="login_registerButton" onClick={signupUser}>
              Create your account
            </button>
          </Grid>
        </form>
      </div>
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
