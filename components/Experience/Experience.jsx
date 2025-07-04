export default function Experience() {
  // var logoStyle = {
  //   float: "center",
  //   width: "100%",
  //   paddingLeft: "10%",
  //   paddingRight: "10%",
  // };
  return (
    <section id="experience" className="section section-experience">
      <div className="animate-up">
        <h2 className="section-title">Experiences</h2>

        <div className="timeline">
          <div
            className="timeline-bar"
            style={{ top: '80px', height: '686px' }}
          ></div>
          <div className="timeline-inner clearfix" style={{ height: '995px' }}>
            <div
              className="timeline-box timeline-box-compact timeline-box-left"
              style={{ position: 'absolute', left: '0px', top: '0px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>Oct. 2021 - Present</span>
                </div>
                <img
                  src="img/vng.png"
                  alt="VNG Corp"
                  className="w-72 mx-auto py-2"
                />
                <div style={{ padding: '10px 0' }}></div>
                <a
                  href="https://vng.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-center mt-5">VNG Corp</h3>
                </a>
                <h4>Software Engineer</h4>
                <p>
                  Zalo Content Delivery Network: caching service serve millions
                  request of the top Vietnamese news & media
                </p>
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact timeline-box-right"
              style={{ position: 'absolute', right: '0px', top: '70px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-right animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>Oct. 2020 - Oct. 2021</span>
                </div>
                <img
                  src="img/fpt.png"
                  alt="FPT Software"
                  className="w-72 mx-auto py-2"
                />
                <h3 className="text-center mt-5">FPT Software</h3>
                <h4>AWS Data Software Engineer</h4>
                <li>AWS data system with onsite-offshore model</li>
                <li>AWS Failover routing policy</li>
                <li>Provision AWS infrastructure for the data pipelines</li>
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact timeline-box-left"
              style={{ position: 'absolute', left: '0px', top: '416px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>Aug. 2018 - Apr. 2019</span>
                </div>
                <img
                  src="img/xep.webp"
                  alt="XEP Company"
                  className="w-72 mx-auto py-2"
                />
                <h3 className="text-center mt-5">XEP Company</h3>
                <h4>Software Engineer</h4>
                <li>Develop fullstack CRUD a commercial website</li>
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact timeline-box-right"
              style={{ position: 'absolute', right: '0px', top: '686px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-right animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>Aug. 2019 - Apr. 2020</span>
                </div>
                <img
                  src="img/rakumo.png"
                  alt="rakumo Co., Ltd"
                  className="w-72 mx-auto py-2"
                />
                <h3 className="text-center mt-5">rakumo Co., Ltd</h3>
                <h4>Software Engineer</h4>
                <li>
                  Django Web: webapp integrate{' '}
                  <a
                    href="https://www.docusign.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DocuSign
                  </a>{' '}
                  system
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
