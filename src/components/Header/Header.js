import { Logout } from '@mui/icons-material';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import './Header.css';

const Header = () => {
  const { logout } = useFirebaseAuth();
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      <div onClick={() => logout()}>
        Cinema<span className="header__2">Plus</span>
      </div>
      <div></div>
    </span>
  );
};

export default Header;
