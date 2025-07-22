import '../css/TuningGuide.css'

function TuningGuide() {
    return <section className="tuning-guide-section">
        <div className="description">
            <h1>Tuning Guides</h1>
            <p>Confused about what tuning stages and their numbers mean? Check out these guides below!</p>
        </div>

        <div className="tuning-guides">
            <div className="guide-card">
                <img></img>
                <div className="info">
                    <h1>Stage 1 Tuning Guide</h1>
                </div>
            </div>

            <div className="guide-card">
                <img></img>
                <div className="info">
                    <h1>Stage 2 Tuning Guide</h1>
                </div>
            </div>

            <div className="guide-card">
                <img></img>
                <div className="info">
                    <h1>Stage 3 Tuning Guide</h1>
                </div>
            </div>
        </div>
    </section>
}

export default TuningGuide
