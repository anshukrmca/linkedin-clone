import React from 'react'
import './Widget.css'
import { IoAlertCircle } from 'react-icons/io5'
const Widget = () => {

  const NewArtical =({heading,subtitle})=>{
    return(
      <>
      <div className='widget_artical'>
        <div className="widget_articalLeft">
        <IoAlertCircle />
        </div>
        <div className="widget_artialRight">
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
      <div className='widget'>
        <div className='widget_header'>
          <h2>LinkedIn News</h2>
          <IoAlertCircle style={{fontSize:'20px'}}/>
        </div>
        <NewArtical heading="Papa React " subtitle="Hi I'm Anshu " />
        <NewArtical heading="How can you communicate with your team to ensure on-time delivery?" subtitle="Learn six steps to communicate effectively with your e-commerce team and meet your deadlines and delivery expectations. Improve your communication skills" />
        <NewArtical heading="How can you resolve conflicts with a difficult team member in Database Administration? How can you resolve conflicts with a difficult team member in Database Administration?" subtitle="Learn how to deal with a challenging co-worker in database administration. Find out how to communicate, seek support, and maintain respect." />
        <NewArtical heading="What are some tips for networking with people who work in different departments? What are some tips for networking with people who work in different departments?" subtitle="Learn some tips to network effectively across departments and improve your sales operations skills, insights, and opportunities." />
        <NewArtical heading="How can Communication Systems professionals maintain a positive attitude during a job search?" subtitle="Learn how to maintain a positive attitude and resilience during your job search as a communication systems professional with these tips." />
      </div>
    </>


  )
}

export default Widget