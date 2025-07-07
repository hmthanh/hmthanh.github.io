import {
  Envelope,
  Facebook,
  Github,
  Linkedin,
  Medium,
  Skype,
  Stackoverflow,
  Twitter,
  HackerRank,
  Kaggle,
  Phone,
} from '@/icon';
import styles from './About.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { VSCode } from '@/icon/vscode';
import { Python } from '@/icon/python';
import { CPlusPlus } from '@/icon/cplusplus';
import { Jupyter } from '@/icon/jupyter';
import { Terminal } from '@/icon/terminal';
import { Database } from '@/icon/database';
import { Git } from '@/icon/git';
import { Typescript } from '@/icon/typescript';
import { Javascript } from '@/icon/javascript';
import { Unity } from '@/icon/unity';
import { Blender } from '@/icon/blender';
import { Maya } from '@/icon/maya';
import { ORCID } from '@/icon/orcid';
import { GGScholar } from '@/icon/ggscholar';
import { CV } from '@/icon/cv';

const socialLinks = [
  { href: 'https://github.com/hmthanh', icon: Github },
  { href: 'https://www.linkedin.com/in/hmthanh/', icon: Linkedin },
  { href: 'https://www.facebook.com/hmthanhgm', icon: Facebook },
  { href: 'https://twitter.com/hmthanhgm', icon: Twitter },
  { href: 'https://medium.com/@hmthanh', icon: Medium },
  { href: 'https://www.hackerrank.com/hmthanh', icon: HackerRank },
  { href: 'https://www.kaggle.com/hmthanh', icon: Kaggle },
  { href: 'https://orcid.org/0009-0007-0898-5923', icon: ORCID },
  {
    href: 'https://scholar.google.com/citations?user=CbPqC30AAAAJ',
    icon: GGScholar,
  },
];

