import React from 'react'
import  './InputOption.css'

const InputOption = ({ Icon, title, color }) => {
    return (
        <>
            <div className="InputOption">
                <Icon className='InputOption_Icon'  style={{ color: color }} />
                <h4>{title}</h4>
            </div>

        </> 
    )
}

export default InputOption