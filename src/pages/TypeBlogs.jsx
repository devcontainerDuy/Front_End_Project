import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import "swiper/css/pagination";
import Post from '../components/Post';
import { Helmet } from 'react-helmet';
function TypeBlogs() {
    const [posts, setPosts] = useState([]);
    const [post,setPost]= useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'post-collections/'+id)
            .then(res => res.json())
            .then((res) => {
                setPost(res[0]);
                setPosts(res[0].posts);
            })
    }, [id])
    return (
        <>
            <Helmet>
                <title>{post.name}</title>
                <meta name="description" content={post.name} />
            </Helmet>
            <Header />
            <div className="page-content">
                <div className="pt-4 container pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/tin-tuc">Tin tức</a>
                            </li>
                            <li className="breadcrumb-item active">
                               {post?.name}
                            </li>
                        </ol>
                    </nav>
                    <div class="card shadow mt-4 mb-4 pb-3">
                        <div class="card-body">
                            <Swiper

                                slidesPerView={1}
                                spaceBetween={10}
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 40,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 50,
                                    },
                                }}
                                loop={true}
                                className="mySwiper"
                            >
                                {posts.length > 0 &&
                                    posts.map((post, index) => (
                                        <SwiperSlide key={index}>
                                            <Post
                                                title={post.title}
                                                slug={post.slug}
                                                image={post.image}
                                                created_at={post.created_at}
                                            />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default TypeBlogs