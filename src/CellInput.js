import React, {
     useEffect, useState
} from 'react';

const CellInput = ({  setValue,
                       value
                   }) => {

    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        console.log('CellInputTooltip mounted');
    }, []);

    //clean up effect to run when component is unmounted
    useEffect(() => ()=> (
        console.log('CellInputTooltip unmounted')
        ), []);


    const onChangeValue = (event) => {
        const updatedValue = event.target.value;
        setLocalValue(updatedValue);
    };
    const onInputBlur = () => {
        setValue(localValue);
        if (value === localValue) return;
    };

    return (
        <input
            type="text"
            onChange={onChangeValue}
            value={localValue}
            onBlur={onInputBlur}
        />

    );
};

export default CellInput;
