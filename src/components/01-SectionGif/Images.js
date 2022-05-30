import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Images = ({ title, url }) => {
    {/* el (comp)ListGif recibe los datos de las img y solo se encarga de crear el componente <img> . */ }

    return (
        <>
            {title}
            <br /><br />
            <img src={url}
                alt={title}
                className="img-fluid h-75 w-100
                animate__animated animate__zoomInDown animate__faster
                "></img></>

    )
}