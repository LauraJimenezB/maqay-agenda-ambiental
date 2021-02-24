import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./Spinner.css";

export const Spinner = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className='spinner'>
        <Loader type='ThreeDots' color='#00b2a8' height='100' width='100' />
      </div>
    )
  );
};
