<script lang="ts">
    import {base} from '$app/paths';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { readFileAsText } from '$lib/fileImport';
    import { saveStateToUrl, clearUrlHash } from '$lib/urlState';
    import { computeHmacSha256 } from '$lib/crypto';
    import { stringToBytes, bytesToHex, bytesToBase64, bytesToArrayString } from '$lib/encoding';
 
    let key = '';
    let keyEncoding: 'utf8' | 'hex' | 'base64' = 'utf8';
    let message = '';
    let messageEncoding: 'utf8' | 'hex' | 'base64' = 'utf8';
    let outputFormat: 'hex' | 'base64' = 'hex';
 
    let resultHex = '';
    let resultBase64 = '';
    let resultArray = '';
    let error = '';
    let loading = false;
 
    export let data: any;
 
    onMount(() => {
        if (data.urlState) {
            key = data.urlState.key ?? '';
            keyEncoding = data.urlState.keyEncoding ?? 'utf8';
            message = data.urlState.message ?? '';
            messageEncoding = data.urlState.messageEncoding ?? 'utf8';
            outputFormat = data.urlState.outputFormat ?? 'hex';
        }
    });
 
    $: saveStateToUrl({ key, keyEncoding, message, messageEncoding, outputFormat });
 
    async function generate() {
        loading = true;
        error = '';
        resultHex = '';
        resultBase64 = '';
        resultArray = '';
 
        try {
            const keyBytes = stringToBytes(key.trim(), keyEncoding);
            const messageBytes = stringToBytes(message, messageEncoding);
 
            const result = await computeHmacSha256(keyBytes, messageBytes);
 
            resultHex = bytesToHex(result);
            resultBase64 = bytesToBase64(result);
            resultArray = bytesToArrayString(result);
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to compute HMAC';
        }
 
        loading = false;
    }
 
    async function handleFileImport(event: Event, target: 'key' | 'message') {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;
 
        try {
            const content = await readFileAsText(input.files[0]);
            if (target === 'key') key = content;
            if (target === 'message') message = content;
        } catch {
            error = 'Failed to read file';
            setTimeout(() => (error = ''), 3000);
        }
 
        input.value = '';
    }
 
    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    }
 
    function clearAll() {
        key = '';
        message = '';
        resultHex = '';
        resultBase64 = '';
        resultArray = '';
        error = '';
        clearUrlHash();
    }
</script>
 
