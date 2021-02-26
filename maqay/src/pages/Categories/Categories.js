import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Categories.css";
import Card from "./Card/Card";
import Footer from "../commons/Footer/Footer";
import ButtonFilterNav from "./ButtonFilterNav/ButtonFilterNav.jsx";
//import { getTagsByGroupName } from "../../controller/postController";
import MetaDecorator from "./MetaDecorator/MetaDecorator";
//import allTagsNameAndNumber from "../../utils/data/allTagsNameAndNumber.js";
//import tagsByGroupName from "../../utils/data/tagsByGroupName.js";
import CategoryDescription from "./CategoryDescription/CategoryDescription.js";
import arrowDown from '../../assets/img/arrow-down.svg'
//import {SimpleSlider} from './slider'
import { getAllPosts } from '../../controller/postController'
import { getAllTagsNameAndNumber } from '../../controller/postController'

const POST_GROUP_TYPES = {
  partido: 1,
  tema_ambiente: 2
}

const POST_GROUP_TYPES_PARAMS = {
  partido: "Partidos políticos",
  tema_ambiente: "Tema ambiental"
}

const tagCategorias = {
  red: 39,
  yellow: 41,
  green:40
 }

const Categories = () => {
  /* posts to render */
  const [ posts, setPosts ] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [navBarTags, setNavBarTags] = useState([]);
  const [navShow, setNavShow] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');


  const location = useLocation();
  const currentUrl =
    "https://maqay.netlify.app" + location.pathname.replace(/ /g, "-");

  /* Pass URL Params to the States */
  const { category, subcategory } = useParams();
  const [ selectedSubcategory ] = useState(subcategory);
  const [ mainCategory ] = useState(category);
  const [allTheTags, setAllTheTags] = useState([]);

  // useEffect(()=>{
  //   setSelectedSubcategory(subcategory)
  // }, [subcategory])
  
  useEffect(() => {
    const apiCalls = [getAllTagsNameAndNumber(), getAllPosts()];
    Promise.all(apiCalls).then(([ tags, posts ]) => {
      setAllTheTags(tags);
      setPosts(posts);
    });
  }, []);
  
  /* const environmentThemes = allTheTags.filter(tags=> tags.groupName === POST_GROUP_TYPES.tema_ambiente); 
  const politicalParties =  allTheTags.filter(tags=> tags.groupName === POST_GROUP_TYPES.partido); 
 */

  useEffect(() => {
    if (allTheTags.length === 0) { // make sure we have the tags from the api
      return;
    }
    if ( mainCategory === POST_GROUP_TYPES_PARAMS.tema_ambiente ) {
      const environmentThemes = allTheTags.filter(tags=> tags.groupName === POST_GROUP_TYPES.tema_ambiente);
      setNavBarTags(environmentThemes);
    } else {
      const politicalParties =  allTheTags.filter(tags=> tags.groupName === POST_GROUP_TYPES.partido); 
      setNavBarTags(politicalParties);
    }
  }, [ mainCategory, allTheTags ]); 


  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const filteredPosts = posts.filter((post) => {
        return post.content.rendered.includes(searchQuery);
    });
    setFilteredPosts(filteredPosts); 
  }, [searchQuery, posts]);  
    
  /* filtered posts */
  console.log('categorySelected OUTSIDE',selectedSubcategory);

  useEffect(() => {
    if (posts.length === 0) { // no hay posts todavia
      return;
    }
    let filteredPosts = [];
    console.log('categorySelected INSIDE', selectedSubcategory);

    const tagSubcategory = allTheTags.find((tag) => {
      return tag.name === selectedSubcategory
    });
    console.log(selectedSubcategory);

    if (tagSubcategory) {
      filteredPosts = posts.filter((post) => post.tags.includes(tagSubcategory.id));
    }
    setFilteredPosts(filteredPosts);
  }, [selectedSubcategory, posts, allTheTags]);

  const arrayByColor = (numOfPosts, color) => {
    const posts = numOfPosts.filter((post)=>{
      return post.tags.includes(color);
    })
    return posts
  }

  const navClick = () => {
    setNavShow((navShow === 0) ? 1 : 0);
  }

  const More = () =>{
    if (mainCategory === POST_GROUP_TYPES_PARAMS.tema_ambiente) {
      return <span><span className='hiddenMore'>Tema</span><span className='more'>Cambiar de tema ambiental</span></span>
    } else {
      return <span><span className='hiddenMore'>Partido</span><span className='more'>Cambiar de partido político</span></span>
    }
  } 

  return (
    <div>
      {selectedSubcategory.length > 0 && (
        <MetaDecorator
          title={`Agenda Ambiental - ${selectedSubcategory}`}
          description={currentUrl}
          imgURL={`/img/${selectedSubcategory.replace(/<\/?p[^>]*>/g, "")}.png`}
        />
      )}
      <header>
        {searchQuery.length > 0 ? <span>Resultados para "{searchQuery}"</span> : <span>{selectedSubcategory}</span>}
      </header>
      <main>
      <div className='navContainer'>
        <nav>
          <div className='nav-btn-container'>
            <button
              className='btn-back'
              onClick={() => {
                window.location = "/";
              }}
            >
              <i className='fas fa-chevron-left'></i><span>REGRESAR</span>
            </button>
            <div className='nav-right-container'>
              <input
                type="search"
                placeholder="Buscar propuesta"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <button className='btn-list' onClick={() => navClick()}><More/><img src={arrowDown} className='arrow-down' alt='arrowDown'/></button>
            </div>
          </div>
          <div className={navShow === 1 ? 'list-nav' : 'list-nav-hidden'}>
          {navBarTags.map((tag) => {
            return (
              <ButtonFilterNav
                key={tag.id}
                tagByTopic={tag}
                path={`/propuestas/${mainCategory}/${tag.name}`}
              />
            );
          })}
          </div>
        </nav>
        </div> 
        <section className='view-categories'>
          <span className='text-bold'>
            HEMOS IDENTIFICADO{" "}
            <span className='highlighted'>
              {/* searchField.length>0 ? filteredArray.length :  */ filteredPosts.length }
            </span>
            {" "} PROPUESTAS
          </span>
           {/*  <div className='sliderContainer'>
           {mainCategory === "Tema ambiental" &&
              categorySelected.length > 0 && (
                <SimpleSlider
                  category={categorySelected.replace(/ /g, "")}
                />
              )}
          </div>  */}
         
         {searchQuery.length > 0 ? '' : <div className='main-text'>
            { mainCategory === POST_GROUP_TYPES_PARAMS.tema_ambiente &&
              selectedSubcategory.length > 0 && (
                <CategoryDescription
                  category={selectedSubcategory.replace(/ /g, "")}
                />
              )}
          </div>}
          <div className='leyenda'>
            <div className='flexLeyenda'><div className='leyenda-highlited alert-green'><span>{/* searchField.length>0 ? arrayByColor(filteredArray, tagCategorias.green).length:  */arrayByColor(filteredPosts, tagCategorias.green).length}</span></div><span className='leyenda-text'>Propuestas alineadas con los 8 temas ambientales priorizados para el país</span></div>
            <div className='flexLeyenda'><div className='leyenda-highlited no-alert'><span>{/* searchField.length>0 ? arrayByColor(filteredArray, tagCategorias.yellow).length:  */arrayByColor(filteredPosts, tagCategorias.yellow).length}</span></div><span className='leyenda-text'>Propuestas que no abordan los temas priorizados</span></div>
            <div className='flexLeyenda'><div className='leyenda-highlited alert-red'><span>{/* searchField.length>0 ? arrayByColor(filteredArray, tagCategorias.red).length:  */arrayByColor(filteredPosts, tagCategorias.red).length}</span></div><span className='leyenda-text'>Propuestas que buscan disminuir estándares ambientales, eliminar instituciones 
              ambientales o derechos.</span></div> 
          </div> 
          <div className='alerts-guide'> </div>
          {/* searchField.length>0 ? <div className='categories-cards-container'>
            {filteredArray.map((post) => {
              return <Card key={post.id} post={post} />;
            })}
          </div> : */
          <div className='categories-cards-container'>
            {/* Recibe los posts filtrados según el tema seleccionado */}
            {filteredPosts.map((post) => {
              return <Card key={post.id} post={post} politicalParties={navBarTags} /* tagNameHandler={tagName()} *//>;
            })}
          </div>
          }
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Categories;
