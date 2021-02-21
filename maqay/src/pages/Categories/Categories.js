import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Categories.css";
import Card from "./Card/Card";
import Footer from "../commons/Footer/Footer";
import ButtonFilterNav from "./ButtonFilterNav/ButtonFilterNav.jsx";
import { getTagsByGroupName } from "../../controller/postController";
import MetaDecorator from "./MetaDecorator/MetaDecorator";
import allPosts from "../../utils/data/allPosts.js";
import allTagsNameAndNumber from "../../utils/data/allTagsNameAndNumber.js";
import tagsByGroupName from "../../utils/data/tagsByGroupName.js";
import CategoryDescription from "./CategoryDescription/CategoryDescription.js";

const Categories = () => {
  /* posts to render */
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [politicalPartiesTags, setPoliticalPartiesTags] = useState([]);
  const [navBarTags, setNavBarTags] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [categorySelectedTags, setCategorySelectedTags] = useState([]);

  /* Set Political Parties Tags */
  useEffect(() => {
    const allTags = getTagsByGroupName(tagsByGroupName, "partidos-politicos");
    setPoliticalPartiesTags(allTags);
  }, []);

  /* Pass URL Params to the States */
  const { category, subcategory } = useParams();
  useEffect(() => {
    setCategorySelected(subcategory);
    setMainCategory(category);
  }, [category, subcategory]);

  /*  */
  useEffect(() => {
    if (mainCategory.length > 0) {
      const allTags = getTagsByGroupName(tagsByGroupName, mainCategory);
      setCategorySelectedTags(allTags);
    }
  }, [mainCategory]);

  /* NAVIGATION BAR Functions 
  DEBE CONVERTIRSE FX PURA CON ARGUMENTO ENVIRONMENTAL O POLITICAL Y VARIAR SEGUN CATEGORY SELECTED*/
  useEffect(() => {
    if (categorySelectedTags) {
      const newArray = allTagsNameAndNumber.filter((tag) => {
        return categorySelectedTags.includes(tag.id);
      });
      setNavBarTags(newArray);
    }
  }, [categorySelectedTags]);

  /* Create property "politicalParties" with only tag number of politicalparties from every post*/

  const tagName = () => {
    // post.tags es el array de tags de cada post
    return allPosts.map((post) => {
      const tags = post.tags;
      const array = politicalPartiesTags.filter((politicalTagNumber) => {
        return tags.includes(politicalTagNumber);
      });
      return (post.politicalParties = array);
    });
  };
  console.log("tagName: ", tagName());

  /* filtered posts */
  useEffect(() => {
    const dataOfCategorySelected = allTagsNameAndNumber.find((tag) => {
      return categorySelected.includes(tag.slug);
    });

    if (dataOfCategorySelected) {
      const array = allPosts.filter((post) => {
        const tags = post.tags;
        return tags.includes(dataOfCategorySelected.id);
      });
      return setFilteredPosts(array);
    }
  }, [categorySelected]);

  const location = useLocation();
  const currentUrl =
    "https://maqay.netlify.app" + location.pathname.replace(/ /g, "-");

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
        <span>{categorySelected}</span>
      </header>
      <main>
        <section className='view-categories'>
          <span className='text-bold'>
            HEMOS IDENTIFICADO{" "}
            <span className='highlighted'>{filteredPosts.length}</span>{" "}
            PROPUESTAS
          </span>
          <div className='main-text'>
            {/* {mainCategory === "Tema ambiental" &&
              categorySelected.length > 0 && (
                <CategoryDescription
                  category={categorySelected.replace(/ /g, "")}
                />
              )} */}
          </div>
          <p className='leyenda'>
            Para facilitar el análisis de las propuestas hemos identificado 8
            temas ambientales que son prioritarios para el país. Las propuestas
            de color{" "}
            <span className='leyenda-highlited alert-green'>VERDE</span>, son
            aquellas que corresponden a estos temas. Las propuestas color{" "}
            <span className='leyenda-highlited no-alert'>ÁMBAR</span>, son
            aquellas que no abordan los temas priorizados. En el caso del color{" "}
            <span className='leyenda-highlited alert-red'>ROJO</span>, son
            aquellas en las que se proponen disminuir estándares o permisos
            ambientales, cambios institucionales como la absorción o eliminación
            de instituciones ambientales.
          </p>
          <div className='alerts-guide'> </div>
          <div className='categories-cards-container'>
            {/* Recibe los posts filtrados según el tema seleccionado */}
            {filteredPosts.map((post) => {
              return <Card key={post.id} post={post} />;
            })}
          </div>
        </section>

        <nav>
          <button
            className='btn-back'
            onClick={() => {
              window.location = "/";
            }}
          >
            <i className='fas fa-chevron-left'></i>REGRESAR
          </button>
          <span>Cambiar de tema ambiental</span>
          {navBarTags.map((tag) => {
            return (
              <ButtonFilterNav
                key={tag.id}
                tagByTopic={tag}
                path={`/propuestas/${mainCategory}/${tag.slug}`}
              />
            );
          })}
        </nav>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Categories;
