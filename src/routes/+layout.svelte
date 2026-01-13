<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { base } from '$app/paths';

  const currentYear = new Date().getFullYear();

  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  // Click outside helper
  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };

    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }
</script>

<div class="min-vh-100 d-flex flex-column">

  <header class="custom-navbar">
    <nav class="container d-flex justify-content-between align-items-center">
      
      <div class="d-flex align-items-center gap-4">
        <a class="navbar-brand-text" href="{base}/">AxelBase</a>

        <div class="position-relative bmac-nav-item" use:clickOutside on:click_outside={closeDropdown}>
          <button
            class="bmac-button d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm border-0"
            on:click={toggleDropdown}
            aria-label="Support options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
            </svg>
            <span class="d-none d-md-inline fw-semibold">Buy me a Coffee</span>
          </button>

          {#if isDropdownOpen}
            <div class="bmac-dropdown mt-2" transition:fly={{ y: -10, duration: 250 }}>
              <a
                href="https://buymeacoffee.com/axelbase"
                target="_blank"
                rel="noopener"
                on:click={closeDropdown}
              >
                <span class="amount">$3</span> One Coffee
              </a>

              <a
                href="https://buymeacoffee.com/axelbase"
                target="_blank"
                rel="noopener"
                on:click={closeDropdown}
              >
                <span class="amount">$5</span> Two Coffees
              </a>

              <a
                href="https://buymeacoffee.com/axelbase"
                target="_blank"
                rel="noopener"
                on:click={closeDropdown}
              >
                <span class="amount">$10</span> Three Coffees
              </a>

              <a
                href="https://buymeacoffee.com/axelbase"
                target="_blank"
                rel="noopener"
                on:click={closeDropdown}
                class="custom-amount"
              >
                Custom Amount
              </a>

              <a
                href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
                target="_blank"
                rel="noopener"
                on:click={closeDropdown}
                class="custom-amount bitcoin-option"
              >
                Buy via Crypto (Bitcoin)
              </a>
            </div>
          {/if}
        </div>
      </div>

      <ul class="d-none d-md-flex align-items-center gap-4 m-0 list-unstyled">
        <li><a class="nav-link" href="{base}/">Home</a></li>
        <li><a class="nav-link" href="{base}/#about">About</a></li>
        <li><a class="nav-link" href="{base}/#how-to">How to use</a></li>
        <li><a class="nav-link" href="{base}/#faq">FAQ</a></li>
        <li><a class="nav-link" href="{base}/blog">Blog</a></li>
      </ul>

      <button
        class="navbar-toggler d-md-none btn btn-outline-light border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mobileMenu"
      >
        ☰
      </button>
    </nav>

    <div class="collapse d-md-none bg-dark" id="mobileMenu">
      <div class="container py-3 d-flex flex-column gap-3">
        <a class="nav-link" href="{base}/">Home</a>
        <a class="nav-link" href="{base}/#about">About</a>
        <a class="nav-link" href="{base}/#how-to">How to use</a>
        <a class="nav-link" href="{base}/#faq">FAQ</a>
        <a class="nav-link" href="{base}/blog">Blog</a>
      </div>
    </div>
  </header>

  <div style="padding-bottom: 80px;">
    <slot />
  </div>

  <footer class="custom-footer">
    <div class="container d-flex justify-content-between align-items-center flex-wrap">
      <div class="small text-muted">
        © AxelBase HMAC-SHA256 Generator – {currentYear}
      </div>
      <div>
        <a href="{base}/privacy" class="footer-link">Privacy</a>
        <span class="text-muted">|</span>
        <a href="{base}/terms" class="footer-link">Terms</a>
      </div>
    </div>
  </footer>
</div>

<style>
  /* ──────────────────────────────────────────────
     Keep most of your dark theme, just override/enhance BMAC parts
  ────────────────────────────────────────────── */

  .bmac-button {
    background: var(--brand-green, #008f39); /* fallback if var not defined */
    background: linear-gradient(45deg, #00a651, #008f39);
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(0, 143, 57, 0.35);
    transition: all 0.3s ease;
  }

  .bmac-button:hover {
    background: linear-gradient(45deg, #00c462, #00a651);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 143, 57, 0.5);
  }

  .bmac-dropdown {
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    background: var(--sapphire-light);
    border: 1px solid rgba(99, 102, 241, 0.18);
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    z-index: 1001;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: white;
    text-decoration: none;
    font-size: 0.98rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(99, 102, 241, 0.15);
    color: var(--sapphire-glow);
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: #34d399;
    font-size: 1.1rem;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--sapphire-glow);
    border-top: 1px solid rgba(255,255,255,0.08);
    justify-content: center !important;
    padding: 14px 20px;
  }

  .bitcoin-option {
    color: #f59e0b !important;
  }

  .bitcoin-option:hover {
    color: #fbbf24 !important;
    background: rgba(251, 191, 36, 0.1) !important;
  }
</style>