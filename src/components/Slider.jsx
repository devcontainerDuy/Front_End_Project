/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
function Slider() {
    const [sliders,setSliders]= useState([]);
    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL+'slides/home-slide')
        .then(res=>res.json())
        .then((res)=>{
            console.log(res);
            setSliders(res);
        })
    },[])
  return (
    <>
    <Swiper
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                {window.innerWidth < 900 &&
                   sliders.map((item, index) => (
                        <SwiperSlide>
                            <img key={index} className='w-100' src={process.env.REACT_APP_IMG_URL+'slides/' + item.mobile} alt="" />
                        </SwiperSlide>
                    ))
                }
                {window.innerWidth >900 &&
                    sliders.map((item, index) => (
                        <SwiperSlide>
                            <img  className='w-100' key={index}  src={item.desktop?process.env.REACT_APP_IMG_URL +'slides/'+ item.desktop:process.env.REACT_APP_IMG_URL +'slides/'+ item.mobile} alt="" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
    </>
  )
}

export default Slider