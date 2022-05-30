import React, { useState } from "react";
import { Search } from './components/00-SectionSearch/Search';
import { GridGif } from './components/01-SectionGif/GridGif';
import "bootstrap/dist/css/bootstrap.min.css";
export const App = () => {

    //useState donde buscar categorias.
    const [category, setCategory] = useState(['Goku', 'Vegeta']);

    //PARA PROBAR.
    const log = () => { console.log(category); }

    const props = {
        log: log,
        setCategory: setCategory
    };

    return (

        <>
            {/* enviar la (fun)setCategory a (comp)Search para agregarle mas strings. */}
            <Search props={props} />
            {/* luego en una lista <ol></ol> mapeando (var)category, incluir (comp)GridGif y enviarle 1 category para recibir el los datos del gif.*/}

            <div className="col-12 mt-5">
                
                <ol className="row justify-content-center">
                {
                    category.map( requestCategory  => (
                        <div className="col-6 text-center"
                        key={ requestCategory }>
                        <h3>{requestCategory}</h3>
                        <br></br> 
                        <GridGif
                            title={ requestCategory }
                        />
                        </div>
                    ))
                }

                </ol>
            </div>

            <button onClick={log} className="btn btn-primary"></button>
        </>

    )

}
