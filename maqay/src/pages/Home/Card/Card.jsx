import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ post, path }) => {
  const background = `/img/${post.name.replace(/ /g, "")}.png`;


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
