import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import Testimonial from '../components/Testimonial'
import TopProducts from '../components/TopProducts'
import OurMission from '../components/OurMission'
import VideoComponent from '../components/VideoComponent'

const HomePage = () => {
  return (
    <div className='pt-[12vh]'>
      <HeroSection/>
      <CategorySection/>
      <TopProducts/>
      {/* <OurMission/> */}
      <VideoComponent/>
      <Testimonial/>
    </div>
  )
}

export default HomePage
