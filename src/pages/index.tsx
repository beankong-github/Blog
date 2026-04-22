import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const categories = [
  {
    title: 'Unreal Engine',
    href: '/docs/unreal-engine/intro',
    description: 'Blueprint, C++ API, Gameplay Framework, Animation, Networking',
    icon: '🎮',
  },
  {
    title: 'C++',
    href: '/docs/cpp/intro',
    description: 'Modern C++, 템플릿, 메모리 관리, 디자인 패턴',
    icon: '⚙️',
  },
  {
    title: 'Graphics',
    href: '/docs/graphics/intro',
    description: 'Materials, HLSL Shaders, Niagara, Lumen / Nanite',
    icon: '🎨',
  },
  {
    title: 'Tools',
    href: '/docs/tools/intro',
    description: 'Git, Build System, Profiling, Editor Tools',
    icon: '🔧',
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.heroActions}>
            <Link className="button button--primary button--lg" to="/docs/unreal-engine/intro">
              Notes 보기
            </Link>
            <Link className="button button--outline button--lg" to="/blog">
              Blog
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link key={cat.title} to={cat.href} className={styles.card}>
              <span className={styles.cardIcon}>{cat.icon}</span>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <p className={styles.cardDesc}>{cat.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
