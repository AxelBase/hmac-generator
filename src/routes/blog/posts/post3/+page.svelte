<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Setting Up Your First HMAC Signature | AxelBase Blog</title>
  <meta name="description" content="A simple step-by-step guide to creating your first HMAC-SHA256 signature using a secret key and message payload." />
  <meta property="og:title" content="Setting Up Your First HMAC Signature | AxelBase Blog" />
  <meta property="og:description" content="A step-by-step guide to creating your first HMAC-SHA256 signature using a secret key and message payload." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Setting Up Your First HMAC Signature</p>
  </div>

  <article class="prose">
    <h1>Setting Up Your First HMAC-SHA256 Signature</h1>

    <p class="post-meta">Published: November 2025</p>

    <p>
      Creating your first HMAC-SHA256 signature may seem intimidating at first, but once you understand the 
      components involved—secret keys, message payloads, and encoding—it becomes a straightforward process. 
      This guide walks you through each step using common development scenarios encountered in APIs, cloud services, 
      and webhook integrations.
    </p>

    <h2>Step 1: Choose Your Secret Key</h2>
    <p>
      A secret key is a shared piece of data known only to you and the verifying system. 
      It should be long, random, and kept strictly confidential. Short or predictable keys weaken 
      the security of your HMAC signatures.
    </p>

    <h2>Step 2: Prepare Your Message</h2>
    <p>
      Your message is the exact string that will be authenticated. Even tiny modifications—extra spaces, 
      newlines, or reordered JSON fields—will produce a completely different signature.
    </p>

    <h2>Step 3: Choose Encoding</h2>
    <p>
      Encoding determines how the text is represented internally:
    </p>
    <ul>
      <li><strong>UTF-8:</strong> Most human-readable text</li>
      <li><strong>Hex:</strong> Raw byte representation</li>
      <li><strong>Base64:</strong> Compact binary encoding</li>
    </ul>

    <h2>Step 4: Generate the Signature</h2>
    <p>
      Using the HMAC-SHA256 Generator, input your secret key and message, select your encodings, 
      and click <strong>Generate</strong>. The Web Crypto API produces a secure digest 
      identical to one created in backend languages like Python, Java, or Go—provided all settings match.
    </p>

    <h2>Step 5: Validate Your Output</h2>
    <p>
      If you are integrating with a service that expects a signature, compare your generated value 
      against what the service provides. If they match, your setup is correct.
    </p>

    <p class="italic-note">
      Once you understand the workflow, generating HMAC signatures becomes a routine and essential part of secure development.
    </p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .breadcrumbs a {
    color: var(--accent-secondary);
  }
  .breadcrumbs a:hover {
    text-decoration: underline;
  }
  .breadcrumbs p {
    margin: 0;
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .prose h1, .prose h2 {
    color: var(--accent-secondary);
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .prose h2 {
    margin-top: 2.5rem;
    border-bottom: 1px solid var(--secondary-bg);
    padding-bottom: 0.5rem;
  }
  
  .prose p {
    color: var(--text-primary);
  }

  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    color: var(--text-primary);
  }
  .prose ul li::marker {
    color: var(--accent-primary);
  }
  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 3rem;
  }
</style>
