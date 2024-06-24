/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';

function Single() {
    const {id} = useParams();
    const [product,setProduct]= useState({});
    const [gallery,setGallery]= useState([]);
    const [links,setLinks]= useState([]);
    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL+'products/'+id)
        .then((res)=>res.json())
        .then((res)=>{
            setProduct(res.product);
            setGallery(res.medias);
            setLinks(res.links);

        })
    },[id])
  return (
    <>
    <Header/>

    </>
  )
}

export default Single