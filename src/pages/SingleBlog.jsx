/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import Product from '../components/Product';
import Post from '../components/Post';

function SingleBlog() {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'posts/' + id)
            .then((res) => res.json())
            .then((res) => {
                setPost(res.post)
                setProducts(res.products);
                setPosts(res.relative)
            })
    }, [])
    return (
        <>
            <Header />
            <div className="page-content">
                <div className="pt-4 container pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/tin-tuc">Tin tức</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {post?.title}
                            </li>
                        </ol>
                    </nav>
                    <div className="row mt-3">
                        <div class="card shadow border-0">
                            <div class="card-body">
                                {post.content != '' && (
                                    <div
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="row mt-3">
                        <div class="card border-0 shadow">
                            <div class="card-body">
                                <h4 className='mb-3'>Mời bạn tham khảo các sản phẩm sau</h4>
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
                                    {products.length > 0 &&
                                        products.map((product, index) => (
                                            <SwiperSlide key={index}>
                                                <Product
                                                    name={product.name}
                                                    image={product.image}
                                                    price={product.price}
                                                    slug={product.slug}
                                                    discount={product.discount}
                                                />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        </div>

                    </div>
                    <div className="row mt-3 mb-5">
                        <div class="card border-0 shadow">
                            <div class="card-body">
                                <h4 className='mb-3'>Bài viết liên quan</h4>
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
                                                />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SingleBlog