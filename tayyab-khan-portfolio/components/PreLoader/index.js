import React, { useEffect, useState } from 'react'

const PreLoader = () => {
    const [loader, handleLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            const root = document.documentElement;
            root.style.setProperty('--scrollBarWidth', '8px');
            handleLoader(false)
        }, 3000)
    }, [])

    return (
        <div className={`ai-pre-loader ${loader ? 'ai-pre-loader-enabled' : 'ai-pre-loader-disabled'}`}>
            <div className='ai-pre-loader-boarder' />
            <div className='ai-pre-loader-container ai-preloader-text'>
                <div className='ai-preloader-name'>Tayyab Khan</div>
                <div className='ai-preloader-title'>Full Stack Developer</div>
                <div className='ai-preloader-dots'>
                    <span className='ai-preloader-dot' />
                    <span className='ai-preloader-dot' />
                    <span className='ai-preloader-dot' />
                </div>
            </div>
        </div>
    )
}

PreLoader.propTypes = {}

export default PreLoader
