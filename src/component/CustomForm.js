import React, { Children, cloneElement, useRef } from 'react'

export default function CustomForm({children, setElement}) {

    const formChangeHandler = (e) => {

        const {name, value} = e.target;

        var finalValue;
        
        try {
            finalValue = JSON.parse(value);
        } catch {
            finalValue = value;
        }
    
        setElement(preState => ({
          ...preState,
          [name]: finalValue
        }))

    }

    const addAttribute = (child) => {

        if (!child.props) { return child; }
        
        if (!(child.type === 'input' || child.type === 'select' || child.props.children)) { return child; }

        const newProps = {};
        
        if (child.type === 'input' || child.type === 'select') {
            newProps.onChange = formChangeHandler;
        }

        if (child.props.children) {
            newProps.children = Children.map(child.props.children, addAttribute);
        }


        return cloneElement(child, newProps)
    };
        
    return Children.map(children, addAttribute);

}
