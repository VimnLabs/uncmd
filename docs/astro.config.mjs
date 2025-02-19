// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { createStarlightTypeDocPlugin } from 'starlight-typedoc';
import starlightSidebarTopics from 'starlight-sidebar-topics';

import react from '@astrojs/react';

const [typeDoc, typeDocSidebarGroup] = createStarlightTypeDocPlugin();

// https://astro.build/config
export default defineConfig({
	site: 'https://vimnlabs.github.io',
	base: 'uncmd/',
	integrations: [
		starlight({
			credits: true,
			favicon: '/favicon.svg',
			title: 'UnCommand',
			logo: {
				src: './src/assets/small-vimn-v-mark.svg'
			},
			social: {
				github: 'https://github.com/VimnLabs/UnCMD',
				discord: 'https://discord.gg/NUUW9ZMcKT'
			},
			components: {
				SiteTitle: './src/components/override/SiteTitle.astro',
				ThemeSelect: './src/components/override/ThemeSelect.astro'
			},
			customCss: ['/src/styles/global.css'],
			plugins: [
				/**
            ion({
                icons: { iconDir: './src/assets/icons' },
                overrides: {
                    Sidebar: false
                },
                footer: {
                    text: '©️ VimnLabs 2025',
                    links: [
                        {
                            text: 'Homepage',
                            href: '/'
                        }
                    ],
                    icons: [
                        {
                            name: 'github',
                            href: 'https://github.com/VimnLabs/UnCMD'
                        }
                    ]
                }
            }),
             */
				starlightSidebarTopics([
					{
						label: 'Guides',
						link: 'guides/why',
						icon: 'open-book',
						items: [
							'guides/why',
							'guides/installation',
							'guides/loader-usage',
							'guides/command-structure'
						]
					},
					{
						label: 'Reference',
						link: '/reference/overview',
						icon: 'information',
						items: [typeDocSidebarGroup]
					},
					{
						label: 'Source Code',
						link: 'https://github.com/VimnLabs/UnCMD',
						icon: 'github'
					}
				]),
				typeDoc({
					entryPoints: ['../package/src/index.ts'],
					output: 'reference',
					tsconfig: '../package/',
					typeDoc: {
						sort: ['enum-value-ascending', 'source-order'],
						parametersFormat: 'htmlTable',
						enumMembersFormat: 'htmlTable',
						skipErrorChecking: true,
						mergeReadme: false,
						fileExtension: '.mdx',
						useCodeBlocks: true,
						entryFileName: 'overview',
						hidePageHeader: true,
						name: 'API Reference'
					}
				})
			]
		}),
		react()
	]
});
