<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    { href: '/blog/posts/post1', title: 'Understanding HMAC-SHA256', description: 'A complete introduction to HMAC-SHA256—how it works and why it is essential for message authentication.' },
    { href: '/blog/posts/post2', title: 'How HMAC Validation Works', description: 'A technical walkthrough of how systems validate HMAC-SHA256 signatures reliably and securely.' },
    { href: '/blog/posts/post3', title: 'Creating Your First HMAC Signature', description: 'Learn how to generate your first HMAC-SHA256 signature step-by-step with correct encodings.' },
    { href: '/blog/posts/post4', title: 'Diagnosing HMAC-SHA256 Errors', description: 'Find out why HMAC signatures sometimes fail and how to fix encoding, formatting, and key issues.' },
    { href: '/blog/posts/post5', title: 'Exporting and Using HMAC Outputs', description: 'A guide on working with HMAC results, including integration with APIs, CLIs, and backend systems.' },
    { href: '/blog/posts/post6', title: 'Advanced Key and Encoding Techniques', description: 'How to manage keys, encodings, and binary formats for advanced HMAC workflows.' },
    { href: '/blog/posts/post7', title: 'Integrating HMAC-SHA256 Into Your Workflow', description: 'Learn how to incorporate reliable HMAC generation into your development and security pipelines.' }
  ];
</script>

<svelte:head>
  <title>Blog | AxelBase Insights</title>
  <meta name="description" content="Explore tutorials, technical guides, and security insights for the AxelBase HMAC-SHA256 Generator." />
</svelte:head>

<div class="container fade-in blog-index">
  <header class="blog-header">
    <h1><i class="bi bi-journal-richtext"></i> Blog: AxelBase Insights</h1>
    <p class="subtitle">
      Tutorials and deep dives into secure hashing, HMAC workflows, best practices, and the engineering behind the 
      <a href="https://github.com/axelbase/hmac-generator" target="_blank" rel="noopener noreferrer">HMAC-SHA256 Generator</a>.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card">
        <div class="card-body">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-description">{post.description}</p>
          <span class="read-more">Read Article &rarr;</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .post-card {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .post-card .card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .post-title {
    font-size: 1.25rem;
    color: var(--accent-secondary);
    margin-bottom: 0.75rem;
  }

  .post-description {
    color: var(--text-secondary);
    flex-grow: 1;
    margin-bottom: 1rem;
  }

  .read-more {
    color: var(--accent-primary);
    font-weight: 600;
    align-self: flex-start;
    transition: var(--transition-fast);
  }

  .post-card:hover .read-more {
    transform: translateX(5px);
  }
</style>
