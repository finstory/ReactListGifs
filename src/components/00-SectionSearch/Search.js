import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// crear un useState para administrar el input, luego ver como enviar ese dato con la (fun)setCategrioes rescibida.
export const Search = ({props}) => {

    
    const [inputValue, setInputValue] = useState(`Your Gif...`);

    const changeValue = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue !== "" & inputValue !== undefined)
        props.setCategory(name => [inputValue,...name]);
        props.log();
        // setInputValue(getImagen());
    }

    const onClick = () => {
        setInputValue("");
    }

    const onBlur = () => {
        setInputValue("Your Gif...");
    }
    
    return (

        <>
            <div className="col-12 mt-5 mb-2">
                <form className="row d-flex justify-content-between"
                    onSubmit={handleSubmit}>
                    <div className="form-group col-9">
                        <input type="name"
                            className="form-control"
                            value={inputValue}
                            onChange={changeValue}
                            onSubmit={handleSubmit}
                            onClick={onClick}
                            onBlur={onBlur}
                        />
                    </div>
                    <button type="submit"
                        className="col-3 btn btn-success"
                    >
                        Search</button>
                </form>
            </div>
        </>

    )

}