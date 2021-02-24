import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './slider.css'
import descriptionCategory from "../../utils/data/textDescriptionByCategory";
 
export const SimpleSlider = (props) => {
    return (
        <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={descriptionCategory[props.category].props.children.length}
      >
        <Slider>
          {descriptionCategory[props.category].props.children.map((item)=>
            <Slide index={item.index} key={item.props.children}>{item.props.children}</Slide>
          )}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    )
}