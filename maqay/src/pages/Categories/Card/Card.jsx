import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Card.css";
import Share from "../Share/Share.js";
import { writeLike } from "../../../controller/likesController";
import iconsPartidos from "../../../utils/iconsPartidos";
import allTagsNameAndNumber from "../../../utils/data/allTagsNameAndNumber.js";
//import { getAllTagsNameAndNumber } from '../../../controller/postController' 
import media from '../../../utils/data/media';

const Card = ({ post }) => {
  const [like, setLike] = useState(false);
  const [image, setImage ] = useState("");

  /* Numbers set by Wordpress */
  const alertRed = 39;
  const alertGreen = 40;

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
    const partieObject = allTagsNameAndNumber.find((tag) => 
      tag.id===post.tags[1]
    );
    if(partieObject) {
      return partieObject.name.toUpperCase();
    }
  }; 

  
  //obtener string del link de la imagen o "No hay imagen" en el state "image"
useEffect(()=>{
  if(post.featured_media===0){
    setImage('No hay imagen')
  } else {
      const linkImage = media.filter(object=>object.id===post.featured_media);
      setImage(linkImage[0].source_url)
  }
}, [post])


  //Aquí se llama al state "image"
  const location = useLocation();
  const currentUrl =
    "http://agendaambiental.info" + location.pathname.replace(/ /g, "%20");
  const shareContent = {
    url: currentUrl,
    content: `${getPartieName()} propone: ${stripPTags(
      post.excerpt.rendered
    ).substring(0, 99)}...`,
    img: `${image}`,
  };


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
    /* container proposals es "container-proposal" ahora container-card */
    <div className='container-proposal'>
      {/* content sera container header */}
      <div className={alertColor(post.tags)}>
        <div className='container-proposal-title'>{post.title.rendered}</div>

        <div className='container-proposal-content'>{`${stripPTags(
          post.excerpt.rendered.replace(
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
