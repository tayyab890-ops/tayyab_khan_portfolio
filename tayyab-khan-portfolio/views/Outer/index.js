import React from 'react'
import Gooery from '../../components/GooeryAnimation'
import DecryptText from '../../components/DecryptText'
import PropTypes from 'prop-types'
import Image from 'next/image'
import GitHub from '../../components/SVGs/GitHub'
import Instagram from '../../components/SVGs/Instagram'
import Facebook from '../../components/SVGs/Facebook'
import LinkedIn from '../../components/SVGs/LinkedIn'
import { openLink } from '../../utils/methods'


const Outer = ({ data: {
    title1,
    title2,
    decrypTexts,
    desciption,
    highlightTitle,
    buttons,
    profileImage,
} }) => {
    return (
        <div className='ai-outer'>
            <div className='ai-outer-particles'>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={`ai-particle ai-particle-${i}`} />
                ))}
            </div>
            <div className='container'>
                <div className='ai-outer-container d-flex justify-content-between align-items-center'>
                    <div className='ai-outer-text'>
                        {highlightTitle && (
                            <div className='ai-outer-highlight-badge'>
                                <span className='ai-outer-highlight-dot' />
                                {highlightTitle}
                            </div>
                        )}
                        <div className='ai-outer-heading'>
                            {title1}
                        </div>
                        <div className='ai-outer-heading'>
                            {title2}
                        </div>
                        <div className='ai-outer-heading2'>
                            <DecryptText
                                values={decrypTexts}
                            />
                        </div>
                        <div className='ai-outer-description'>
                            Hi, <span className='ai-outer-name-bold'>I'm Tayyab Khan</span> — a Full Stack Developer specializing in Next.js and PostgreSQL, building high-performance, secure, and visually stunning web applications.
                        </div>
                        <div className='ai-outer-buttons'>
                            {(buttons || []).map((btn, i) => (
                                <button
                                    key={i}
                                    onClick={btn.onClick}
                                    className={`ai-button ai-btn-${btn.variant || 'primary'}`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                        {/* Social links – visible only on mobile */}
                        <div className='ai-outer-social-links'>
                            <a onClick={() => openLink('https://github.com/tayyab890-ops')} aria-label='GitHub'><GitHub width={22} height={22} /></a>
                            <a onClick={() => openLink('https://www.instagram.com/tayyab__khan_01/?hl=en')} aria-label='Instagram'><Instagram width={22} height={22} /></a>
                            <a onClick={() => openLink('https://www.facebook.com/profile.php?id=100092315658740&ref=NONE_ig_profile_ac')} aria-label='Facebook'><Facebook width={22} height={22} /></a>
                            <a onClick={() => openLink('https://www.linkedin.com/in/tayyab-khan-47619527a')} aria-label='LinkedIn'><LinkedIn width={22} height={22} /></a>
                        </div>
                    </div>
                    <div className='ai-outer-profile-section d-none d-lg-flex'>
                        <div className='ai-profile-glow' />
                        <div className='ai-profile-image-wrapper'>
                            <Image
                                src={profileImage || '/assets/profile.jpg'}
                                alt='Tayyab Khan'
                                width={350}
                                height={350}
                                className='ai-profile-image'
                            />
                        </div>
                        <div className='ai-floating-shapes'>
                            <div className='ai-shape ai-shape-1' />
                            <div className='ai-shape ai-shape-2' />
                            <div className='ai-shape ai-shape-3' />
                        </div>
                    </div>
                    <div className='ai-outer-gooery'>
                        <Gooery />
                    </div>
                </div>
            </div>
        </div>
    )
}

Outer.propTypes = {}

export default Outer