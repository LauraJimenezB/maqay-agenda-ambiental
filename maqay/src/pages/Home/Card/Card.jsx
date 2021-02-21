import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ post, categorySelected, path }) => {
  const nameFile = post.name.replace(/ /g, "");
  const nameSinTilde = nameFile
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const background = `/img/${nameSinTilde}.png`;

  return (
    <div className='card-home'>
      <Link to={path} className='card-home-link'>
        <img
          className='card-home-logo'
          src={background}
          alt={`${post.name.replace(/ /g, "")}`}
        ></img>
        <div className='sub-card-home'>
          <div className='card-footer'>
            <p>{post.name}</p>
            {/* {categorySelected === "Tema ambiental" && <p>Propuestas de:</p>} */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
