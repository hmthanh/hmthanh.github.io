import Image from 'next/image';

export default function Education() {
  return (
    <section id="education" className="section section-education">
      <div className="animate-up">
        <h2 className="section-title">Education</h2>
        <div className="timeline">
          <div
            className="timeline-bar"
            style={{ top: '80px', height: '77px' }}
          ></div>
          <div className="timeline-inner clearfix" style={{ height: '417px' }}>
            <div
              className="timeline-box timeline-box-compact timeline-box-left"
              style={{ position: 'absolute', left: '0px', top: '0px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date">
                  <span>Sept. 2018 - Sept. 2020</span>
                </div>
                <img
                  src="./img/hcmus.webp"
                  className="w-48 mx-auto"
                  alt="HCMUS"
                />
                <h3 className="timeline-box-header">
                  Bachelor of Computer Science
                </h3>
                <h4>
                  <a href="https://en.hcmus.edu.vn/">University of Science</a>,
                  VNU-HCM, Vietnam.
                </h4>
                {/* <b>(GPA : 8.2 ~ 3.3/4.0)</b> */}
                <p>
                  Thesis :{' '}
                  <a href="https://github.com/hmthanh/GCAT">
                    Link Prediction in Knowledge Graph
                  </a>
                  <br />
                  <a
                    className="underline"
                    href="https://github.com/hmthanh/GCAT"
                  >
                    Github
                  </a>{' '}
                  <a
                    className="underline"
                    href="https://github.com/hmthanh/GCAT"
                  >
                    PDF
                  </a>
                  {' '}
                  <a
                    className="underline"
                    href="https://www.scribd.com/presentation/628003420/Link-Prediction-in-Knowledge-Graph"
                  >
                    Slides
                  </a>
                  
                </p>
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact timeline-box-right"
              style={{ position: 'absolute', right: '0px', top: '70px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date">
                  <span>Oct. 2021 - Dec. 2024</span>
                </div>
                <img
                  src="img/hcmus.webp"
                  className="w-48 mx-auto"
                  alt="HCMUS"
                />
                <h3 className="timeline-box-header">
                  Master of Information Technology
                </h3>
                <h4>
                  <a href="https://en.hcmus.edu.vn/">University of Science</a>,
                  VNU-HCM, Vietnam.
                </h4>
                <p>
                  Thesis :{' '}
                  <a href="https://github.com/hmthanh/OHGesture">
                    OpenHuman: A conversational gesture synthesis system based
                    on emotions and semantics
                  </a>
                  {/* <img src="https://github.com/hmthanh/OHGesture/raw/main/OHGesture.png" /> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
