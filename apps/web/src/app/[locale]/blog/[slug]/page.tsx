import { notFound } from "next/navigation";
import { MOCK_POSTS } from "@/data/mock-blog";
import { MOCK_ARTICLE_MDX } from "@/data/mock-article";
import { styled } from "next-yak";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  Callout,
  ProductCard,
  H2,
  H3,
} from "@/components/features/Blog/mdx-components";
import { CodeBlock } from "@/components/features/Blog/CodeBlock";
import { ProgressBar } from "@/components/features/Blog/ProgressBar";
import { TableOfContents } from "@/components/features/Blog/TableOfContents";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Calendar, User, Clock } from "lucide-react";
import { queries } from "@/config/theme";
import { AuthorBox } from "@/components/features/Blog/AuthorBox";

// Map the components for MDX
const components = {
  Callout,
  ProductCard,
  pre: CodeBlock,
  h2: H2, // Maps Markdown ## to our Smart Heading with ID
  h3: H3, // Maps Markdown ###
};

// --- LAYOUT STYLES ---

const PageLayout = styled.div`
  padding: 20px; /* Mobile padding */
  width: 100%;
  max-width: 100vw; /* Prevent overflow */

  ${queries.lg} {
    display: grid;
    /* 
       Grid Columns: 
       1fr (Flexible Left Margin) 
       750px (Main Content - Reading Width) 
       280px (Sidebar - Fixed Width) 
       1fr (Flexible Right Margin) 
    */
    grid-template-columns: 1fr minmax(auto, 750px) 280px 1fr;
    gap: 40px;
    padding: 40px 20px 80px;
  }
`;

const MainColumn = styled.main`
  width: 100%;

  ${queries.lg} {
    grid-column: 2; /* Place in the middle-left */
  }
`;

const SidebarColumn = styled.aside`
  display: none; /* Hidden on mobile */

  ${queries.lg} {
    display: block;
    grid-column: 3; /* Place on the right */
    padding-top: 100px; /* Align visually with text start */
  }
`;

// --- ARTICLE STYLES ---

const Header = styled.header`
  margin-bottom: 32px;
  text-align: center;
`;

const Category = styled.span`
  color: var(--color-info);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 2rem; /* Mobile size */
  font-weight: 800;
  color: var(--fg-primary);
  margin: 0 0 16px 0;
  line-height: 1.2;

  ${queries.md} {
    font-size: 2.5rem;
  }
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  color: var(--fg-muted);
  font-size: 0.85rem;
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: 40px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
`;

const Prose = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--fg-secondary);

  /* Safety for long words/code */
  overflow-wrap: break-word;
  word-wrap: break-word;

  /* 
     Note: We removed h2/h3 styles from here because 
     they are handled by the H2/H3 components now.
  */

  p {
    margin-bottom: 1.5em;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  ul,
  ol {
    margin-bottom: 1.5em;
    padding-left: 1.5em;
  }

  li {
    margin-bottom: 0.5em;
  }

  a {
    color: var(--action-primary);
    text-decoration: underline;
    text-underline-offset: 4px;
    &:hover {
      color: var(--color-info);
    }
  }
`;

// --- PAGE ---

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = MOCK_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <ProgressBar />

      <PageLayout>
        <MainColumn>
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: undefined },
            ]}
          />

          <Header>
            <Category>{post.category}</Category>
            <Title>{post.title}</Title>
            <MetaRow>
              <span>
                <User size={14} /> {post.author}
              </span>
              <span>
                <Calendar size={14} /> {post.date}
              </span>
              <span>
                <Clock size={14} /> {post.readTime}
              </span>
            </MetaRow>
          </Header>

          <CoverImage src={post.coverImage} alt={post.title} />

          <Prose>
            <MDXRemote source={MOCK_ARTICLE_MDX} components={components} />
          </Prose>
          <AuthorBox
            author={post.author}
            role={post.authorRole}
            image={post.authorImage}
          />
        </MainColumn>

        <SidebarColumn>
          {/* Sticky Table of Contents */}
          <div style={{ position: "sticky", top: "100px" }}>
            <TableOfContents content={MOCK_ARTICLE_MDX} />
          </div>
        </SidebarColumn>
      </PageLayout>
    </>
  );
}
