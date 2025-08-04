import { textareaValue } from "../pages/main";
import { useContext } from "react";

const ToolbarButton = (props : any) => {
    const currentValue = useContext(textareaValue);

    if (!currentValue){
        throw new Error("Current text value is undefiend")
    }

    const {beforeConvertText , setBeforeConvertText} = currentValue;

    return(
        <>
            {!props.function && (
                <button className="btn btn-light" onClick={() => setBeforeConvertText(beforeConvertText + props.markDown)}>{props.title}</button>
            )}

            {props.function && (
                <button className="btn btn-light" onClick={props.function}>{props.title}</button>
            )}
            
        </>
    );
}


export default ToolbarButton;