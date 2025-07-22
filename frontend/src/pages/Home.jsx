import '../css/Home.css'

import TuningGuide from '../components/TuningGuide'
import CrashedBmw from '../images/crashed-bmw.svg'

function Home() {
    return <>
        <section className="home">
            <div className="title">
                <h1>Pick parts. Build your car. Ride with style.</h1>
            </div>

            <div className="info">
                <p>Find compatible parts with ease and build your car the way you want it!</p>
            </div>
            
            <div className="button">
                <button>Find Parts Now</button>
            </div>

            <div className="image">
                <img src={CrashedBmw}></img>
            </div>
        </section>
        <TuningGuide />
    </>
}

export default Home
