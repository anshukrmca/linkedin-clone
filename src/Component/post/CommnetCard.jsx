import React from 'react'

const CommnetCard = ({id,img,name,massage}) => {
    return (
        <div>
            <div key={id} style={{borderLeft:'2px solid black'}}>
                <div className='d-flex align-items-center'>
                    <img className="mx-2 rounded-circle" src={img} alt="img" width={'25px'} height={'25px'} />
                    <h5 className="mt-0 mb-1" style={{ fontSize: '12px' }}><u>{name}</u></h5>
                </div>
                <p style={{ marginLeft:'40px',fontSize: '12px', fontWeight: '400' }}>
                    {massage}
                </p>
            </div>
        </div>
    )
}

export default CommnetCard