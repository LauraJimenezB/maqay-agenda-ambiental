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

const tagCategorias = {
  red: 39,
  yellow: 41,
  green:40
 }

const Categories = () => {
  /* posts to render */
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [navBarTags, setNavBarTags] = useState([]);
  /* set category debe ir dentro de la fx que saca las cosas del windowlocation */
  //const [categorySelectedTags, setCategorySelectedTags] = useState([]);
  const [navShow, setNavShow] = useState(0);
  const [searchField, setSearchField] = useState('');


  const location = useLocation();
  const currentUrl =
    "https://maqay.netlify.app" + location.pathname.replace(/ /g, "-");

  /* Pass URL Params to the States */
  const { category, subcategory } = useParams();
  const [categorySelected , setCategorySelected] = useState(subcategory);
  const [mainCategory] = useState(category);
  const [allTheTags, setAllTheTags] = useState([])

  
  useEffect(() => {
    getAllTagsNameAndNumber().then(res=>setAllTheTags(res));
  }, []);
  
  /* const environmentThemes = allTheTags.filter(tags=> tags.groupName === POST_GROUP_TYPES.tema_ambiente); 
  const politicalParties =  allTheTags.filter(tags=> tags.groupName === POST_GROUP_TYPES.partido); 
 */

  useEffect(() => {
      if(mainCategory==='Tema ambiental') {
        const environmentThemes = allTheTags.filter(tags=> tags.groupName === POST_GROUP_TYPES.tema_ambiente);
       return setNavBarTags(environmentThemes);
      } else {
        const politicalParties =  allTheTags.filter(tags=> tags.groupName === POST_GROUP_TYPES.partido); 
        return setNavBarTags (politicalParties);
      }
  }, [mainCategory, allTheTags]); 
   
  //setNavBarTags(array)

  /* filtered posts */
  console.log('categorySelectedOUTSIDE',categorySelected)
  useEffect(() => {
    getAllPosts().then(postsJson => {
      let filteredPosts=[];
      if (searchField.length>0){
        filteredPosts =  postsJson.filter((post) => {
          return post.content.rendered.includes(searchField);
        });
      } else {
        console.log('categorySelectedINSIDE',categorySelected)
        const objectSelectedCategory= allTheTags.find((tag) => {
          return tag.name===categorySelected
        })
        console.log(objectSelectedCategory)
        if(objectSelectedCategory) {
          filteredPosts = postsJson.filter((post) => {
            const tags = post.tags;
            return tags.includes(objectSelectedCategory.id);
          });
        }
      }
      setFilteredPosts(filteredPosts);
    }); 
  }, [categorySelected, subcategory, searchField.length, searchField, allTheTags]);  
    

     const arrayByColor = (numOfPosts, color) => {
        const posts = numOfPosts.filter((post)=>{
          return post.tags.includes(color);
       })
       return posts
    }

  const navClick = () =>{
    if(navShow===0){
      setNavShow(1);
    } else {
      setNavShow(0)
    }
    return navShow;
  }

  const More = () =>{
    if(mainCategory==='Tema ambiental'){
      return <span><span className='hiddenMore'>Tema</span><span className='more'>Cambiar de tema ambiental</span></span>
    } else {
      return <span><span className='hiddenMore'>Partido</span><span className='more'>Cambiar de partido político</span></span>
    }
  } 

  return (
    <div>
      {categorySelected.length > 0 && (
        <MetaDecorator
          title={`Agenda Ambiental - ${categorySelected}`}
          description={currentUrl}
          imgURL={`/img/${categorySelected.replace(/<\/?p[^>]*>/g, "")}.png`}
        />
      )}
      <header>
      {searchField.length>0 ? <span>Resultados para "{searchField}"</span> : <span>{categorySelected}</span>}
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
            ><i className='fas fa-chevron-left'></i><span>REGRESAR</span>
            </button>
            <div className='nav-right-container'>
            <input
              type="search"
              placeholder="Buscar propuesta"
              value={searchField} onChange={(e)=>setSearchField(e.target.value)} 
            />
            <button className='btn-list' onClick={()=>navClick()}><More/><img src={arrowDown} className='arrow-down' alt='arrowDown'/></button>
          </div>
            </div>
          <div className={navShow===1 ? 'list-nav':'list-nav-hidden'}>
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
            <span className='highlighted'>{/* searchField.length>0 ? filteredArray.length :  */filteredPosts.length}</span>{" "}
            PROPUESTAS
          </span>
           {/*  <div className='sliderContainer'>
           {mainCategory === "Tema ambiental" &&
              categorySelected.length > 0 && (
                <SimpleSlider
                  category={categorySelected.replace(/ /g, "")}
                />
              )}
          </div>  */}
         
         {searchField.length>0 ? '' : <div className='main-text'>
            {mainCategory === "Tema ambiental" &&
              categorySelected.length > 0 && (
                <CategoryDescription
                  category={categorySelected.replace(/ /g, "")}
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
              return <Card key={post.id} post={post}  politicalParties={navBarTags} /* tagNameHandler={tagName()} *//>;
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
