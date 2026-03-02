import { openLink } from "./methods"

const contact = {
    label: `Get in touch`,
    heading: `Let’s Work Together`,
    description: `I'm always open to new opportunities and exciting projects. Whether you need a Full Stack Developer, a Spring Boot backend, or a WordPress solution — let's connect and build something amazing together.`,
    button: {
        label: 'Say Hello',
        onClick: () => openLink('mailto:tayyabkhan122115@gmail.com?subject=Hello from Portfolio')
    },
    phone: '+923448701627',
    email: 'tayyabkhan122115@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tayyab-khan-47619527a',
    github: 'https://github.com/tayyab890-ops',
    designAndBuiltBy: 'Tayyab Khan — Full Stack Developer (Next.js & PostgreSQL)',
    copyright: '© 2026 All Rights Reserved',
    handleBuiltByClick: () => {},
}

export default contact
