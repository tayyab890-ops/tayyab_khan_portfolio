import { ParallaxProvider } from "react-scroll-parallax";
import Head from "next/head";
import Contact from "../views/Contact";
import FullPageScroll from "../components/FullPageScroll";
import Header from "../components/Header";
import MySelf from "../views/MySelf";
import Outer from "../views/Outer";
import Projects from "../views/Projects";
import Reviews from "../views/Reviews";
import SideElements from "../components/SideElements";
import TopScrolledBar from "../components/TopScrolledBar";
import Works from "../views/Works";
import { contact, header, mySelf, outer, projects, reviews, works } from "../utils";
import sideElements from "../utils/sideElements";
import Cursor from "../components/Cursor";
import PreLoader from "../components/PreLoader";
import Certifications from "../views/Certifications";
import certifications from "../utils/certifications";
import WaterMark from "../components/WaterMark";
import GitHub from "../components/SVGs/GitHub";
import Instagram from "../components/SVGs/Instagram";
import Facebook from "../components/SVGs/Facebook";
import LinkedIn from "../components/SVGs/LinkedIn";
import { openLink } from "../utils/methods";

const ViewElement = ({ children, id }) => (
  <div id={id} className="view-element">{children}</div>
)

export default function Home() {
  return (
    <>
      <Head>
        <title>Tayyab Khan | Full Stack Developer (Next.js &amp; PostgreSQL)</title>
      </Head>
      <PreLoader />

      <Cursor />
      <ParallaxProvider>

        <TopScrolledBar />

        <FullPageScroll />

        <Header data={header} />

        <SideElements data={sideElements} />

        <ViewElement id="home">
          <Outer data={outer} />
        </ViewElement>

        {/* Mobile-only social links between hero and about me */}
        <div className='ai-mobile-social-bar'>
          <a onClick={() => openLink('https://github.com/tayyab890-ops')} aria-label='GitHub'><GitHub width={18} height={18} /></a>
          <a onClick={() => openLink('https://www.instagram.com/tayyab__khan_01/?hl=en')} aria-label='Instagram'><Instagram width={18} height={18} /></a>
          <a onClick={() => openLink('https://www.facebook.com/profile.php?id=100092315658740&ref=NONE_ig_profile_ac')} aria-label='Facebook'><Facebook width={18} height={18} /></a>
          <a onClick={() => openLink('https://www.linkedin.com/in/tayyab-khan-47619527a')} aria-label='LinkedIn'><LinkedIn width={18} height={18} /></a>
        </div>

        <ViewElement id="my-self">
          <MySelf data={mySelf} />
        </ViewElement>

        <ViewElement id="experience">
          <Works data={works} />
        </ViewElement>

        <ViewElement id="my-work">
          <Projects data={projects} />
        </ViewElement>

        <ViewElement id="reviews">
          <Reviews data={reviews} />
        </ViewElement>

        <ViewElement id="certifications">
          <Certifications data={certifications} />
        </ViewElement>

        {/* <ViewElement id="graphics">
          <Graphics data={graphics} />
        </ViewElement> */}

        {/* <ViewElement id="contributions">
          <MapsContribution data={mapsContribution} />
        </ViewElement> */}

        <ViewElement id="contact">
          <Contact data={contact} />
        </ViewElement>

        <WaterMark />
      </ParallaxProvider>
    </>
  )
}