export default function About() {
  return (
    <section id="about" className="pt-16 section-about">
      <div className="animate-up">
        <div className="section-box">
          <div className="profile">
            <div className="row">
              <div className="col-xs-5">
                <div className="profile-photo">
                  <Image
                    src="img/avatar.jpg"
                    width="288"
                    height="384"
                    className="max-w-72 w-72"
                    alt="Hoang Minh Thanh"
                  />
                </div>
                <div className="section-txt-btn">
                  {/* <p>
                    <Link
                      className="btn btn-lg btn-border ripple"
                      rel="noopener noreferrer"
                      target="_blank"
                      href="./file/Hoang_Minh_Thanh-CV.pdf"
                    >
                      Resume
                    </Link>
                  </p> */}
                </div>
              </div>
              <div className="col-xs-7">
                <div className="profile-info">
                  <div className={styles.profilePreword}>
                    <span
                      className={`bg-linear-to-tr from-primary to-blue-400 rounded-md`}
                    >
                      Hi !
                    </span>
                  </div>
                  <h2 className="profile-title">
                    <span>I&apos;m</span> Thanh Hoang-Minh
                  </h2>
                  <div className="job-title">Senior Software Engineer</div>
                  <h3 className="profile-position">
                    <strong>MSc</strong>
                  </h3>
                  <h2
                    className="profile-university"
                    style={{
                      padding: 0,
                      border: 0,
                      margin: 0,
                    }}
                  >
                    Computer Science at University of Science - VNU
                  </h2>
                  <br />
                  <h5 className="">
                    <strong>Creator: </strong>
                    <Link href={'https://www.youtube.com/@openhuman_ai'}>
                      OpenHuman.AI
                    </Link>
                  </h5>
                  <h2 className="profile-university">
                    {/* <strong>Language & tools</strong> : */}
                    <ul className="flex gap-4">
                      {/* <li>
                        <img
                          className="w-6"
                          alt="vsvim"
                          src="./img/vsvim.webp"
                        />
                      </li> */}

                      <li>
                        <Typescript className="w-6" />
                      </li>
                      <li>
                        <Javascript className="w-6" />
                      </li>

                      <li>
                        {/* <img
                          className="w-6"
                          alt="python"
                          src="./img/icon_python.webp"
                        /> */}
                        <Python className="w-6" />
                      </li>
                      <li>
                        {/* <img
                          className="w-6"
                          alt="cplusplus"
                          src="./img/icon_cplusplus.webp"
                        /> */}
                        <CPlusPlus className="w-6" />
                      </li>
                      <li>
                        <VSCode className="w-6" />
                      </li>
                      <li>
                        {/* <img
                          className="w-6"
                          alt="jupyter"
                          src="./img/icon_jupyter.webp"
                        /> */}
                        <Jupyter className="w-6" />
                      </li>
                      <li>
                        <Blender className="w-6" />
                      </li>
                      <li>
                        <Maya className="w-6" />
                      </li>
                      <li>
                        <Unity className="w-6" />
                      </li>
                      {/* <li>
                        <Terminal className="w-6" />
                      </li> */}
                      <li>
                        {/* <img
                          className="w-6"
                          alt="sql"
                          src="./img/icon_sql.webp"
                        /> */}
                        <Database className="w-6" />
                      </li>
                      {/* <li>
                        <img
                          className="w-6"
                          alt="mysql"
                          src="./img/icon_mysql.webp"
                        />
                      </li> */}
                      <li>
                        {/* <img
                          className="w-6"
                          alt="git"
                          src="./img/icon_git.webp"
                        /> */}
                        <Git className="w-6" />
                      </li>
                      {/* <li>
                        <Github className="w-6 fill-black text-black" />
                      </li> */}
                    </ul>
                  </h2>

                  <div className="mx-auto flex justify-center gap-4 items-center">
                    {/* <Link
                      className="fill-primary flex items-center gap-2"
                      href="skype:+hmthanhgm"
                    >
                      <Skype className="w-5 h-5" /> hmthanhgm
                    </Link> */}
                    <Link
                      className="fill-primary flex items-center gap-2"
                      href="/file/MLEngineerfor3DDigitalHumans.pdf"
                    >
                      <CV className="w-5 h-5" />
                      CV
                      {/* (+84) 913 472 506 */}
                    </Link>

                    <Link
                      className="fill-primary flex items-center gap-2"
                      href="mailto:hmthanhgm@gmail.com"
                    >
                      <Envelope className="w-5 h-5" /> hmthanhgm@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              'mx-auto profile-social bg-linear-to-tl from-primary to-blue-400'
            }
          >
            {/* <ul className="flex gap-4 justify-center">
              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/hmthanh"
                >
                  <Github className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>

              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/hmthanh/"
                >
                  <Linkedin className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/hmthanhgm"
                >
                  <Facebook className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://twitter.com/hmthanhgm"
                >
                  <Twitter className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://medium.com/@hmthanh"
                >
                  <Medium className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              <li className="flex bg-white rounded">
                <Link
                  
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://stackoverflow.com/story/hmthanh"
                >
                  <Stackoverflow className="w-5"/>
                </Link>
              </li>

              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.hackerrank.com/hmthanh"
                >
                  <HackerRank className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>

              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.kaggle.com/hmthanh"
                >
                  <Kaggle className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>

              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://orcid.org/0009-0007-0898-5923"
                >
                  <ORCID className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>

              <li
                className="flex bg-white justify-center items-center text-center w-9 h-9"
                style={{
                  clipPath:
                    "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                }}
              >
                <Link
                  className=" overflow-hidden"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://scholar.google.com/citations?user=CbPqC30AAAAJ"
                >
                  <GGScholar className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
            </ul> */}

            <ul className="flex gap-4 justify-center">
              {socialLinks.map(({ href, icon: Icon }, idx) => (
                <li
                  key={idx}
                  className="group flex justify-center items-center text-center w-9 h-9 bg-white hover:bg-primary transition-colors duration-200"
                  style={{
                    clipPath:
                      "path('M 0,18 C 0,0 0,0 18,0 36,0 36,0 36,18 36,36 36,36 18,36 0,36 0,36 0,18')",
                  }}
                >
                  <Link
                    className="overflow-hidden"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={href}
                  >
                    <Icon className="w-5 h-5 fill-primary group-hover:fill-white transition-colors duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
