/**
 * Crisp's surface CSS: cards, badges, alerts, the dense table, chips, skeletons, dialogs,
 * popovers and toasts.
 *
 * Borders, not shadows: only floating layers (dialogs, popovers, toasts) cast `--sv-shadow-pop`.
 * Status is a dot plus a word on a quiet tint; tints are only for alerts and selection.
 *
 * @module
 */
import { R } from './base.ts'

/** Content surfaces and floating layers. */
export const SURFACES_CSS: string = `
${R} .svc-card{min-width:0;padding:16px;background:var(--sv-surface);border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg)}
${R} .svc-card>h2:first-child,${R} .svc-card>h3:first-child{margin-bottom:12px}
${R} .svc-badge{display:inline-flex;align-items:center;gap:6px;max-width:100%;min-height:22px;padding:0 8px;border:1px solid var(--sv-border);border-radius:999px;background:var(--sv-surface);color:var(--sv-fg);font-size:var(--sv-font-size-sm);font-weight:500;line-height:1.2;white-space:nowrap}
${R} .svc-badge.svc-tone-accent .svc-dot,${R} .svc-toast.svc-tone-info .svc-dot{background:var(--sv-accent)}
${R} .svc-badge.svc-tone-success .svc-dot,${R} .svc-toast.svc-tone-success .svc-dot{background:var(--sv-success)}
${R} .svc-badge.svc-tone-warning .svc-dot{background:var(--sv-warning)}
${R} .svc-badge.svc-tone-danger .svc-dot,${R} .svc-toast.svc-tone-danger .svc-dot{background:var(--sv-danger)}
${R} .svc-alert{margin:0 0 12px;padding:10px 12px;border:1px solid var(--sv-border);border-radius:var(--sv-radius-md);background:var(--sv-surface-subtle);color:var(--sv-fg);overflow-wrap:anywhere}
${R} .svc-alert:focus-visible{outline-offset:1px}
${R} .svc-alert.svc-tone-info{background:var(--sv-accent-subtle);border-color:var(--sv-accent-subtle);color:var(--sv-fg)}
${R} .svc-alert.svc-tone-success{background:var(--sv-success-subtle);border-color:var(--sv-success-subtle);color:var(--sv-success-text)}
${R} .svc-alert.svc-tone-warning{background:var(--sv-warning-subtle);border-color:var(--sv-warning-subtle);color:var(--sv-warning-text)}
${R} .svc-alert.svc-tone-danger{background:var(--sv-danger-subtle);border-color:var(--sv-danger-subtle);color:var(--sv-danger-text)}
${R} .svc-table-scroll{position:relative;max-width:100%;overflow-x:auto;background:var(--sv-surface);border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg);scrollbar-width:thin}
${R} .svc-table{width:100%;border-collapse:separate;border-spacing:0;font-size:var(--sv-font-size);font-variant-numeric:tabular-nums}
${R} .svc-table caption{padding:10px 12px;text-align:left;font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted);caption-side:top}
${R} .svc-table th,${R} .svc-table td{height:var(--sv-row-height);padding:0 12px;text-align:left;white-space:nowrap;border-bottom:1px solid var(--sv-border)}
${R} .svc-table tbody tr:last-child>*{border-bottom:0}
${R} .svc-table thead th{position:sticky;top:0;z-index:1;height:calc(var(--sv-row-height) * 0.9);background:var(--sv-surface-subtle);color:var(--sv-fg-muted);font-size:var(--sv-font-size-sm);font-weight:500}
${R} .svc-table th button{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:none;color:inherit;font:inherit;cursor:pointer}
${R} .svc-table th button:hover{color:var(--sv-fg)}
${R} .svc-table th[aria-sort="ascending"],${R} .svc-table th[aria-sort="descending"]{color:var(--sv-fg)}
${R} .svc-table tbody tr{transition:background-color 100ms}
${R} .svc-table tbody tr:hover{background:var(--sv-surface-subtle)}
${R} .svc-table tbody tr[aria-selected="true"]{background:var(--sv-accent-subtle)}
${R} .svc-table td a{color:var(--sv-fg);font-weight:500;text-decoration:none}
${R} .svc-table td a:hover{color:var(--sv-accent-text);text-decoration:underline}
${R} .svc-table td .svc-button-sm{min-height:calc(var(--sv-row-height) * 0.65)}
${R} .svc-chip{display:inline-flex;align-items:center;gap:2px;max-width:100%;min-height:26px;padding:0 2px 0 8px;border:1px solid var(--sv-border);border-radius:var(--sv-radius-sm);background:var(--sv-surface-subtle);font-size:var(--sv-font-size-sm)}
${R} .svc-chip-label{min-width:0;overflow-wrap:anywhere}
${R} .svc-chip .svc-button{min-height:22px;min-width:22px;padding:0 4px;box-shadow:none}
${R} .svc-skeleton{display:grid;gap:10px;padding:12px 0}
${R} .svc-skeleton span{display:block;height:12px;border-radius:var(--sv-radius-sm);background:var(--sv-surface-muted);animation:svc-pulse 1.6s ease-in-out infinite}
${R} .svc-skeleton span:nth-child(3n+2){width:80%}
${R} .svc-skeleton span:nth-child(3n){width:60%}
${R} .svc-overlay{position:fixed;inset:0;z-index:60;display:grid;place-items:start center;padding:12vh 16px 16px;overflow-y:auto;background:var(--sv-overlay);animation:svc-fade-in 160ms cubic-bezier(0.2,0.8,0.2,1)}
${R} .svc-dialog{width:min(520px,100%);padding:20px;background:var(--sv-surface);color:var(--sv-fg);border:1px solid var(--sv-border);border-radius:calc(var(--sv-radius-lg) * 1.34);box-shadow:var(--sv-shadow-pop);outline:none;animation:svc-pop-in 140ms cubic-bezier(0.2,0.8,0.2,1)}
${R} .svc-dialog-sm{width:min(420px,100%)}
${R} .svc-dialog-lg{width:min(640px,100%)}
${R} .svc-dialog-title{font-size:0.875rem;font-weight:600;margin-bottom:6px}
${R} .svc-dialog-description{color:var(--sv-fg-muted);margin-bottom:16px}
${R} .svc-dialog .svc-field:last-child{margin-bottom:0}
${R} .svc-dialog-footer{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;margin-top:20px}
${R} .svc-popover{position:absolute;z-index:30;min-width:200px;max-width:calc(100vw - 32px);max-height:min(420px,70vh);overflow-y:auto;padding:4px;background:var(--sv-surface);border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg);box-shadow:var(--sv-shadow-pop);animation:svc-pop-in 140ms cubic-bezier(0.2,0.8,0.2,1)}
${R} .svc-popover>div{display:flex;align-items:center;gap:8px;min-height:var(--sv-control-height);padding:0 8px;border-radius:var(--sv-radius-md)}
${R} .svc-popover>div:hover{background:var(--sv-surface-subtle)}
${R} .svc-popover label{flex:1;cursor:pointer}
${R} [data-sv-part="toasts"]{position:fixed;right:16px;bottom:16px;left:16px;z-index:70;display:grid;justify-items:end;gap:8px;pointer-events:none}
${R} .svc-toast{display:flex;flex-wrap:wrap;align-items:center;gap:8px;max-width:min(420px,100%);padding:8px 8px 8px 12px;background:var(--sv-surface);color:var(--sv-fg);border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg);box-shadow:var(--sv-shadow-pop);pointer-events:auto;animation:svc-rise-in 220ms cubic-bezier(0.2,0.8,0.2,1)}
${R} .svc-toast-message{flex:1 1 12rem;min-width:0;overflow-wrap:anywhere}
${R} .svc-toast .svc-button{box-shadow:none}
@media (max-width:40rem){
${R} [data-sv-part="toasts"]{justify-items:stretch}
${R} .svc-toast{max-width:100%}
${R} .svc-overlay{padding-top:8vh}
}
`
