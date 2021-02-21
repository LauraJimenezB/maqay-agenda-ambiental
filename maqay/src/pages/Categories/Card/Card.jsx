import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Card.css";
import Share from "../Share/Share.js";
import { writeLike } from "../../../controller/likesController";
import iconsPartidos from "../../../utils/iconsPartidos";
import allTagsNameAndNumber from "../../../utils/data/allTagsNameAndNumber.js";

const Card = ({ post }) => {
  const [like, setLike] = useState(false);

  /* Numbers set by Wordpress */
  const alertRed = 39;
  const alertGreen = 40;

  /* Change the className according to the ALERT */

  const alertColor = (alertTagsArray) => {
    if (alertTagsArray.includes(alertRed)) {
      return "content alert-red";
    } else if (alertTagsArray.includes(alertGreen)) {
      return "content alert-green";
    } else {
      return "content no-alert";
    }
  };

  const stripPTags = (content) => content.replace(/<\/?p[^>]*>/g, "");

  const getPartieName = () => {
    const partieObject = allTagsNameAndNumber.find((tag) => {
      return (tag.id = post.politicalParties);
    });
    return partieObject.name.toUpperCase();
  };

  /* const location = useLocation(); */
  /* "https://agendaambiental.info" + location.pathname.replace(/ /g, "%20"); */
  const currentUrl = "https://agendaambiental.info";
  const shareContent = {
    url: currentUrl,
    content: `${getPartieName()} propone: ${stripPTags(
      post.content.rendered
    ).substring(0, 99)}...`,
  };

  /* ***Handle Like Clicks*** */

  useEffect(() => {
    if (localStorage.getItem(post.id)) {
      setLike(localStorage.getItem(post.id) === "true" ? true : false);
    }
  }, [post.id]);

  const onLikeClick = () => {
    const currentLike = !like;
    setLike(currentLike);
    localStorage.setItem(post.id, currentLike);
    writeLike(currentLike, post.id, post.title.rendered);
  };

  return (
    <div className='container-proposal'>
      <div className={alertColor(post.tags)}>
        <div className='container-proposal-title'>{post.title.rendered}</div>

        <div className='container-proposal-content'>{`${stripPTags(
          post.content.rendered.replace(
            /^(\s*<br( \/)?>)*|(<br( \/)?>\s*)*$/gm,
            " "
          )
        )}`}</div>

        <div className='container-proposal-footer'>
          <div className='proposal-footer-logo'>
            Propuestas de:
            {post.politicalParties &&
              post.politicalParties.map((idPartido) => {
                return (
                  <img
                    src={`${iconsPartidos[idPartido]}`}
                    alt='icon'
                    width='50px'
                    className='partie-logo'
                    key={Math.random()}
                  />
                );
              })}
          </div>

          <div className='social-media-buttons'>
            <i
              className={like ? "fas fa-heart" : "far fa-heart"}
              onClick={onLikeClick}
            ></i>
            <label className='like-box'></label>
            {Share(shareContent)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
