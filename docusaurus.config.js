const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'JSONClasses Documentation',
  tagline: 'The Modern Declarative Data Flow Framework for the AI Empowered Generation.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'fillmula', // Usually your GitHub org/user name.
  projectName: 'jsonclasses-docs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/fillmula/jsonclasses-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'JSONClasses',
        logo: {
          alt: 'JSONClasses Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'miscellaneous/introduction',
            position: 'left',
            label: 'Introduction',
          },
          {
            type: 'doc',
            docId: 'guide/data-type-definition',
            position: 'left',
            label: 'Guide'
          },
          {
            type: 'doc',
            docId: 'api-documentation/types-modifiers',
            position: 'left',
            label: 'API Documentation'
          },
          {
            href: 'https://www.jsonclasses.com',
            label: 'Homepage',
            position: 'left'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/fillmula/jsonclasses',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contents',
            items: [
              {
                label: 'Introduction',
                to: 'docs/miscellaneous/introduction',
              },
              {
                label: 'Guide',
                to: 'docs/guide/data-type-definition',
              },
              {
                label: 'API Documentation',
                to: 'docs/api-documentation/types-modifiers',
              },
              {
                label: 'Resources',
                to: 'https://github.com/fillmula/jsonclasses',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/jsonclasses',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Official Website',
                to: 'https://jsonclasses.com/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/fillmula/jsonclasses',
              },
            ],
          },
        ],
        copyright: `Copyright ?? ${new Date().getFullYear()} Fillmula, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
