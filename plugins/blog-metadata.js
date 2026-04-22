const fs = require('fs');
const path = require('path');

/** 블로그 폴더를 직접 읽어서 globalData로 노출하는 플러그인 */
module.exports = function blogMetadataPlugin(context) {
  const blogDir = path.join(context.siteDir, 'blog');

  return {
    name: 'blog-metadata-plugin',

    async loadContent() {
      if (!fs.existsSync(blogDir)) return { posts: [], tags: {} };

      const entries = fs.readdirSync(blogDir, { withFileTypes: true });
      const posts = [];

      for (const entry of entries) {
        let mdPath = null;

        if (entry.isDirectory()) {
          const indexMd  = path.join(blogDir, entry.name, 'index.md');
          const indexMdx = path.join(blogDir, entry.name, 'index.mdx');
          if (fs.existsSync(indexMd))  mdPath = indexMd;
          else if (fs.existsSync(indexMdx)) mdPath = indexMdx;
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
          mdPath = path.join(blogDir, entry.name);
        }

        if (!mdPath) continue;

        const raw = fs.readFileSync(mdPath, 'utf-8');
        const fm  = parseFrontmatter(raw);
        if (!fm.title) continue;

        // permalink: /blog/YYYY/MM/DD/slug
        const slug = entry.isDirectory() ? entry.name : entry.name.replace(/\.(mdx?)$/, '');

        // 날짜: frontmatter date 우선, 없으면 폴더/파일명에서 추출
        const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (!dateMatch && !fm.date) continue;
        const dateParts = fm.date ? String(fm.date).slice(0, 10) : `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
        const [y, m, d] = dateParts.split('-');
        const slugSuffix = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
        const permalink = `/blog/${y}/${m}/${d}/${slugSuffix}`;

        const tags = (fm.tags || [])
          .filter((label) => label.length > 0)
          .map((label) => ({
            label,
            permalink: `/blog/tags/${label.toLowerCase().replace(/\s+/g, '-')}`,
          }));

        const wordCount = raw.replace(/---[\s\S]*?---/, '').split(/\s+/).length;

        posts.push({
          id: slug,
          metadata: {
            permalink,
            title: fm.title,
            date: new Date(dateParts).toISOString(),
            description: fm.description || '',
            readingTime: Math.max(1, Math.round(wordCount / 200)),
            tags,
          },
        });
      }

      // 날짜 내림차순 정렬
      posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));

      const tags = {};
      posts.forEach((post) => {
        post.metadata.tags.forEach((tag) => {
          if (!tags[tag.label]) {
            tags[tag.label] = { label: tag.label, permalink: tag.permalink, count: 0 };
          }
          tags[tag.label].count += 1;
        });
      });

      return { posts, tags };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData({ blogPosts: content.posts, blogTags: content.tags });
    },
  };
};

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    // 배열 처리: [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      fm[key] = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
    } else {
      fm[key] = val.replace(/^['"]|['"]$/g, '');
    }
  }
  return fm;
}
