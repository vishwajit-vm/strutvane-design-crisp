/**
 * Crisp's CSS for the parts the behaviour renders itself and marks with `data-sv-part`: the list
 * toolbar and filters, filter chips, pagination, record details, related lists, empty and error
 * states, forms, the command palette and the shortcuts help.
 *
 * These hooks are the behaviour's public styling surface (the `data-sv-part` names in
 * `@strutvane/ui`); a design never needs to know the behaviour's components.
 *
 * @module
 */
import { R } from './base.ts'

/** Styling for the behaviour's own parts. */
export const PARTS_CSS: string = `
${R} [data-sv-part="list"],${R} [data-sv-part="detail"],${R} [data-sv-part="home"]{display:grid;gap:12px;min-width:0}
${R} [data-sv-part="list"]>[role="status"]:empty,${R} [data-sv-part="palette-list"]+[role="status"]:empty{display:none}
${R} [data-sv-part="list"]>[role="status"]{font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} [data-sv-part="toolbar"]{display:flex;flex-wrap:wrap;align-items:flex-end;gap:8px}
${R} [data-sv-part="toolbar"]>*{min-width:0}
${R} [data-sv-part="toolbar"]>div:first-child{display:grid;gap:4px;flex:1 1 16rem;max-width:22rem}
${R} [data-sv-part="toolbar"] label,${R} [data-sv-part="filters"] label{font-size:var(--sv-font-size-sm);font-weight:500;color:var(--sv-fg-muted)}
${R} [data-sv-part="filters"] form{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;padding:8px;border:1px dashed var(--sv-border);border-radius:var(--sv-radius-lg)}
${R} [data-sv-part="filters"] form>*{min-width:0}
${R} [data-sv-part="filters"] .svc-control{width:auto;max-width:14rem}
${R} [data-sv-part="filters"] p{flex-basis:100%;font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} [data-sv-part="filters"] p[role="alert"]{color:var(--sv-danger-text)}
${R} [data-sv-part="chips"]{display:flex;flex-wrap:wrap;align-items:center;gap:6px}
${R} [data-sv-part="chip-list"]{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;min-width:0}
${R} [data-sv-part="menu-anchor"]{position:relative}
${R} [data-sv-part="pagination"]{display:flex;flex-wrap:wrap;align-items:center;gap:4px;font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} [data-sv-part="pagination"] .svc-button{min-width:calc(var(--sv-control-height) * 0.875);font-variant-numeric:tabular-nums}
${R} [data-sv-part="pagination"] [aria-current="page"]{background:var(--sv-accent);border-color:var(--sv-accent);color:var(--sv-accent-fg)}
${R} [data-sv-part="pagination"] select{width:auto}
${R} [data-sv-part="details"]{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(240px,100%),1fr));gap:16px 24px;margin:0}
${R} [data-sv-part="details"]>div{display:grid;gap:2px;min-width:0}
${R} [data-sv-part="details"] dt{font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} [data-sv-part="details"] dd{margin:0;overflow-wrap:anywhere}
${R} [data-sv-part="related"]{display:grid;gap:8px;margin-top:12px;min-width:0}
${R} [data-sv-part="empty"]{display:grid;justify-items:center;gap:8px;padding:48px 24px;text-align:center;color:var(--sv-fg-muted)}
${R} [data-sv-part="empty"] .svc-art{width:120px;height:96px;margin-bottom:8px}
${R} [data-sv-part="empty"] p{max-width:28rem}
${R} [data-sv-part="empty"] .svc-button{margin-top:8px}
${R} .svc-art-surface{fill:var(--sv-surface)}
${R} .svc-art-subtle{fill:var(--sv-surface-subtle)}
${R} .svc-art-line{stroke:var(--sv-fg-muted);stroke-opacity:0.4}
${R} .svc-art-muted{stroke:var(--sv-fg-muted)}
${R} .svc-art-thick{stroke-width:3;stroke-linecap:round}
${R} .svc-art-mid{stroke-width:2.4;stroke-linecap:round}
${R} .svc-art-dotted{stroke-width:3;stroke-linecap:round;stroke-dasharray:1 6}
${R} .svc-art-accent{fill:var(--sv-accent)}
${R} .svc-art-on-accent{stroke:var(--sv-accent-fg);stroke-width:2.4;stroke-linecap:round}
${R} .svc-art-accent-line{stroke:var(--sv-accent);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
${R} [data-sv-part="form"]{display:grid;gap:0;max-width:44rem;min-width:0}
${R} [data-sv-part="form"] fieldset{min-width:0;margin:0 0 16px;padding:12px 16px 4px;border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg)}
${R} [data-sv-part="form"] legend{padding:0 4px;font-weight:600}
${R} [data-sv-part="form-actions"]{position:sticky;bottom:0;z-index:2;display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;padding:12px 0;background:var(--sv-surface);border-top:1px solid var(--sv-border)}
${R} [data-sv-part="loading"]{padding:24px;color:var(--sv-fg-muted)}
${R} [data-sv-part="palette-list"]{list-style:none;margin:8px -20px 0;padding:4px 8px;max-height:min(420px,50vh);overflow-y:auto;border-top:1px solid var(--sv-border)}
${R} [data-sv-part="palette-list"] [role="option"]{display:flex;align-items:center;gap:8px;min-height:36px;padding:0 10px;border-radius:var(--sv-radius-md);cursor:pointer;overflow-wrap:anywhere}
${R} [data-sv-part="palette-list"] [aria-selected="true"]{background:var(--sv-accent-subtle)}
${R} [data-sv-part="palette-group"]{padding:10px 10px 4px;font-size:var(--sv-font-size-sm);font-weight:500;color:var(--sv-fg-muted)}
${R} [data-sv-part="palette-hint"]{margin-left:auto;font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} [data-sv-part="palette-list"]+[role="status"]{padding:8px 0 0;font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} .svc-dialog [role="combobox"]{min-height:calc(var(--sv-control-height) + 8px);font-size:0.875rem}
${R} [data-sv-part="shortcuts"]{display:grid;gap:2px;margin:0}
${R} [data-sv-part="shortcuts"]>div{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:32px;padding:0 4px;border-bottom:1px solid var(--sv-border)}
${R} [data-sv-part="shortcuts"]>div:last-child{border-bottom:0}
${R} [data-sv-part="shortcuts"] dt{order:2;display:flex;gap:4px}
${R} [data-sv-part="shortcuts"] dd{margin:0;color:var(--sv-fg-muted)}
${R} [data-sv-part="back"]{color:var(--sv-fg-muted)}
`
