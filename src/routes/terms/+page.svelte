<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | HMAC-SHA256 Generator</title>
  <meta name="description" content="Review the Terms and Conditions for using the AxelBase HMAC-SHA256 Generator." />
  <meta property="og:title" content="Terms & Conditions | HMAC-SHA256 Generator" />
  <meta property="og:description" content="Review the Terms and Conditions for using the AxelBase HMAC-SHA256 Generator." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>

    <p class="post-meta">Effective Date: November 27, 2025</p>

    <h2>1. Acceptance of Terms</h2>
    <p>
      By accessing or using the <strong>HMAC-SHA256 Generator</strong>, you agree to be bound by these Terms 
      and Conditions. If you do not agree, you must discontinue use immediately. These terms govern your 
      use of the utility, including any features, updates, or documentation provided by AxelBase.
    </p>

    <h2>2. Tool Purpose</h2>
    <p>
      The HMAC-SHA256 Generator is designed to help developers create HMAC hashes securely within their 
      browser. It is intended solely for educational, testing, and development use. The tool does not 
      replace professional security auditing or enterprise-grade cryptographic management.
    </p>

    <h2>3. No Data Storage</h2>
    <p>
      The tool performs all hashing operations client-side and does not store, transmit, or log any keys, 
      messages, or generated outputs. You are entirely responsible for safeguarding any sensitive data 
      entered into the utility.
    </p>

    <h2>4. User Responsibilities</h2>
    <p>By using the tool, you agree that you will:</p>
    <ul>
      <li>Use the tool lawfully and ethically.</li>
      <li>Avoid using the tool to generate hashes for malicious activity.</li>
      <li>Ensure all cryptographic materials you input are handled securely on your device.</li>
      <li>Take appropriate measures to prevent unauthorized access to your environment.</li>
    </ul>

    <h2>5. Disclaimer of Warranties</h2>
    <p>
      The HMAC-SHA256 Generator is provided on an <em>“as-is”</em> and <em>“as-available”</em> basis. 
      AxelBase makes no warranties regarding reliability, accuracy, availability, or suitability for a 
      specific purpose. Results from the tool should be independently verified before use in 
      production-critical systems.
    </p>

    <h2>6. Limitation of Liability</h2>
    <p>
      To the fullest extent permitted by law, AxelBase shall not be liable for any damages arising from your 
      use of the tool, including loss of data, security breaches, corrupted keys, or misuse by third parties. 
      You assume all risks associated with handling cryptographic inputs.
    </p>

    <h2>7. Intellectual Property</h2>
    <p>
      All branding, interface design, and underlying code (except open-source dependencies) remain the 
      intellectual property of AxelBase. You may not reproduce, distribute, or modify the tool without 
      explicit permission.
    </p>

    <h2>8. Termination</h2>
    <p>
      We reserve the right to suspend or revoke access to the tool at any time if we believe these terms 
      have been violated or misuse is detected.
    </p>

    <h2>9. Changes to Terms</h2>
    <p>
      AxelBase may update these Terms & Conditions periodically. Continued use after updates constitutes 
      acceptance of the revised terms.
    </p>

    <p class="italic-note">
      By using the HMAC-SHA256 Generator, you acknowledge that cryptography requires responsible handling and 
      agree to comply with all applicable laws and security best practices.
    </p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding-top: 2rem; padding-bottom: 4rem; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); }
  .prose { line-height: 1.8; }
  .post-meta { color: var(--text-secondary); margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
  .prose h1, .prose h2 { color: var(--accent-secondary); }
  .italic-note { text-align: center; margin-top: 3rem; font-style: italic; }
</style>
