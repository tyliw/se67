import WavesVideo from "../../../assets/1409899-uhd_2560_1440_25fps.mp4"
import "./Header.css"

export default function Header() {
  return (
    <div className='menu-header'>
        <div className="overlay"></div>
        <video src={WavesVideo} autoPlay loop muted></video>
        <div className="menu-header-content">
            <h2>Indulge in Delicious Culinary Journeys</h2>
            <p>Explore a World of Flavors</p>
            <a href="#content"><button>View Menu</button></a>
        </div>
    </div>
  )
}
