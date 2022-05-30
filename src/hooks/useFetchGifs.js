import { useState, useEffect } from 'react'
import { getGif } from '../helpers/getGif';


export const useFetchGifs = ( title ) => {
    //aquí se guaradan en (var)stat, un (array)data con todos los (obj)imgs obtenidos en la petición http.
    const [state, setState] = useState({
        data: []
    });

    useEffect( () => {
        //(prom)getGif recibe un (var)title, y devolverá 1 (obj)imgs con las propiedades de todos los 10 primeros gifs relacionados con ese (var)title.
        getGif( title )
            .then( imgs => {
                
                setState({
                    data: imgs
                });
            })

    }, [title])




    return state; // { data:[], loading: true };


}


