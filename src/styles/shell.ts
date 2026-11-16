/**
 * Crisp's shell CSS: the sidebar on the canvas, the inset content panel, the top bar, the page
 * header, the auth frame, and the drawer below 1024 px.
 *
 * The overflow rule (no horizontal scroll at 375 px) is built in: every column that holds page
 * content has `min-width: 0`, and wide things (tables) scroll inside their own positioned box.
 *
 * @module
 */
import { R } from './base.ts'

/** The page frame. */
export const SHELL_CSS: string = `
${R} .svc-shell{display:grid;grid-template-columns:var(--sv-sidebar-width) minmax(0,1fr);min-height:100vh;min-height:100dvh;background:var(--sv-bg)}
${R} .svc-shell-nav{min-width:0;position:sticky;top:0;height:100vh;height:100dvh;overflow-y:auto;scrollbar-width:thin}
${R} .svc-shell-body{min-width:0;display:flex;flex-direction:column;padding:8px 8px 8px 0}
${R} .svc-panel{flex:1;min-width:0;display:flex;flex-direction:column;background:var(--sv-surface);border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg);box-shadow:var(--sv-shadow-sm)}
${R} .svc-panel>main{flex:1;min-width:0;padding:calc(var(--sv-space) * 6);outline:none}
${R} main{min-width:0}
${R} .svc-scrim{position:fixed;inset:0;z-index:40;background:var(--sv-overlay);animation:svc-fade-in 160ms cubic-bezier(0.2,0.8,0.2,1)}
${R} .svc-sidebar{display:flex;flex-direction:column;gap:20px;padding:12px}
${R} .svc-brand{display:flex;align-items:center;gap:10px;min-height:40px;padding:0 8px;font-weight:600;letter-spacing:-0.015em}
${R} .svc-brand-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
${R} .svc-brand-name a{color:var(--sv-fg);text-decoration:none}
${R} .svc-mark{flex:none;width:24px;height:24px}
${R} .svc-mark-tile{fill:var(--sv-fg)}
${R} .svc-mark-strut{stroke:var(--sv-bg);stroke-width:2.2;stroke-linecap:round}
${R} .svc-mark-vane{fill:var(--sv-accent)}
${R} .svc-nav-group ul{list-style:none;margin:0;padding:0;display:grid;gap:1px}
${R} .svc-nav-heading{display:flex;align-items:center;height:28px;padding:0 8px;font-size:var(--sv-font-size-sm);font-weight:500;color:var(--sv-fg-muted)}
${R} .svc-nav-link{display:flex;align-items:center;gap:10px;min-height:var(--sv-control-height);padding:0 8px;border:1px solid transparent;border-radius:var(--sv-radius-md);color:var(--sv-fg-muted);text-decoration:none;transition:background-color 100ms,color 100ms}
${R} .svc-nav-link:hover{background:var(--sv-surface-muted);color:var(--sv-fg)}
${R} .svc-nav-link[aria-current="page"]{background:var(--sv-surface);border-color:var(--sv-border);box-shadow:var(--sv-shadow-sm);color:var(--sv-fg);font-weight:500}
${R} .svc-nav-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
${R} .svc-nav-badge{font-family:var(--sv-font-mono);font-size:var(--sv-font-size-sm);font-variant-numeric:tabular-nums;color:var(--sv-fg-muted)}
${R} .svc-topbar{display:flex;align-items:center;gap:8px;min-height:48px;padding:8px calc(var(--sv-space) * 6);border-bottom:1px solid var(--sv-border)}
${R} .svc-topbar-menu{display:none}
${R} .svc-topbar-search{flex:1;min-width:0}
${R} .svc-topbar-search .svc-button{width:min(320px,100%);justify-content:flex-start;color:var(--sv-fg-muted);background:var(--sv-surface-subtle);border-color:var(--sv-border);box-shadow:none;font-weight:400;overflow:hidden}
${R} .svc-topbar-search .svc-button:hover{background:var(--sv-surface-muted)}
${R} .svc-topbar-search kbd{margin-left:auto}
${R} .svc-topbar-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:8px;min-width:0}
${R} .svc-topbar-actions>span{display:inline-flex;align-items:center;gap:6px;font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} .svc-topbar-actions .svc-select select{width:auto}
${R} .svc-page-header{display:grid;gap:8px;margin-bottom:calc(var(--sv-space) * 6)}
${R} .svc-page-header-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;min-height:36px}
${R} .svc-page-title{flex:1 1 16rem;min-width:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px}
${R} .svc-page-meta{color:var(--sv-fg-muted);font-size:var(--sv-font-size);font-variant-numeric:tabular-nums}
${R} .svc-page-actions{display:flex;flex-wrap:wrap;gap:8px}
${R} [data-sv-part="breadcrumbs"] ol{display:flex;flex-wrap:wrap;gap:4px;list-style:none;margin:0;padding:0;font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} [data-sv-part="breadcrumbs"] li+li::before{content:"/";margin-right:4px;opacity:0.6}
${R} [data-sv-part="breadcrumbs"] a{color:var(--sv-fg-muted);text-decoration:none}
${R} [data-sv-part="breadcrumbs"] a:hover{color:var(--sv-fg);text-decoration:underline}
${R} [data-sv-part="breadcrumbs"] [aria-current="page"]{color:var(--sv-fg)}
${R} .svc-auth{position:relative;display:flex;flex-direction:column;align-items:center;gap:24px;min-height:100vh;min-height:100dvh;padding:12vh 16px 64px;background:var(--sv-bg)}
${R} .svc-auth::before{content:"";position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(var(--sv-input) 1px,transparent 1px);background-size:24px 24px;opacity:0.35;-webkit-mask-image:radial-gradient(ellipse 60% 55% at 50% 38%,var(--sv-fg) 20%,transparent 75%);mask-image:radial-gradient(ellipse 60% 55% at 50% 38%,var(--sv-fg) 20%,transparent 75%)}
${R} .svc-auth>*{position:relative}
${R} .svc-auth-top{display:flex;align-items:center;gap:10px}
${R} .svc-auth-app{font-size:1rem;font-weight:600;letter-spacing:-0.015em}
${R} .svc-auth-card{width:min(400px,100%);padding:32px;background:var(--sv-surface);border:1px solid var(--sv-border);border-radius:calc(var(--sv-radius-lg) * 1.34);box-shadow:var(--sv-shadow-sm)}
${R} .svc-auth-card h1{margin-bottom:24px}
${R} [data-sv-part="sign-in"]{display:grid;gap:16px}
${R} [data-sv-part="sign-in"] .svc-field{margin:0}
${R} [data-sv-part="sign-in"] .svc-button-primary{width:100%;min-height:calc(var(--sv-control-height) + 4px)}
${R} [data-sv-part="form-error"]{color:var(--sv-danger-text);font-size:var(--sv-font-size-sm)}
${R} [data-sv-part="form-error"]:empty{display:none}
@media (max-width:64rem){
${R} .svc-shell{grid-template-columns:minmax(0,1fr)}
${R} .svc-shell-nav{display:none}
${R} .svc-shell[data-nav-open] .svc-shell-nav{display:block;position:fixed;inset:0 auto 0 0;z-index:50;width:min(288px,85vw);background:var(--sv-bg);border-right:1px solid var(--sv-border);box-shadow:var(--sv-shadow-pop);animation:svc-slide-in 220ms cubic-bezier(0.2,0.8,0.2,1)}
${R} .svc-shell-body{padding:0}
${R} .svc-panel{border:0;border-radius:0;box-shadow:none}
${R} .svc-topbar{padding:8px 16px}
${R} .svc-topbar-menu{display:block}
${R} .svc-panel>main{padding:16px}
}
@media (max-width:40rem){
${R} .svc-topbar{flex-wrap:wrap}
${R} .svc-topbar-search kbd{display:none}
${R} .svc-topbar-search{order:3;flex:1 1 100%}
${R} .svc-topbar-search .svc-button{width:100%}
${R} .svc-topbar-actions{margin-left:auto}
${R} .svc-auth{padding-top:8vh}
${R} .svc-auth-card{padding:24px}
}
`
