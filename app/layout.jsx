import './globals.css';
import '../style/theme_color.css';
import '../style/custom.css';
import Head from 'next/head';

import '../style/general.css';
import '../style/grid.css';
import '../style/components.css';
import '../style/containers.css';
import '../style/header.css';
import '../style/sidebar.css';
import '../style/home.css';
import '../style/theme_dark.css';
import '../style/old_browser.css';
import './overlay.css';

export const metadata = {
  title: 'Hoang Minh Thanh - ✨ Personal Resume ✨',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          Hoang Minh Thanh - ✨ Personal Resume ✨
        </title>
        <meta name="description" content="Personal Resume - Hoang Minh Thanh" />
        <meta property="og:site_name" content="Thanh Hoang-Minh" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <meta property="og:title" content="Thanh Hoang-Minh" />
        <meta
          property="og:description"
          content="Thanh Hoang-Minh • Machine Learning Engineer • Personal Resume"
        />
        <meta property="og:url" content="https://hmthanh.github.io/" />
        <meta
          property="og:image"
          content="https://hmthanh.github.io/img/cover.webp"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/hmthanhgm/"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thanh Hoang-Minh" />
        <meta
          name="twitter:description"
          content="Thanh Hoang-Minh • Machine Learning Engineer • Personal Resume"
        />
        <meta name="twitter:url" content="https://hmthanh.github.io/" />
        <meta
          name="twitter:image"
          content="https://hmthanh.github.io/img/cover.webp"
        />
        <meta name="twitter:site" content="@hmthanhgm" />
        <meta property="og:image:width" content="1060" />
        <meta property="og:image:height" content="607" />
      </Head>
      <body className="antialiased home header-has-img">{children}</body>
    </html>
  );
}