<main class="container py-5 animate-fade-in">
    <div class="row justify-content-center">
        <div class="col-lg-10">
 
            <h1 class="text-center mb-5 display-5 fw-bold" style="text-shadow: 0 0 20px rgba(99, 102, 241, 0.4);">
                AxelBase <span style="font-weight: 300; opacity: 0.7;">HMAC Generator</span>
            </h1>
 
            <div class="row g-4">
 
                <div class="col-12">
                    <div class="card border-0">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <strong class="text-light">Secret Key</strong>
                            <div>
                                <select class="form-select form-select-sm w-auto d-inline" bind:value={keyEncoding}>
                                    <option value="utf8">UTF-8</option>
                                    <option value="hex">Hex</option>
                                    <option value="base64">Base64</option>
                                </select>
                                <label class="btn btn-outline-light btn-sm ms-2" style="border-radius: 10px;">
                                    Import
                                    <input type="file" class="d-none" accept=".txt,text/plain" on:change={(e) => handleFileImport(e, 'key')} />
                                </label>
                            </div>
                        </div>
                        <div class="card-body">
                            <textarea bind:value={key} class="form-control" rows="4" placeholder="Enter your secret key..." required></textarea>
                        </div>
                    </div>
                </div>
 
                <div class="col-12">
                    <div class="card border-0">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <strong class="text-light">Message / Data</strong>
                            <div>
                                <select class="form-select form-select-sm w-auto d-inline" bind:value={messageEncoding}>
                                    <option value="utf8">UTF-8</option>
                                    <option value="hex">Hex</option>
                                    <option value="base64">Base64</option>
                                </select>
                                <label class="btn btn-outline-light btn-sm ms-2" style="border-radius: 10px;">
                                    Import
                                    <input type="file" class="d-none" accept=".txt,text/plain" on:change={(e) => handleFileImport(e, 'message')} />
                                </label>
                            </div>
                        </div>
                        <div class="card-body">
                            <textarea bind:value={message} class="form-control" rows="6" placeholder="Enter message to sign..." required></textarea>
                        </div>
                    </div>
                </div>
 
                <div class="col-12 text-center">
                    <div class="btn-group" role="group" style="box-shadow: 0 5px 15px rgba(0,0,0,0.2); border-radius: 50px; overflow: hidden;">
                        <input type="radio" class="btn-check" id="hex" value="hex" bind:group={outputFormat} />
                        <label class="btn btn-outline-primary" for="hex">Hex</label>
 
                        <input type="radio" class="btn-check" id="base64" value="base64" bind:group={outputFormat} />
                        <label class="btn btn-outline-primary" for="base64">Base64</label>
                    </div>
                </div>
 
                <div class="col-12 text-center">
                    <button class="btn btn-primary btn-lg px-5" on:click={generate} disabled={loading}>
                        {#if loading}
                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Generating...
                        {:else}
                            Generate HMAC-SHA256
                        {/if}
                    </button>
                    <button class="btn btn-outline-danger ms-3" on:click={clearAll} style="border-radius: 50px;">Clear All</button>
                </div>
            </div>
 
            {#if resultHex || resultBase64}
                <div class="mt-5 animate-fade-in">
                    <div class="card border-0 mb-4" style="border: 1px solid var(--sapphire-glow) !important;">
                        <div class="card-header d-flex justify-content-between align-items-center" style="background: rgba(99, 102, 241, 0.1);">
                            <strong style="color: var(--sapphire-glow);">HMAC-SHA256 Result ({outputFormat.toUpperCase()})</strong>
                            <button class="btn btn-sm btn-primary" on:click={() => copyToClipboard(outputFormat === 'hex' ? resultHex : resultBase64)}>Copy</button>
                        </div>
                        <div class="card-body">
                            <code class="text-break d-block p-3 rounded" style="background: #121420; color: #a5a6f6; font-size: 1.1em;">
                                {outputFormat === 'hex' ? resultHex : resultBase64}
                            </code>
                        </div>
                    </div>
 
                    <div class="row mt-3 g-3">
                        <div class="col-md-6">
                            <div class="card border-0 h-100">
                                <div class="card-header">Hex</div>
                                <div class="card-body">
                                    <code class="small text-break text-muted">{resultHex}</code>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card border-0 h-100">
                                <div class="card-header">Base64</div>
                                <div class="card-body">
                                    <code class="small text-break text-muted">{resultBase64}</code>
                                </div>
                            </div>
                        </div>
                    </div>
 
                    <div class="mt-3 text-center text-muted small">
                        Uint8Array: {resultArray}
                    </div>
                </div>
            {/if}
 
            {#if error}
                <div class="alert alert-danger mt-4 text-center rounded-pill">
                    {error}
                </div>
            {/if}
 
        </div>
    </div>
</main>

<section id="about" class="container py-5 text-center border-top border-secondary mt-5">
    <h2 class="display-6 fw-bold mb-4">About AxelBase</h2>

    <p class="lead text-muted mx-auto" style="max-width: 700px;">
        AxelBase develops high-precision web utilities for developers who need secure, reliable, and transparent tools they can trust. The HMAC-SHA256 Generator is part of this suite: a fully client-side cryptographic helper crafted for developers, penetration testers, educators, and anyone working with authentication systems or message integrity workflows.

        While many online hash generators rely on server-side APIs or remote processing, the HMAC-SHA256 Generator is built around a strictly enforced zero-data-collection model. Everything—from parsing the secret key to encoding the message to computing the final HMAC—runs entirely inside your browser. No data is sent anywhere, and no information is logged or stored. Whether you are working with sensitive API keys, local test data, or production-level authentication flows, your cryptographic material never leaves your device.

        The utility is built for clarity and dependability. It supports multiple input formats—including plain text, hexadecimal, Base64, and file imports—allowing you to work in whichever encoding best fits your workflow. Likewise, you may export the resulting hash in hex or Base64 format, depending on the requirements of your integration. This flexibility ensures that the tool is useful for a wide range of cryptographic scenarios, from verifying webhook signatures to generating secure message authentication tokens.

        AxelBase prioritizes developer-centric ergonomics. The interface is intentionally minimalist yet powerful, keeping the hashing process transparent, predictable, and free from unnecessary UI complexity. Every component has been optimized for speed, accessibility, and responsiveness so the tool remains efficient regardless of your device or environment. Our approach emphasizes trust and functionality rather than flashy design, ensuring that the tool remains consistent and stable throughout frequent use.

        The HMAC-SHA256 Generator is also designed to support educational purposes. By making the cryptographic process visible, easy to repeat, and instantly verifiable, it helps students and junior developers understand how HMAC authentication works in real-world systems. With many modern APIs requiring HMAC-SHA256 signatures for security—such as payment gateways, cloud services, and encrypted messaging systems—the generator provides an excellent environment to experiment safely without relying on proprietary vendor tools.

        As with all AxelBase tools, priority is given to security, performance, and transparency. The utility uses built-in browser cryptography rather than external libraries whenever possible, leveraging the Web Crypto API for safe and standards-compliant hashing operations. The client-side design minimizes attack surfaces, avoids unnecessary dependencies, and ensures long-term maintainability.

        AxelBase continues to improve its tools based on developer needs and real-world use cases. Whether you are using the generator for rapid prototyping, verifying signatures, or learning HMAC fundamentals, the tool is designed to support your workflow with precision and reliability. Our mission is to build secure, privacy-focused utilities that help developers work faster and more confidently—without ever compromising their data.
    </p>
</section>

<section id="how-to" class="container py-5 text-center">
    <h2 class="display-6 fw-bold mb-4">How to Use</h2>

    <div class="row text-start justify-content-center">
        <div class="col-md-8">

            <p class="text-muted mb-4">
                The HMAC-SHA256 Generator is designed to be straightforward while still offering the flexibility required 
                for real cryptographic workloads. This guide walks you step-by-step through every stage of generating an 
                HMAC signature and ensures you understand exactly what the tool is doing behind the scenes. Whether you 
                are a beginner learning how message authentication works or an experienced developer validating webhook 
                signatures, the workflow remains consistent, predictable, and entirely local to your browser.

                The first step involves providing a Secret Key, which acts as the shared credential between systems that 
                need to authenticate the message. You can manually type your key, paste it from another program, or 
                import it from a text file. The tool supports multiple encoding formats so that your secret can be 
                interpreted correctly, especially when dealing with Base64-based credentials or keys derived from other 
                hashing processes. If you are unsure about your key’s encoding, consulting your API documentation is 
                recommended.

                Next, enter the Message text—the exact payload you want to sign. This could be raw text, structured 
                JSON, or any string the verifying system expects. Maintaining perfect message accuracy is crucial 
                because even minor differences in whitespace or formatting will produce a different HMAC output. Like 
                the Secret Key, messages can be typed, pasted, or imported from a file for convenience during testing or 
                debugging.

                Once the inputs are ready, select your Input Encoding options. These determine how the tool interprets 
                the bytes of your key and message. Hex, Base64, and UTF-8 text are the most common encoding types. The 
                tool ensures consistent processing by converting your input into binary data before hashing it, 
                guaranteeing compatibility with systems that require precise byte-matching.

                Then choose your Output Format—typically hexadecimal or Base64—depending on the requirements of the 
                system you are integrating with. Many APIs request lowercase hexadecimal HMACs, while cloud systems 
                often prefer Base64 for compact transmission. The tool computes the signature using the Web Crypto API, 
                producing a secure, standardized HMAC result.

                After reviewing your selections, click Generate. The output hash appears instantly and is guaranteed not 
                to leave your browser. You may copy it, export it, or clear the session with one click. The entire 
                process avoids backend communication, making it ideal for testing sensitive material or working within 
                restricted environments.

                Using the generator repeatedly helps familiarize you with how HMAC authentication works: keys and 
                messages are combined, encoded, and hashed into a final signature used to verify authenticity. By 
                experimenting with different encodings and message structures, you can fully understand how your target 
                system processes data and how your signatures must be constructed to match its expectations.
            </p>

            <ul class="list-group list-group-flush bg-transparent">
                <li class="list-group-item bg-transparent text-light border-secondary">1. Enter your <strong>Secret Key</strong> (or import a file).</li>
                <li class="list-group-item bg-transparent text-light border-secondary">2. Enter the <strong>Message</strong> payload you wish to sign.</li>
                <li class="list-group-item bg-transparent text-light border-secondary">3. Select your desired input encoding and output format.</li>
                <li class="list-group-item bg-transparent text-light border-secondary">4. Click <strong>Generate</strong> to receive your Hash.</li>
            </ul>
        </div>
    </div>
</section>

<section id="faq" class="container py-5 text-center mb-5">
    <h2 class="display-6 fw-bold mb-4">FAQ</h2>

    <div class="mx-auto" style="max-width: 700px;">

        <div class="mb-4">
            <h5 class="fw-bold text-light">Is my data secure?</h5>
            <p class="text-muted">
                Absolutely. The HMAC-SHA256 Generator operates entirely inside your browser using secure, built-in 
                cryptographic APIs. None of your inputs—whether keys, messages, or imported files—are sent to servers or 
                stored. Every hashing operation is performed locally and discarded when you leave or refresh the page.
            </p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold text-light">Why does everything run client-side?</h5>
            <p class="text-muted">
                Because security and privacy are the foundation of HMAC workflows. Many developers work with API keys, 
                internal system secrets, or sensitive payloads. Sending that data to a remote server—even temporarily—
                creates unnecessary risk. By keeping everything on the client, the generator removes this risk 
                completely.
            </p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold text-light">What file formats can I import?</h5>
            <p class="text-muted">
                You can import plain text files containing secret keys or message payloads. These files are processed 
                in memory only. Nothing is uploaded or cached, and no temporary storage is created.
            </p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold text-light">Which encoding options should I choose?</h5>
            <p class="text-muted">
                Encoding depends on how your target system treats key and message bytes.<br>
                • UTF-8: Best for normal text.<br>
                • Hex: Used for raw byte keys and signature verification workflows.<br>
                • Base64: Common in cloud APIs and compact binary formats.<br>
                If unsure, follow the documentation for the system verifying your HMAC.
            </p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold text-light">Can I use this tool for production secrets?</h5>
            <p class="text-muted">
                Yes, the tool is technically secure because no data leaves your browser. However, best practice is to 
                only use production secrets in tightly controlled environments—never on shared or public devices.
            </p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold text-light">Why do small changes create different hashes?</h5>
            <p class="text-muted">
                HMAC output is highly sensitive to input changes. Adding a single space, newline, or character alters 
                the entire signature. This is expected behavior and ensures message integrity.
            </p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold text-light">Does the output match Node.js, Python, Go, etc.?</h5>
            <p class="text-muted">
                Yes. The generator uses the standard HMAC-SHA256 algorithm via the Web Crypto API, which aligns with 
                modern cryptographic libraries. Matching the same inputs and encodings produces identical results across 
                languages.
            </p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold text-light">Can I trust the Web Crypto API?</h5>
            <p class="text-muted">
                The Web Crypto API is an audited, standardized cryptographic suite built directly into the browser. It 
                executes at the native engine level and is far more secure than pure JavaScript crypto libraries.
            </p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold text-light">Does the tool store anything?</h5>
            <p class="text-muted">
                No. Closing or refreshing the tab resets everything. No information is stored or cached.
            </p>
        </div>

        <div>
            <h5 class="fw-bold text-light">Why do my hashes differ from my backend?</h5>
            <p class="text-muted">
                This almost always comes down to encoding differences. Verify that both systems:<br>
                • Use the exact same byte encoding<br>
                • Process whitespace identically<br>
                • Avoid automatic formatting<br>
                Testing your inputs with this tool helps identify mismatches before deployment.
            </p>
        </div>

    </div>
</section>
