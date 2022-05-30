import React, { useState } from "react";
import { Images } from './Images';
import { useFetchGifs } from '../../hooks/useFetchGifs';
import "bootstrap/dist/css/bootstrap.min.css";

export const GridGif = ({ title }) => {

    //Acá es la sección de imagenes.
    //1ero creo una const donde recibo un array con los gifs.

    // const [listGif,setListGifs] = useState("");

    const { data: gifs } = useFetchGifs(title);

    // setListGifs(getGif());
    return (
        gifs.map(gif => (
            <div className="col-12"
            key={gif.id}
            >
                <li className="col-12 mt-2 mb-2 text-center list-unstyled"
                key={gif.id}
                >
                    <Images key={gif.id}
                        {...gif} />
                </li>
                <br /><br />
            </div>
        ))

    )
}