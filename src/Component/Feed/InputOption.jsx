import React from 'react'
import  './InputOption.css'

const InputOption = ({ Icon, title, color,functions }) => {
    return (
        <>
            <div className="InputOption">
                <Icon className='InputOption_Icon' onClick={functions}  style={{ color: color}} />
                <h4>{title}</h4>
            </div>

        </> 
    )
}

export default InputOption