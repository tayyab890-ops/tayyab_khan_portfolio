import { openLink } from "./methods"

const certifications = {
    heading: `Skills & Technologies`,
    list: [
        {
            size: 1,
            title: 'Next.js & React',
            platform: 'Full Stack Development',
            link: '',
            date: 'Primary Technology',
            logo: '',
            aos: 'zoom-out-left'
        },
        {
            size: 1,
            title: 'PostgreSQL & Prisma',
            platform: 'Database & ORM',
            link: '',
            date: 'Primary Technology',
            logo: '',
            aos: 'zoom-out-right'
        },
        {
            size: 1,
            title: 'Java Spring Boot',
            platform: 'Backend Development',
            link: '',
            date: 'Core Skill',
            logo: '',
            aos: 'zoom-out-left'
        },
        {
            size: 1,
            title: 'WordPress Development',
            platform: 'CMS & Web Solutions',
            link: '',
            date: 'Web Development',
            logo: '',
            aos: 'zoom-out-right'
        },
        {
            size: 2,
            title: 'Adobe Premiere Pro & Technical Documentation',
            platform: 'Creative & Documentation',
            link: '',
            date: 'Multimedia & Writing',
            logo: '',
            aos: 'zoom-out-left'
        },
    ],
    handleIconClick: openLink
}

export default certifications