import ShowCertificate from '../Certificate/ShowCertificate';

export default function Accomplishments() {
  return (
    <section id="accomplishments" className="section section-text">
      <div className="animate-up animated">
        <h2 className="section-title">Awards and certifications</h2>
        <div className="section-box">
          <li>
            <b>Incentive Award</b> in The Good Chemistry District Student
            Contest - 2009
          </li>
          <li>
            <em>
              <ShowCertificate
                image="/img/Critical_Thinking.jpg"
                caption="Critical Thinking Certificate"
              >
                Critical Thinking Certification
              </ShowCertificate>
            </em>
            , Oct. 2014
          </li>
          <li>
            <em>
              <ShowCertificate
                image="/img/ml_summer.jpg"
                caption="Summer Course Machine Learning - HCMUS"
              >
                Summer Course Machine Learning - HCMUS
              </ShowCertificate>
            </em>
            , Oct. 2019
          </li>
          <li>
            <em>
              <ShowCertificate
                image="/img/Emotion_Regconition.jpg"
                caption="Emotion Recognition Certification - HCMUS"
              >
                Emotion Recognition Certification - HCMUS
              </ShowCertificate>
            </em>
            , Nov. 2019
          </li>
          <li>
            <b>Second Round</b> in{' '}
            <a href="https://www.youtube.com/watch?v=hiit2jOgwVQ">Thach Thuc</a>{' '}
            Faculty of Information Technology, HCMUS{' '}
            <ShowCertificate
              image="/img/ThachThuc2013.jpg"
              caption="ThachThuc 2013"
            >
              2013
            </ShowCertificate>
            ,{' '}
            <ShowCertificate
              image="/img/ThachThuc2014.jpg"
              caption="ThachThuc 2014"
            >
              2014
            </ShowCertificate>
          </li>
          <li>
            <b>Golden level</b>
            <sup>C++, Problem Solving</sup>; Bronze level<sup>Python</sup> in{' '}
            <a href="https://www.hackerrank.com/hmthanh">HackerRank</a>
          </li>
          <li>
            <a
              href="https://www.credly.com/badges/8e0316a5-2463-4d8c-aa34-76a2f6a0c1c3"
              target="_blank"
              rel="noopener noreferrer"
            >
              AWS Certified Solutions Architect - Associate
            </a>
            , June. 2021
          </li>

          <li>
            <a
              href="https://www.coursera.org/account/accomplishments/certificate/28JLEX5NNNUQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Design Patterns
            </a>
            , Aug. 2021
          </li>
          <li>
            <a
              href="https://www.coursera.org/account/accomplishments/specialization/certificate/Q2B26F8Q84MZ"
              target="_blank"
              rel="noopener noreferrer"
            >
              TensorFlow Developer Professional Certificate
            </a>
            , Aug. 2021
          </li>
          <li>
            <a
              href="https://www.credly.com/badges/972d23a2-e63f-4125-aebd-2d2c696f840e"
              target="_blank"
              rel="noopener noreferrer"
            >
              AWS Certified Machine Learning - Specialty
            </a>
            , Oct. 2021
          </li>
        </div>
      </div>
    </section>
  );
}
