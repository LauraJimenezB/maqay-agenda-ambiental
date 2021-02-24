import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Card.css";
import Share from "../Share/Share.js";
import { writeLike } from "../../../controller/likesController";
import iconsPartidos from "../../../utils/iconsPartidos";
import allTagsNameAndNumber from "../../../utils/data/allTagsNameAndNumber.js";

const Card = (props) => {
  const [like, setLike] = useState(false);
  const post = props.post;
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
    const partieObject = props.politicalParties.find((tag) => 
      tag.id===post.tags[1]
    );
    if(partieObject) {
      return partieObject.name.toUpperCase();
    }
  }; 

  //console.log(post.tags)
/* 
  const getPartieName = () => {
    props.
  }
 */
  //console.log(post.tags[1])
  const location = useLocation();
  const currentUrl =
    "http://agendaambiental.info" + location.pathname.replace(/ /g, "%20");

  const shareContent = {
    url: currentUrl,
    content: ` propone: ${stripPTags(
      post.content.rendered
    ).substring(0, 99)}...`,
    img: 'http://www.geneaconsultores.com/wp-content/uploads/2019/04/Participacion-politica-actitud.png',
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
            Propuesta de:
            {post.politicalParties &&
              post.politicalParties.slice(0, 1).map((idPartido) => {
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
            <label className='like-box'><i
              className={like ? "fas fa-heart" : "far fa-heart"}
              onClick={onLikeClick}
            ></i></label>
            {Share(shareContent)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
