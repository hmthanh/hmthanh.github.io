import { HCMUS } from '@/logo/hcmus';
import Image from 'next/image';

export default function Education() {
  return (
    <section id="education" className="pt-16 section-education">
      <div className="animate-up">
        <h2 className="section-title mb-6 font-extrabold">Education</h2>
        <div className="timeline">
          <div
            className="timeline-bar top-20 h-20"
            style={{ top: '80px', height: '80px' }}
          ></div>
          <div className="timeline-inner clear-both">
            <div
              className="timeline-box timeline-box-compact clear-both timeline-box-left"
              style={{ position: 'relative', left: '0px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date ">
                  <span className="text-white">Sept. 2018 - Sept. 2020</span>
                </div>
                <HCMUS className="w-48 mx-auto py-2" />
                {/* <img
                  src="./img/hcmus.svg"
                  className="w-48 mx-auto py-2"
                  alt="HCMUS"
                /> */}
                <h3 className="timeline-box-header">
                  <a href="https://en.hcmus.edu.vn/" target="_blank">
                    University of Science
                  </a>
                  , VNU-HCM
                </h3>
                <h4>Bachelor of Computer Science</h4>
                {/* <b>(GPA : 8.2 ~ 3.3/4.0)</b> */}
                <div className="pb-6">
                  <p>Thesis: Link Prediction in Knowledge Graph</p>
                  <div className="flex justify-center gap-4 pt-2 flex-wrap">
                    <a
                      className=""
                      target="_blank"
                      href="https://github.com/hmthanh/GCAT"
                    >
                      Code
                    </a>
                    <div className="">
                      <a
                        className=""
                        target="_blank"
                        href="/file/GCAT_ReportEN.pdf"
                      >
                        Report [EN]
                      </a>
                      <a
                        className=""
                        target="_blank"
                        href="/file/GCAT_ReportVN.pdf"
                      >
                        [VN]
                      </a>
                    </div>
                    <a className="" target="_blank" href="https://arxiv.org/abs/2507.03947">
                      arXiv
                    </a>
                    <a
                      className=""
                      target="_blank"
                      href="https://www.scribd.com/presentation/628003420/Link-Prediction-in-Knowledge-Graph"
                    >
                      Slides
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="timeline-box timeline-box-compact clear-both timeline-box-right relative"
              style={{ position: 'relative', marginTop: '76px' }}
            >
              <span className="dot"></span>
              <div className="timeline-box-inner animate-left animated">
                <span className="arrow"></span>
                <div className="date">
                  <span>Oct. 2021 - Dec. 2024</span>
                </div>
                {/* <img
                  src="img/hcmus.svg"
                  className="w-48 mx-auto py-2"
                  alt="HCMUS"
                /> */}
                <HCMUS className="w-48 mx-auto py-2" />
                <h3 className="timeline-box-header">
                  <a href="https://en.hcmus.edu.vn/" target="_blank">
                    University of Science
                  </a>
                  , VNU-HCM
                </h3>
                <h4>Master of Information Technology</h4>
                <div className="pb-6">
                  <p>
                    Thesis: OpenHuman - A conversational gesture synthesis
                    system based on emotions and semantics
                  </p>
                  <div className="flex justify-center gap-4 pt-2 flex-wrap">
                    <a
                      className="min-w-24"
                      target="_blank"
                      href="https://github.com/hmthanh/OHGesture"
                    >
                      Code
                    </a>
                    <div className="">
                      <a
                        className=""
                        target="_blank"
                        href="/file/DeepGesture_ReportEN.pdf"
                      >
                        Report [EN]
                      </a>
                      <a
                        className=""
                        target="_blank"
                        href="/file/DeepGesture_ReportVN.pdf"
                      >
                        [VN]
                      </a>
                    </div>
                    <a
                      className=""
                      target="_blank"
                      href="https://arxiv.org/abs/2507.03147v1"
                    >
                      arXiv
                    </a>
                    <a
                      className="min-w-24"
                      target="_blank"
                      href="https://huggingface.co/openhuman/openhuman"
                    >
                      Huggingface
                    </a>
                    <a
                      className="min-w-24"
                      target="_blank"
                      href="https://github.com/DeepGesture/deepgesture-unity"
                    >
                      Unity
                    </a>
                    <a
                      className="min-w-24"
                      target="_blank"
                      href="https://youtu.be/yLwXdm7UgPE"
                    >
                      Video
                    </a>
                    {/* <a
                      className="min-w-24"  target="_blank"
                      href="https://www.scribd.com/presentation/628003420/Link-Prediction-in-Knowledge-Graph"
                    >
                      Slides
                    </a> */}
                  </div>
                  {/* <img src="https://github.com/hmthanh/OHGesture/raw/main/OHGesture.png" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
