<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | HMAC-SHA256 Generator</title>
  <meta name="description" content="Learn how the HMAC-SHA256 Generator protects your privacy through 100% client-side hashing and zero data collection." />
  <meta property="og:title" content="Privacy Policy | HMAC-SHA256 Generator" />
  <meta property="og:description" content="Learn how the HMAC-SHA256 Generator protects your privacy through 100% client-side hashing and zero data collection." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>

    <p class="post-meta">Effective Date: November 27, 2025</p>

    <h2>1. Overview</h2>
    <p>
      The <strong>HMAC-SHA256 Generator</strong> is a cryptographic tool created by AxelBase to help developers 
      securely generate HMAC hashes in a simple, browser-based interface. This Privacy Policy explains how 
      your information is handled while using the utility. Because the tool is built on a
      <strong>zero-logging</strong>, <strong>zero-storage</strong>, and <strong>100% client-side architecture</strong>, 
      your data never leaves your device.
    </p>

    <h2>2. What We Do Not Collect</h2>
    <p>To maintain complete user privacy, we do <strong>not</strong> collect or store any of the following:</p>
    <ul>
      <li><strong>Personal information</strong> such as your name, email address, location, or IP address.</li>
      <li><strong>Cryptographic inputs</strong> including secret keys, messages, imported files, or generated hashes.</li>
      <li><strong>Analytics or usage data</strong>; we do not run tracking scripts, ad pixels, or cookies.</li>
      <li><strong>Device or browser data</strong> beyond what your browser already handles locally.</li>
    </ul>
    <p>
      Every operation—secret key parsing, message encoding, hash generation, and file imports—happens 
      entirely inside your browser via JavaScript. No data is transmitted to any server.
    </p>

    <h2>3. How the Tool Operates</h2>
    <p>
      The HMAC-SHA256 Generator uses modern browser cryptography APIs to create hashes. 
      All logic runs client-side, and the tool does not communicate with external services. 
      Any files you import are processed in memory only, and are immediately discarded when you close or 
      refresh the page.
    </p>

    <h2>4. Third-Party Services</h2>
    <p>
      The tool does not integrate analytics, ads, remote scripts, or any third-party collectors. 
      Open-source libraries that may exist in the bundle run locally and do not transmit data externally.
    </p>

    <h2>5. Cookies</h2>
    <p>
      The HMAC-SHA256 Generator uses <strong>no cookies whatsoever</strong>. 
      It does not maintain sessions, track returning users, or store preferences.
    </p>

    <h2>6. Security Recommendations</h2>
    <p>
      Although we do not collect or access your data, the protection of your secret keys depends on 
      your own environment. We recommend using updated browsers, avoiding public/shared devices, and 
      clearing sensitive text after use.
    </p>

    <h2>7. Children’s Privacy</h2>
    <p>
      This tool is intended for developers and technical users. We do not knowingly collect data from children under 13.
    </p>

    <h2>8. Updates to This Policy</h2>
    <p>
      This Privacy Policy may be updated to reflect improvements or clarifications. The effective date above 
      will always indicate the latest revision.
    </p>

    <p class="italic-note">
      By using the HMAC-SHA256 Generator, you acknowledge and agree to this Privacy Policy. 
      Because the tool collects nothing, your data remains yours—and yours alone.
    </p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding-top: 2rem; padding-bottom: 4rem; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); }
  .breadcrumbs a { color: var(--accent-secondary); }
  .prose { line-height: 1.8; }
  .post-meta { color: var(--text-secondary); margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
  .prose h1, .prose h2 { color: var(--accent-secondary); }
  .italic-note { text-align: center; margin-top: 3rem; font-style: italic; }
</style>
