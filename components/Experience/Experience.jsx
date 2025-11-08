import { FPT } from '@/logo/fpt';
import { OpenHuman } from '@/logo/openhuman';
import { Rakumo } from '@/logo/rakumo';
import { VNG } from '@/logo/vng';
import { MOMO } from '@/logo/momo';

export default function Experience() {
  return (
    <section id="experience" className="pt-16 section-experience">
      <div className="animate-up">
        <h2 className="section-title mb-6">Experiences</h2>

        <div className="timeline">
          <div
            className="timeline-bar"
            style={{ marginTop: '80px', height: '1120px' }}
          ></div>
          <div className="timeline-inner">

            <div
              className="timeline-box timeline-box-compact timeline-box-left"
              style={{ position: 'relative', left: '0px', marginTop: '0px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>Oct. 2025 - Present</span>
                </div>
                {/* <img
                  src="img/OpenHuman.svg"
                  alt="OpenHuman"
                  className="w-44 h-44 mx-auto py-2"
                /> */}
                <MOMO className="w-44 h-44 mx-auto py-2" />
                <h3 className="text-center mt-5">MOMO (MService)</h3>
                <h4>Software Engineer</h4>
                {/* <p>Open store for realistic digital human.</p> */}
                <ul className="list-disc text-left p-2 first:mt-0 ltr:ml-6 rtl:mr-6">
                  <li className="my-2">
                    Implement a merchant service (in microservice architecture) payment profile info
                  </li>
                  {/* <li className="my-2">
                    <a href="https://github.com/DeepFACS" target="_blank">
                      DeepFACS
                    </a>
                    : Blendshapes-base system with ARKit 52 using 3DScanStore
                    mesh
                  </li>
                  <li className="my-2">
                    <a
                      href="https://github.com/DeepGesture/DeepGesture-Unity"
                      target="_blank"
                    >
                      DeepGesture
                    </a>{' '}
                    (
                    <a
                      href="https://www.youtube.com/watch?v=eZghfNGmZn8"
                      target="_blank"
                    >
                      Demo
                    </a>
                    ): Body animation AI in Unity, based on{' '}
                    <a
                      href="https://www.youtube.com/watch?v=YhH4PYEkVnY"
                      target="_blank"
                    >
                      DeepPhase
                    </a>
                  </li> */}
                </ul>

                {/* <li className="my-2">Develop fullstack CRUD a commercial website</li> */}
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact timeline-box-right"
              style={{ position: 'relative', left: '0px',  marginTop: '70px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>May. 2024 - Present</span>
                </div>
                {/* <img
                  src="img/OpenHuman.svg"
                  alt="OpenHuman"
                  className="w-44 h-44 mx-auto py-2"
                /> */}
                <OpenHuman className="w-44 h-44 mx-auto py-2" />
                <h3 className="text-center mt-5">OpenHuman</h3>
                <h4>Creator</h4>
                <p>Open store for realistic digital human.</p>
                <ul className="list-disc text-left p-2 first:mt-0 ltr:ml-6 rtl:mr-6">
                  <li className="my-2">
                    GENEA Leaderboard:{' '}
                    <a
                      href="https://genealeaderboard.github.io"
                      target="_blank"
                    >
                      GENEA
                    </a>
                    ,{' '}
                    <a
                      href="https://github.com/hemvip/hemvip.github.io"
                      target="_blank"
                    >
                      HEMVIP
                    </a>
                  </li>
                  <li className="my-2">
                    <a href="https://github.com/DeepFACS" target="_blank">
                      DeepFACS
                    </a>
                    : Blendshapes-base system with ARKit 52 using 3DScanStore
                    mesh
                  </li>
                  <li className="my-2">
                    <a
                      href="https://github.com/DeepGesture/DeepGesture-Unity"
                      target="_blank"
                    >
                      DeepGesture
                    </a>{' '}
                    (
                    <a
                      href="https://www.youtube.com/watch?v=eZghfNGmZn8"
                      target="_blank"
                    >
                      Demo
                    </a>
                    ): Body animation AI in Unity, based on{' '}
                    <a
                      href="https://www.youtube.com/watch?v=YhH4PYEkVnY"
                      target="_blank"
                    >
                      DeepPhase
                    </a>
                  </li>
                </ul>

                {/* <li className="my-2">Develop fullstack CRUD a commercial website</li> */}
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact timeline-box-left"
              style={{ position: 'relative', right: '0px', marginTop: '70px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>Oct. 2021 - May 2024</span>
                </div>
                <VNG className="w-72 mx-auto py-2" />
                {/* <img
                  src="img/VNG_Corp_logo.svg"
                  alt="VNG Corporation"
                  className="w-72 mx-auto py-2"
                /> */}
                <a
                  href="https://vng.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-center mt-5">VNG Corporation</h3>
                </a>
                <h4>Software Engineer</h4>
                <p>
                  Zalo Content Delivery Network: caching service serve millions
                  request of the top Vietnamese news & media
                </p>
                <ul className="list-disc text-left p-2 first:mt-0 ltr:ml-6 rtl:mr-6">
                  <li className="my-2">
                    Implement java <code>ScheduledThreadPool</code> for
                    monitoring stats execution.
                  </li>
                  <li className="my-2">
                    Built admin dashboard in Next.js with server status
                    visualization using <code>amCharts</code> and{' '}
                    <code>p5.js</code>.
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact timeline-box-right"
              style={{ position: 'relative', left: '0px', marginTop: '40px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-right animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>Oct. 2020 - Oct. 2021</span>
                </div>
                <FPT className="w-72 mx-auto py-2" />
                {/* <img
                  src="img/fpt.png"
                  alt="FPT Software"
                  className="w-72 mx-auto py-2"
                /> */}
                <h3 className="text-center mt-5">FPT Software</h3>
                <h4>AWS Data Engineer</h4>
                <ul className="list-disc text-left p-2 first:mt-0 ltr:ml-6 rtl:mr-6">
                  {/* <li className="my-2">
                    AWS data system with onsite-offshore model
                  </li> */}
                  <li className="my-2">
                    Implement AWS Health Check Failover Routing Policy using
                    Route 53, API Gateway, Lambda.
                  </li>
                  <li className="my-2">
                    CI/CD pipeline, implemented and modified real-time and batch
                    data pipelines on AWS using Kinesis, Lambda, S3, Glue,
                    StepFunction, SNS, etc.
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact timeline-box-left"
              style={{ position: 'relative', right: '0px', marginTop: '40px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-right animated">
                <span className="arrow"></span>
                <div className="date text-left">
                  <span>Aug. 2019 - Apr. 2020</span>
                </div>
                {/* <img
                  src="img/rakumo.png"
                  alt="rakumo Co., Ltd"
                  className="w-72 mx-auto py-2"
                /> */}
                <Rakumo className="w-72 mx-auto py-2" />
                <h3 className="text-center mt-5">rakumo Co., Ltd</h3>
                <h4>Software Engineer</h4>
                <ul className="list-disc text-left p-2 first:mt-0 ltr:ml-6 rtl:mr-6">
                  <li className="my-2">
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
