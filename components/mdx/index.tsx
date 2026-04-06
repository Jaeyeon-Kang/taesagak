import Link from 'next/link';
import type { ReactNode } from 'react';

/* ── Layout wrappers ── */

function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="panel">
      {title && (
        <div className="panel__head">
          <h2>{title}</h2>
        </div>
      )}
      <div className="panel__body">{children}</div>
    </div>
  );
}

function ValueGrid({ children }: { children: ReactNode }) {
  return <div className="value-grid">{children}</div>;
}

function ValueCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="value-card">
      <h3>{title}</h3>
      {children}
    </article>
  );
}

function LinkCard({ href, title, children }: { href: string; title: string; children: ReactNode }) {
  return (
    <Link className="value-card" href={href} style={{ textDecoration: 'none' }}>
      <h3>{title}</h3>
      {children}
    </Link>
  );
}

function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="feature-grid">{children}</div>;
}

/* ── Markdown element overrides ── */

function ul({ children }: { children?: ReactNode }) {
  return <ul className="plain-list">{children}</ul>;
}

function ol({ children }: { children?: ReactNode }) {
  return <ol className="plain-list">{children}</ol>;
}

function hr() {
  return <hr className="divider" />;
}

function table({ children }: { children?: ReactNode }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.95rem',
          textAlign: 'center',
        }}
      >
        {children}
      </table>
    </div>
  );
}

function th({ children }: { children?: ReactNode }) {
  return (
    <th
      style={{
        padding: '0.6rem 0.5rem',
        borderBottom: '2px solid var(--border, #e2e8f0)',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </th>
  );
}

function td({ children }: { children?: ReactNode }) {
  return (
    <td
      style={{
        padding: '0.6rem 0.5rem',
        borderBottom: '1px solid var(--border, #e2e8f0)',
      }}
    >
      {children}
    </td>
  );
}

/* ── Export map ── */

export const mdxComponents = {
  Panel,
  ValueGrid,
  ValueCard,
  LinkCard,
  FeatureGrid,
  ul,
  ol,
  hr,
  table,
  th,
  td,
};
