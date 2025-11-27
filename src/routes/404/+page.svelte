<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>404 Not Found | HMAC-SHA256 Generator</title>
  <meta name="description" content="The page you were looking for does not exist on the HMAC-SHA256 Generator site." />
  <meta property="og:title" content="404 Not Found | HMAC-SHA256 Generator" />
  <meta property="og:description" content="The page you were looking for does not exist on the HMAC-SHA256 Generator site." />
  <meta property="og:url" content="{base}/404" />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>404 Not Found</p>
  </div>

  <article class="prose">
    <h1>404 — Page Not Found</h1>

    <p class="post-meta">Last Updated: November 27, 2025</p>

    <p>
      The page you’re trying to access could not be found. It might have been removed, renamed, or never existed. 
      Please check the link for errors, or return to the home page to continue using the HMAC-SHA256 Generator.
    </p>

    <h2>Quick Links</h2>
    <ul>
      <li><a href="{base}/">Home</a></li>
      <li><a href="{base}/privacy">Privacy Policy</a></li>
      <li><a href="{base}/terms">Terms & Conditions</a></li>
      <li><a href="{base}/blog">Blog</a></li>
    </ul>

    <h2>Need Assistance?</h2>
    <p>
      If you believe you reached this page in error, feel free to report the issue on the repository. 
      We aim to keep all navigation paths clean and functional.
    </p>

    <p class="italic-note"><strong>AxelBase Tools:</strong> Secure. Fast. Browser-only.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding-top: 2rem; padding-bottom: 4rem; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
  .prose { line-height: 1.8; }
  .post-meta { margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
</style>
