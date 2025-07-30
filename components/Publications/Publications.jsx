import Image from 'next/image';
import { lazy, Suspense } from 'react';

const VideoDeepGesture = lazy(() => import('./VideoDeepGesture'));

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
                    href="https://deepgesture.github.io"
                    className=""
                    target="_blank"
                  >
                    [Homepage]
                  </a>
                  
                  <a
                    href="https://arxiv.org/abs/2507.03147v1  "
                    className=""
                    target="_blank"
                  >
                    [arXiv]
                  </a>

                  <a
                    href="http://github.com/DeepGesture/DeepGesture"
                    className=""
                    target="_blank"
                  >
                    [Code]
                  </a>
                 

                  <a
                    href="https://huggingface.co/DeepGesture"
                    className=""
                    target="_blank"
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
                  <Suspense fallback={<div>Loading...</div>}>
                    <VideoDeepGesture />
                  </Suspense>
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
                  <a
                    href="https://arxiv.org/abs/2410.06327"
                    target="_blank"
                    className=""
                  >
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
                  <a href="https://graphattentionnetwork.github.io" target="_blank" className="">
                    [Homepage]
                  </a>

                  <a href="https://arxiv.org/abs/2507.03947" target="_blank" className="">
                    [arXiv]
                  </a>

                  <a
                    href="https://github.com/hmthanh/GCAT"
                    target="_blank"
                    className=""
                  >
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
