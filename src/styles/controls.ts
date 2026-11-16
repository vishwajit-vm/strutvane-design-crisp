/**
 * Crisp's control CSS: buttons, inputs, select, checkbox and form fields.
 *
 * Heights follow `--density` through `--sv-control-height` (32 px at density 1, 28 px small),
 * corners follow `--radius`. The input outline uses the `input` role, which reaches 3:1 against
 * the surface in both themes (WCAG 1.4.11).
 *
 * @module
 */
import { R } from './base.ts'

/** Buttons, inputs and fields. */
export const CONTROLS_CSS: string = `
${R} .svc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;max-width:100%;min-height:var(--sv-control-height);padding:0 12px;border:1px solid var(--sv-border);border-radius:var(--sv-radius-md);background:var(--sv-surface);color:var(--sv-fg);font:inherit;font-weight:500;line-height:1.2;white-space:nowrap;cursor:pointer;box-shadow:var(--sv-shadow-sm);transition:background-color 140ms,border-color 140ms,color 140ms}
${R} .svc-button:hover{background:var(--sv-surface-subtle);border-color:var(--sv-input)}
${R} .svc-button:active{background:var(--sv-surface-muted)}
${R} .svc-button:disabled,${R} .svc-button[aria-disabled="true"]{opacity:0.55;cursor:not-allowed}
${R} .svc-button-primary{background:var(--sv-accent);border-color:var(--sv-accent);color:var(--sv-accent-fg)}
${R} .svc-button-primary:hover{background:var(--sv-accent-hover);border-color:var(--sv-accent-hover)}
${R} .svc-button-primary:active{background:var(--sv-accent-hover)}
${R} .svc-button-danger{background:var(--sv-danger);border-color:var(--sv-danger);color:var(--sv-danger-fg)}
${R} .svc-button-danger:hover,${R} .svc-button-danger:active{background:var(--sv-danger-hover);border-color:var(--sv-danger-hover)}
${R} .svc-button-ghost{background:transparent;border-color:transparent;box-shadow:none;color:var(--sv-fg-muted)}
${R} .svc-button-ghost:hover{background:var(--sv-surface-muted);border-color:transparent;color:var(--sv-fg)}
${R} .svc-button-sm{min-height:calc(var(--sv-control-height) * 0.875);padding:0 8px;font-size:var(--sv-font-size-sm);gap:4px}
${R} .svc-button-icon{padding:0;width:var(--sv-control-height);min-width:var(--sv-control-height)}
${R} .svc-button-icon.svc-button-sm{width:calc(var(--sv-control-height) * 0.875);min-width:calc(var(--sv-control-height) * 0.875)}
${R} .svc-button[aria-pressed="true"]{background:var(--sv-accent-subtle);border-color:var(--sv-accent);color:var(--sv-fg)}
${R} .svc-control{width:100%;max-width:100%;min-height:var(--sv-control-height);padding:5px 10px;border:1px solid var(--sv-input);border-radius:var(--sv-radius-md);background:var(--sv-surface);color:var(--sv-fg);font:inherit;line-height:1.4;transition:border-color 140ms}
${R} .svc-control::placeholder{color:var(--sv-fg-muted);opacity:1}
${R} .svc-control:hover{border-color:var(--sv-fg-muted)}
${R} .svc-control:focus-visible{border-color:var(--sv-accent);outline:2px solid var(--sv-ring);outline-offset:1px}
${R} .svc-control:disabled{background:var(--sv-surface-subtle);color:var(--sv-fg-muted);cursor:not-allowed}
${R} .svc-control[aria-invalid="true"]{border-color:var(--sv-danger)}
${R} .svc-control[aria-invalid="true"]:focus-visible{outline-color:var(--sv-danger)}
${R} .svc-textarea{min-height:calc(var(--sv-control-height) * 2.5);resize:vertical}
${R} .svc-select{position:relative;display:inline-flex;align-items:center;max-width:100%;min-width:0}
${R} .svc-select select{appearance:none;-webkit-appearance:none;padding-right:30px;cursor:pointer}
${R} .svc-select-chevron{position:absolute;right:9px;width:14px;height:14px;pointer-events:none;color:var(--sv-fg-muted)}
${R} .svc-checkbox{width:16px;height:16px;margin:0;accent-color:var(--sv-accent);cursor:pointer;vertical-align:middle}
${R} .svc-field{display:grid;gap:6px;min-width:0;margin-bottom:calc(var(--sv-space) * 4)}
${R} .svc-field>.svc-select{display:flex}
${R} .svc-field>.svc-select select{width:100%}
${R} .svc-label{font-weight:500;color:var(--sv-fg)}
${R} .svc-required{margin-left:2px;color:var(--sv-danger-text)}
${R} .svc-help{color:var(--sv-fg-muted);font-size:var(--sv-font-size-sm)}
${R} .svc-error{display:flex;align-items:flex-start;gap:6px;color:var(--sv-danger-text);font-size:var(--sv-font-size-sm)}
${R} .svc-error .svc-icon{margin-top:1px}
`
