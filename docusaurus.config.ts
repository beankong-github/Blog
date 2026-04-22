import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Dev Notes',
  tagline: 'Unreal Engine & C++ 개발 노트',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // TODO: Vercel 배포 후 실제 URL로 변경
  url: 'https://your-site.vercel.app',
  baseUrl: '/',

  organizationName: 'beankong-github',
  projectName: 'Blog',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/beankong-github/Blog/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Dev Notes',
      logo: {
        alt: 'Dev Notes Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'notesSidebar',
          position: 'left',
          label: 'Notes',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/beankong-github/Blog',
          label: 'GitHub',
          position: 'right',
        },
      ],
      hideOnScroll: false,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Notes',
          items: [
            {label: 'Unreal Engine', to: '/docs/unreal-engine/intro'},
            {label: 'C++', to: '/docs/cpp/intro'},
            {label: 'Graphics', to: '/docs/graphics/intro'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Blog', to: '/blog'},
            {
              label: 'GitHub',
              href: 'https://github.com/beankong-github/Blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dev Notes. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['cpp', 'glsl', 'ini', 'bash', 'json', 'cmake'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
