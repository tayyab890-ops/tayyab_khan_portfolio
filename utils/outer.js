import { openLink, scrollTo } from "./methods"

const outer = {
    title1: `Build Modern &`,
    title2: 'Scalable Digital Solutions',
    decrypTexts: [
        'Full Stack Developer',
        'Next.js Specialist',
        'Spring Boot Developer',
        'WordPress Expert',
        'Creative Video Editor',
    ],
    desciption: `Hi, I'm Tayyab Khan — a Full Stack Developer specializing in Next.js and PostgreSQL, building high-performance, secure, and visually stunning web applications.`,
    highlightTitle: 'Full Stack Developer (Next.js & PostgreSQL)',
    buttons: [
        {
            label: 'Download CV',
            onClick: () => openLink('assets/cv.pdf'),
            variant: 'primary'
        },
        {
            label: 'View Projects',
            onClick: () => scrollTo('my-work'),
            variant: 'secondary'
        },
        {
            label: 'Contact Me',
            onClick: () => scrollTo('contact'),
            variant: 'outline'
        }
    ],
    profileImage: '/assets/profile.jpg',
}

export default outer
