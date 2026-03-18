import { Link } from "react-router-dom";

function Logo() {
  return (
    <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
      <Link to="/">
        <img 
          src={`${import.meta.env.BASE_URL}final.png`}
          alt="Logo" 
          style={{ width: "50px", height: "50px", cursor: "pointer" }} 
        />
      </Link>
    </div>
  );
}

export default Logo;