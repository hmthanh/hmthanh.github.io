import Image from 'next/image';

export default function Publications() {
  return (
    <section id="publications" className="pt-16 news-text">
      <div className="animate-up animated">
        <h2 className="section-title mb-6">Publications</h2>
        <div className="section-box">
          <div className="papers">
            <div className="paper-item">
              <div className="paper-content">
                <p className="paper-title">
                  DeepGesture: A conversational gesture synthesis system based
                  on emotions and semantics
                </p>
                <div className="paper-links">
                  <a
                    href="https://hmthanh.github.io/file/DeepGesture_Paper.pdf"
                    className=""
                  >
                    [arXiv]
                  </a>

                  <a
                    href="https://hmthanh.github.io/file/DeepGesture_Paper.pdf"
                    className=""
                  >
                    [Code]
                  </a>
                  <a
                    href="https://hmthanh.github.io/file/DeepGesture_Paper.pdf"
                    className=""
                  >
                    [Homepage]
                  </a>

                  <a
                    href="https://hmthanh.github.io/file/DeepGesture_Paper.pdf"
                    className=""
                  >
                    [Huggingface]
                  </a>
                </div>

                <div className="w-full flex justify-center">
                  <Image
                    src="/img/DeepGesture.png"
                    alt="DeepGesture"
                    className="w-full mx-auto"
                    width={765}
                    height={598}
                  />
                </div>

                <div className="p-2">
                  <iframe
                    className="w-full mx-auto"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/eZghfNGmZn8?si=9l-jilNvdi-JPFwT"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="paper-year">
                <p className="">Jul.2025</p>
              </div>
            </div>

            <div className="paper-item">
              <div className="paper-content">
                <p className="paper-title">
                  Towards a GENEA Leaderboard - an Extended, Living Benchmark
                  for Evaluating and Advancing Conversational Motion Synthesis
                </p>
                <div className="paper-links">
                  <a href="https://arxiv.org/abs/2410.06327" className="">
                    [arXiv]
                  </a>
                </div>
              </div>
              <div className="paper-year">
                <p>Oct. 2024</p>
              </div>
            </div>

            <div className="paper-item">
              <div className="paper-content">
                <p className="paper-title">
                  Graph Collaborative Attention Network for Link Prediction in
                  Knowledge Graphs
                </p>
                <div className="paper-links">
                  <a href="/file/GCAT_Paper.pdf" className="">
                    [arXiv]
                  </a>

                  <a href="https://github.com/hmthanh/GCAT" className="">
                    [Code]
                  </a>
                </div>
                <div className="w-full flex justify-center">
                  <Image
                    src="/img/GCAT.png"
                    alt="GCAT"
                    className="max-w-full mx-auto"
                    width={693}
                    height={322}
                  />
                </div>
              </div>
              <div className="paper-year">
                <p>Oct. 2020</p>
              </div>
            </div>
          </div>

          <p></p>
        </div>
      </div>
    </section>
  );
}
