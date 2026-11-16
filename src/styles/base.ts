/**
 * Crisp's base CSS: the root's type and colours, focus, headings, numbers, links, the skip link,
 * keyframes and reduced motion.
 *
 * Every colour is a `var(--sv-*)` role and every size a scale token or a fixed step on Crisp's
 * 4 px grid; the conformance kit fails on any colour literal here.
 *
 * @module
 */

/** The selector of Crisp's provider root; every rule is scoped under it. */
export const R = '[data-sv-design="crisp"]'

/** Root, typography, focus and motion. */
export const BASE_CSS: string = `
${R}{background:var(--sv-bg);color:var(--sv-fg);font-family:var(--sv-font-sans);font-size:var(--sv-font-size);line-height:1.54;font-feature-settings:'cv11','ss03';-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;min-height:100vh;min-height:100dvh}
${R} *,${R} *::before,${R} *::after{box-sizing:border-box;border-color:var(--sv-border)}
${R} ::selection{background:var(--sv-accent-subtle);color:var(--sv-fg)}
${R} :focus-visible{outline:2px solid var(--sv-ring);outline-offset:2px}
${R} :focus:not(:focus-visible){outline:none}
${R} h1,${R} h2,${R} h3{margin:0;text-wrap:balance;letter-spacing:-0.015em;color:var(--sv-fg)}
${R} h1{font-size:var(--sv-font-size-lg);line-height:1.4;font-weight:600;overflow-wrap:anywhere}
${R} h2{font-size:0.875rem;line-height:1.43;font-weight:600}
${R} h3{font-size:var(--sv-font-size);font-weight:600}
${R} p{margin:0}
${R} a{color:var(--sv-accent-text);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px}
${R} a:hover{text-decoration-thickness:2px}
${R} mark{background:var(--sv-mark);color:var(--sv-mark-fg);border-radius:var(--sv-radius-sm);padding:0 2px}
${R} code,${R} samp,${R} .svc-num{font-family:var(--sv-font-mono);font-variant-numeric:tabular-nums;letter-spacing:-0.01em}
${R} kbd{display:inline-flex;align-items:center;min-height:20px;padding:0 5px;font-family:var(--sv-font-mono);font-size:0.6875rem;line-height:1;color:var(--sv-fg-muted);background:var(--sv-surface-subtle);border:1px solid var(--sv-border);border-radius:var(--sv-radius-sm)}
${R} hr{border:0;border-top:1px solid var(--sv-border);margin:calc(var(--sv-space) * 4) 0}
${R} [data-sv-part="skip-link"]{position:absolute;left:-9999px;top:0;z-index:70;padding:8px 12px;background:var(--sv-surface);color:var(--sv-fg);font-weight:500;border-radius:var(--sv-radius-md);box-shadow:var(--sv-shadow-pop);text-decoration:none}
${R} [data-sv-part="skip-link"]:focus{position:fixed;left:12px;top:12px}
${R} [data-sv-part="visually-hidden"]{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}
${R} .svc-icon{flex:none;display:inline-block;vertical-align:middle;stroke-width:1.75}
${R} .svc-icon-md{width:16px;height:16px}
${R} .svc-icon-sm{width:14px;height:14px}
${R} .svc-dot{flex:none;display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--sv-fg-muted)}
@keyframes svc-pop-in{from{opacity:0;transform:translateY(-2px) scale(0.98)}}
@keyframes svc-fade-in{from{opacity:0}}
@keyframes svc-rise-in{from{opacity:0;transform:translateY(8px)}}
@keyframes svc-slide-in{from{opacity:0;transform:translateX(-16px)}}
@keyframes svc-pulse{50%{opacity:0.55}}
@media (prefers-reduced-motion:reduce){${R} *,${R} *::before,${R} *::after{animation-duration:1ms;animation-iteration-count:1;transition-duration:1ms}}
`
