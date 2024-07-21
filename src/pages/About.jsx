/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
    const [about, setAbout] = useState('');
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'sitemap/about').then((res) => res.json())
            .then((res) => {
                setAbout(res.content);
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
                            <li className="breadcrumb-item">About</li>
                        </ol>
                    </nav>
                    {about != '' && (
                        <div
                            dangerouslySetInnerHTML={{ __html: about }}
                        />
                    )}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default About