<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { page } from '$app/stores';
        import {base} from '$app/paths';

    const paypalUsername = 'AxelLab427';
    const donationAmounts = [1, 3, 5, 10];
    let isDropdownOpen = false;
    let currentYear = new Date().getFullYear();

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

    function closeDropdown() {
        isDropdownOpen = false;
    }

    // Click Outside Action
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
            
            <div class="d-flex align-items-center gap-3">
                
                <a class="navbar-brand-text" href="{base}/">AxelBase</a>

                <div class="bmac-nav-item ms-2" use:clickOutside on:click_outside={closeDropdown}>
                    <button class="bmac-button" on:click={toggleDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
                        </svg>
                        <span class="d-none d-md-inline">Buy me a coffee</span>
                    </button>
                 
                    {#if isDropdownOpen}
                        <div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
                            {#each donationAmounts as amount}
                                <a
                                    href="https://paypal.me/{paypalUsername}/{amount}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    on:click={closeDropdown}
                                >
                                    ${amount}
                                </a>
                            {/each}
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

            <button class="navbar-toggler d-md-none btn btn-outline-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mobileMenu">
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

    <footer class="custom-footer releative">
        <div class="container d-flex justify-content-between align-items-center flex-wrap">
            <div class="small text-muted">
                &copy; AxelBase HMAC-SHA256 Generator – {currentYear}
            </div>
            <div>
                <a href="{base}/privacy" class="footer-link">Privacy</a>
                <span class="text-muted">|</span>
                <a href="{base}/terms" class="footer-link">Terms</a>
            </div>
        </div>
    </footer>
</div>