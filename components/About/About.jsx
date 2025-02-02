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

export default function About() {
  return (
    <section id="about" className="section section-about">
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
                    <span className={`  `}>Hi !</span>
                  </div>
                  <h2 className="profile-title">
                    <span>I&apos;m</span> Thanh Hoang-Minh
                  </h2>
                  <div className="job-title">Machine Learning Engineer</div>
                  <h3 className="profile-position">
                    <strong>M.S.</strong>
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
                    <strong>Pages : </strong>
                    <Link href={'https://hmthanh.github.io/blog/'}>
                      MillionScope.com
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
                        <VSCode className="w-6" />
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
                        {/* <img
                          className="w-6"
                          alt="jupyter"
                          src="./img/icon_jupyter.webp"
                        /> */}
                        <Jupyter className="w-6" />
                      </li>
                      <li>
                        {/* <img
                          className="w-6"
                          alt="command"
                          src="./img/icon_command.webp"
                        /> */}
                        <Terminal className="w-6" />
                      </li>
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
                      <li>
                        {/* <img
                          className="w-6"
                          alt="github"
                          src="./img/icon_github.webp"
                        /> */}
                        <Github className="w-6 fill-black text-black" />
                      </li>
                    </ul>
                  </h2>

                  <div className="mx-auto flex justify-center gap-4 items-center">
                    <Link className="fill-primary flex items-center gap-2" href="skype:+hmthanhgm">
                      <Skype /> hmthanhgm
                    </Link>
                    <Link
                      className="fill-primary flex items-center gap-2"
                      href="mailto:hmthanhgm@gmail.com"
                    >
                      <Envelope /> hmthanhgm@gmail.com
                    </Link>
                    {/*<Link className="fill-primary flex items-center gap-2" href="tel:+84913472506">*/}
                    {/*    <Phone/>+84913472506*/}
                    {/*</a>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={'mx-auto profile-social bg-primary'}>
            <ul className="flex gap-4 justify-center">
              <li className="flex bg-white rounded-sm">
                <Link
                  className="group text-primary text-center w-9 h-9 flex items-center justify-center hover:shadow-[0px_0px_3px_rgb(4,135,204)] hover:bg-[rgb(4,135,204)] hover:text-[rgb(238,238,238)]"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/hmthanhgm"
                >
                  <Facebook className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              <li className="flex bg-white rounded-sm">
                <Link
                  className="group text-primary text-center w-9 h-9 flex items-center justify-center hover:shadow-[0px_0px_3px_rgb(4,135,204)] hover:bg-[rgb(4,135,204)] hover:text-[rgb(238,238,238)]"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://twitter.com/hmthanhgm"
                >
                  <Twitter className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              <li className="flex bg-white rounded-sm">
                <Link
                  className="group text-primary text-center w-9 h-9 flex items-center justify-center hover:shadow-[0px_0px_3px_rgb(4,135,204)] hover:bg-[rgb(4,135,204)] hover:text-[rgb(238,238,238)]"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/hmthanh/"
                >
                  <Linkedin className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              <li className="flex bg-white rounded-sm">
                <Link
                  className="group text-primary text-center w-9 h-9 flex items-center justify-center hover:shadow-[0px_0px_3px_rgb(4,135,204)] hover:bg-[rgb(4,135,204)] hover:text-[rgb(238,238,238)]"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/hmthanh"
                >
                  <Github className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              <li className="flex bg-white rounded-sm">
                <Link
                  className="group text-primary text-center w-9 h-9 flex items-center justify-center hover:shadow-[0px_0px_3px_rgb(4,135,204)] hover:bg-[rgb(4,135,204)] hover:text-[rgb(238,238,238)]"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://medium.com/@hmthanh"
                >
                  <Medium className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
              {/* <li className="flex bg-white rounded-sm">">
                <Link
                  className="group text-primary text-center w-9 h-9 flex items-center justify-center hover:shadow-[0px_0px_3px_rgb(4,135,204)] hover:bg-[rgb(4,135,204)] hover:text-[rgb(238,238,238)]"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://stackoverflow.com/story/hmthanh"
                >
                  <Stackoverflow className="w-5"/>
                </Link>
              </li> */}

              <li className="flex bg-white rounded-sm">
                <Link
                  className="group text-primary text-center w-9 h-9 flex items-center justify-center hover:shadow-[0px_0px_3px_rgb(4,135,204)] hover:bg-[rgb(4,135,204)] hover:text-[rgb(238,238,238)]"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.hackerrank.com/hmthanh"
                >
                  <HackerRank className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>

              <li className="flex bg-white rounded-sm">
                <Link
                  className="group text-primary text-center w-9 h-9 flex items-center justify-center hover:shadow-[0px_0px_3px_rgb(4,135,204)] hover:bg-[rgb(4,135,204)] hover:text-[rgb(238,238,238)]"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.kaggle.com/hmthanh"
                >
                  <Kaggle className="w-5 h-5 fill-primary group-hover:fill-white" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
