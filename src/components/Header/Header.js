import './Header.css';

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      <div>
        Cinema<span className="header__2">Plus</span>
      </div>
      <div></div>
    </span>
  );
};

export default Header;
