import {type ReactNode, useState, useRef, useEffect} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './index.module.css';

type Tab = 'notes' | 'blog';

const categories = [
  {title: 'Unreal Engine', href: '/docs/unreal-engine/intro', description: 'Blueprint, C++ API, Gameplay Framework, Animation, Networking', icon: '🎮'},
  {title: 'C++',           href: '/docs/cpp/intro',           description: 'Modern C++, 템플릿, 메모리 관리, 디자인 패턴',                  icon: '⚙️'},
  {title: 'Graphics',      href: '/docs/graphics/intro',      description: 'Materials, HLSL Shaders, Niagara, Lumen / Nanite',           icon: '🎨'},
  {title: 'Tools',         href: '/docs/tools/intro',         description: 'Git, Build System, Profiling, Editor Tools',                 icon: '🔧'},
  {title: 'AI',            href: '/docs/ai/intro',            description: 'LLM, Prompt Engineering, Local AI, AI in Game',              icon: '🤖'},
];

type BlogPost = {
  id: string;
  metadata: {
    permalink: string;
    title: string;
    date: string;
    description: string;
    readingTime: number;
    tags: {label: string; permalink: string}[];
  };
};

type BlogTag = {
  label: string;
  permalink: string;
  count: number;
};

type BlogPluginData = {
  blogPosts: BlogPost[];
  blogTags: Record<string, BlogTag>;
};

function NotesSection(): ReactNode {
  return (
    <section className={styles.recentSection}>
      <div className={styles.recentHeader}>
        <span className={styles.recentLabel}>Notes</span>
        <Link to="/docs/unreal-engine/intro" className={styles.recentMore}>전체 보기 →</Link>
      </div>
      <div className={styles.galleryGrid}>
        {categories.map((cat) => (
          <Link key={cat.title} to={cat.href} className={styles.galleryCard}>
            <span className={styles.galleryIcon}>{cat.icon}</span>
            <h3 className={styles.galleryTitle}>{cat.title}</h3>
            <p className={styles.galleryDesc}>{cat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BlogSection({selectedTag}: {selectedTag: string | null}): ReactNode {
  const blogData = usePluginData('blog-metadata-plugin') as BlogPluginData;
  const allPosts = [...(blogData?.blogPosts ?? [])]
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  const posts = selectedTag
    ? allPosts.filter((p) => p.metadata.tags.some((t) => t.label === selectedTag))
    : allPosts.slice(0, 9);

  return (
    <section className={styles.recentSection}>
      <div className={styles.recentHeader}>
        <span className={styles.recentLabel}>
          {selectedTag ? `# ${selectedTag}` : 'Blog'}
        </span>
        <Link to="/blog" className={styles.recentMore}>전체 보기 →</Link>
      </div>
      {posts.length === 0 ? (
        <p className={styles.recentEmpty}>포스트가 없어요.</p>
      ) : (
        <div className={styles.galleryGrid}>
          {posts.map((post) => (
            <Link key={post.id} to={post.metadata.permalink} className={styles.galleryCard}>
              <div className={styles.galleryMeta}>
                <span className={styles.galleryDate}>
                  {new Date(post.metadata.date).toLocaleDateString('ko-KR', {year: 'numeric', month: 'short', day: 'numeric'})}
                </span>
                {post.metadata.readingTime > 0 && (
                  <span className={styles.galleryReading}>{Math.ceil(post.metadata.readingTime)}분</span>
                )}
              </div>
              <h3 className={styles.galleryTitle}>{post.metadata.title}</h3>
              {post.metadata.description && (
                <p className={styles.galleryDesc}>{post.metadata.description}</p>
              )}
              {post.metadata.tags.length > 0 && (
                <div className={styles.galleryTags}>
                  {post.metadata.tags.map((tag) => (
                    <span key={tag.label} className={styles.galleryTag}>{tag.label}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

function TagPills({selectedTag, onSelect}: {selectedTag: string | null; onSelect: (tag: string | null) => void}): ReactNode {
  const blogData = usePluginData('blog-metadata-plugin') as BlogPluginData;
  const tags = Object.values(blogData?.blogTags ?? {})
    .sort((a, b) => b.count - a.count);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const check = () => setShouldScroll(wrapper.scrollWidth > wrapper.clientWidth);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [tags.length]);

  if (tags.length === 0) return null;

  const looped = shouldScroll ? [...tags, ...tags, ...tags] : tags;

  return (
    <div className={styles.tickerRow}>
      <button
        className={`${styles.card} ${selectedTag === null ? styles.cardActive : ''}`}
        onClick={() => onSelect(null)}
      >
        <span className={styles.cardTitle}>전체</span>
      </button>
      <div className={`${styles.tickerWrapper} ${shouldScroll ? styles.tickerWrapperMask : ''}`} ref={wrapperRef}>
        <div className={`${styles.tickerTrack} ${shouldScroll ? styles.tickerTrackAnimated : styles.tickerTrackStatic}`}>
          {looped.map((tag, i) => (
            <button
              key={i}
              className={`${styles.card} ${selectedTag === tag.label ? styles.cardActive : ''}`}
              onClick={() => onSelect(tag.label)}
            >
              <span className={styles.cardTitle}>{tag.label}</span>
              <span className={styles.cardCount}>{tag.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [tab, setTab] = useState<Tab>('notes');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setSelectedTag(null);
  };

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.main}>

        {/* ── Section 1 ── */}
        <section className={styles.section1}>
          <div className={styles.hero}>
            <img src="/img/hero-spider.png" alt="hero" className={styles.heroImage} />
            <div
              className={styles.tabSwitch}
              onClick={() => handleTabChange(tab === 'notes' ? 'blog' : 'notes')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTabChange(tab === 'notes' ? 'blog' : 'notes')}
            >
              <span
                className={`${styles.tabIndicator} ${tab === 'blog' ? styles.tabIndicatorRight : ''}`}
                aria-hidden
              />
              <span className={`${styles.tabBtn} ${tab === 'notes' ? styles.tabBtnActive : ''}`}>Notes</span>
              <span className={`${styles.tabBtn} ${tab === 'blog' ? styles.tabBtnActive : ''}`}>Blog</span>
            </div>
          </div>

          {tab === 'notes' && (
            <div className={styles.grid}>
              {categories.map((cat) => (
                <Link key={cat.title} to={cat.href} className={styles.card}>
                  <span className={styles.cardIcon}>{cat.icon}</span>
                  <span className={styles.cardTitle}>{cat.title}</span>
                </Link>
              ))}
            </div>
          )}

          {tab === 'blog' && (
            <TagPills selectedTag={selectedTag} onSelect={setSelectedTag} />
          )}
        </section>

        {/* ── Section 2 ── */}
        {tab === 'notes'
          ? <NotesSection />
          : <BlogSection selectedTag={selectedTag} />
        }

      </main>
    </Layout>
  );
}
