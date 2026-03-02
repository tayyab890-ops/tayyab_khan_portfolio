import { openLink, scrollTo } from "./methods";


const header = {
    menus: [
        { title: 'Home', id: 'home' },
        { title: 'About', id: 'my-self' },
        { title: 'Skills', id: 'experience' },
        { title: 'Projects', id: 'my-work' },
        { title: 'Achievements', id: 'reviews' },
        { title: 'Certifications', id: 'certifications' },
        { title: 'Contact', id: 'contact' },
    ],
    rightBtn: {
        label: 'Download CV',
        onClick: () => openLink('assets/cv.pdf')
    },
    logo: {
        src: '/assets/profile.jpg',
        alt: 'Tayyab Khan'
    },
    handleIconClick: () => scrollTo('home'),
    handleItemSelect: (menu) => scrollTo(menu.id),
}

export default header