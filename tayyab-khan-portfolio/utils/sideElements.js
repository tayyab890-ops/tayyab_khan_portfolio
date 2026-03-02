import { openLink } from "./methods"

const handleIconClick = (icon) => {
    const links = {
        'github': 'https://github.com/tayyab890-ops',
        'instagram': 'https://www.instagram.com/tayyab__khan_01/?hl=en',
        'twitter': 'https://www.facebook.com/profile.php?id=100092315658740&ref=NONE_ig_profile_ac',
        'linkedin': 'https://www.linkedin.com/in/tayyab-khan-47619527a',
    }
    openLink(links[icon])
}

const sideElements = {
    emailButton: {
        label: 'tayyabkhan122115@gmail.com',
        onClick: () => openLink('mailto:tayyabkhan122115@gmail.com?subject=Hello')
    },
    handleIconClick,
}

export default sideElements