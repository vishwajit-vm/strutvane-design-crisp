// @vitest-environment jsdom
/**
 * Crisp's component skins: each renders the native element the contract asks for, spreads the
 * behaviour's props and refs onto it, and draws Crisp's classes and icons.
 */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { crisp } from '../src/index.ts'
import { isGlyphLabel } from '../src/skins/button.tsx'

afterEach(cleanup)

const {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  Field,
  Icon,
  Input,
  Popover,
  Select,
  Skeleton,
  Table,
  Textarea,
  Toast,
} = crisp.skins

describe('Button', () => {
  it('is a secondary, medium, type="button" button by default', () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button.getAttribute('type')).toBe('button')
    expect(button.className).toBe('svc-button svc-button-secondary')
  })

  it('applies the variant, size, type and extra class, and spreads the rest', () => {
    const onClick = vi.fn()
    const ref = createRef<HTMLButtonElement>()
    render(
      <Button variant="primary" size="sm" type="submit" className="x" onClick={onClick} ref={ref}>
        Create
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Create' })
    expect(button.className).toBe('svc-button svc-button-primary svc-button-sm x')
    expect(button.getAttribute('type')).toBe('submit')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
    expect(ref.current).toBe(button)
  })

  it('draws the named icon before the label', () => {
    render(<Button icon="plus">New invoice</Button>)
    const button = screen.getByRole('button', { name: 'New invoice' })
    const svg = button.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('svc-icon svc-icon-md')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
    expect(button.textContent).toBe('New invoice')
  })

  it('draws a small icon in a small button', () => {
    render(
      <Button icon="arrow-left" size="sm">
        Back
      </Button>,
    )
    expect(screen.getByRole('button').querySelector('svg')?.getAttribute('class')).toContain(
      'svc-icon-sm',
    )
  })

  it('replaces a glyph label with its icon, keeping the accessible name', () => {
    render(
      <Button icon="menu" aria-label="Open menu">
        ☰
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Open menu' })
    expect(button.textContent).toBe('')
    expect(button.className).toContain('svc-button-icon')
    expect(button.querySelector('svg')).not.toBeNull()
  })

  it('keeps a glyph label when there is no icon to draw instead', () => {
    render(<Button aria-label="Remove filter">×</Button>)
    expect(screen.getByRole('button', { name: 'Remove filter' }).textContent).toBe('×')
  })

  it('recognises glyph-only labels', () => {
    expect(isGlyphLabel('☰')).toBe(true)
    expect(isGlyphLabel(' × ')).toBe(true)
    expect(isGlyphLabel('Back')).toBe(false)
    expect(isGlyphLabel('2')).toBe(false)
    expect(isGlyphLabel('')).toBe(false)
    expect(isGlyphLabel(<span>☰</span>)).toBe(false)
    expect(isGlyphLabel(undefined)).toBe(false)
  })
})

describe('Icon', () => {
  it('draws a known Tabler icon, decorative and unfocusable', () => {
    const { container } = render(<Icon name="search" size="sm" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('svc-icon svc-icon-sm')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
    expect(svg?.getAttribute('focusable')).toBe('false')
  })

  it('draws nothing for an unknown name, or a prototype key', () => {
    for (const name of ['no-such-icon', 'constructor', '__proto__', 'toString']) {
      const { container } = render(<Icon name={name} />)
      expect(container.innerHTML).toBe('')
      cleanup()
    }
  })
})

describe('form controls', () => {
  it('Input spreads every prop and the ref onto a native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input id="email" type="email" aria-invalid className="wide" ref={ref} />)
    const input = document.getElementById('email')
    expect(input?.tagName).toBe('INPUT')
    expect(input?.getAttribute('type')).toBe('email')
    expect(input?.className).toBe('svc-control wide')
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(ref.current).toBe(input)
  })

  it('Textarea renders a native textarea', () => {
    render(<Textarea id="notes" rows={3} />)
    const textarea = document.getElementById('notes')
    expect(textarea?.tagName).toBe('TEXTAREA')
    expect(textarea?.className).toBe('svc-control svc-textarea')
  })

  it('Select keeps the native select and adds a decorative chevron', () => {
    const onChange = vi.fn()
    render(
      <Select id="status" value="b" onChange={onChange}>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    )
    const select = screen.getByRole('combobox')
    expect(select.id).toBe('status')
    fireEvent.change(select, { target: { value: 'a' } })
    expect(onChange).toHaveBeenCalledOnce()
    const chevron = select.parentElement?.querySelector('svg')
    expect(chevron?.getAttribute('aria-hidden')).toBe('true')
    expect(select.parentElement?.className).toBe('svc-select')
  })

  it('Checkbox is a native checkbox', () => {
    render(<Checkbox id="paid" defaultChecked />)
    const box = screen.getByRole('checkbox')
    expect(box.getAttribute('type')).toBe('checkbox')
    expect((box as HTMLInputElement).checked).toBe(true)
  })

  it('Field wires the label, required marker, help and error', () => {
    render(
      <Field
        label="Due date"
        htmlFor="due"
        required
        help="When it must be paid"
        helpId="due-help"
        error="Choose a date"
        errorId="due-error"
        name="dueAt"
      >
        <Input id="due" aria-describedby="due-help due-error" />
      </Field>,
    )
    const input = screen.getByLabelText(/Due date/)
    expect(input.id).toBe('due')
    expect(document.getElementById('due-help')?.textContent).toBe('When it must be paid')
    expect(document.getElementById('due-error')?.textContent).toBe('Choose a date')
    expect(document.querySelector('.svc-required')?.getAttribute('aria-hidden')).toBe('true')
    expect(document.querySelector('[data-sv-field="dueAt"]')).not.toBeNull()
  })

  it('Field without help, error or required renders only label and control', () => {
    const { container } = render(
      <Field label="Name" htmlFor="n" required={false}>
        <Input id="n" />
      </Field>,
    )
    expect(container.querySelector('.svc-help')).toBeNull()
    expect(container.querySelector('.svc-error')).toBeNull()
    expect(container.querySelector('.svc-required')).toBeNull()
  })
})

describe('surfaces', () => {
  it('Card is a section with an optional heading and spread props', () => {
    render(
      <Card heading={<h2>Details</h2>} aria-label="Fields" className="c">
        <p>Body</p>
      </Card>,
    )
    const card = screen.getByRole('region', { name: 'Fields' })
    expect(card.className).toBe('svc-card c')
    expect(card.querySelector('h2')?.textContent).toBe('Details')
  })

  it('Badge says its status in words, with a decorative dot', () => {
    for (const tone of ['neutral', 'accent', 'success', 'warning', 'danger'] as const) {
      const { container } = render(<Badge tone={tone}>{tone}</Badge>)
      const badge = container.querySelector('.svc-badge')
      expect(badge?.className).toBe(`svc-badge svc-tone-${tone}`)
      expect(badge?.textContent).toBe(tone)
      expect(badge?.querySelector('.svc-dot')?.getAttribute('aria-hidden')).toBe('true')
      cleanup()
    }
  })

  it('Alert spreads role, tabIndex and the ref, so a banner can take focus', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Alert tone="danger" role="alert" tabIndex={-1} ref={ref}>
        Fix 3 fields
      </Alert>,
    )
    const alert = screen.getByRole('alert')
    expect(alert.className).toBe('svc-alert svc-tone-danger')
    expect(ref.current).toBe(alert)
    alert.focus()
    expect(document.activeElement).toBe(alert)
  })

  it('Table puts the region props on a positioned scroll box and the density on the table', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Table
        regionProps={{ ref, role: 'region', 'aria-label': 'Invoices table', tabIndex: 0 }}
        tableProps={{ 'aria-rowcount': 3 }}
        density="compact"
      >
        <caption>Invoices</caption>
        <tbody>
          <tr>
            <td>INV-1</td>
          </tr>
        </tbody>
      </Table>,
    )
    const region = screen.getByRole('region', { name: 'Invoices table' })
    expect(ref.current).toBe(region)
    expect(region.className).toBe('svc-table-scroll')
    const table = screen.getByRole('table', { name: 'Invoices' })
    expect(table.getAttribute('data-sv-density')).toBe('compact')
    expect(table.getAttribute('aria-rowcount')).toBe('3')
  })

  it('Chip shows the filter and its remove button', () => {
    render(<Chip remove={<button type="button">Remove</button>}>Status: Open</Chip>)
    expect(screen.getByText('Status: Open').className).toBe('svc-chip-label')
    expect(screen.getByRole('button', { name: 'Remove' })).not.toBeNull()
  })

  it('Skeleton draws 1 to 20 decorative lines, whatever it is asked for', () => {
    const count = (lines: number) => {
      const { container } = render(<Skeleton lines={lines} />)
      const n = container.querySelectorAll('.svc-skeleton span').length
      expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true')
      cleanup()
      return n
    }
    expect(count(5)).toBe(5)
    expect(count(0)).toBe(1)
    expect(count(-3)).toBe(1)
    expect(count(500)).toBe(20)
    expect(count(2.7)).toBe(2)
    expect(count(Number.NaN)).toBe(1)
  })
})

describe('floating layers', () => {
  it('Dialog spreads the panel and overlay props and places the title and description ids', () => {
    const onMouseDown = vi.fn()
    render(
      <Dialog
        overlayProps={{ onMouseDown }}
        panelProps={{
          role: 'alertdialog',
          'aria-modal': true,
          'aria-labelledby': 't',
          'aria-describedby': 'd',
        }}
        title="Delete invoice?"
        titleId="t"
        description="This can't be undone."
        descriptionId="d"
        footer={<button type="button">Delete</button>}
        size="sm"
      >
        <p>Body</p>
      </Dialog>,
    )
    const dialog = screen.getByRole('alertdialog', { name: 'Delete invoice?' })
    expect(dialog.className).toBe('svc-dialog svc-dialog-sm')
    expect(dialog.getAttribute('aria-describedby')).toBe('d')
    expect(document.getElementById('d')?.textContent).toBe("This can't be undone.")
    expect(dialog.querySelector('.svc-dialog-footer button')).not.toBeNull()
    fireEvent.mouseDown(dialog.parentElement as HTMLElement)
    expect(onMouseDown).toHaveBeenCalledOnce()
  })

  it('Dialog without description or footer is medium and renders neither', () => {
    render(
      <Dialog
        overlayProps={{}}
        panelProps={{ role: 'dialog', 'aria-labelledby': 't2' }}
        title="Shortcuts"
        titleId="t2"
      />,
    )
    const dialog = screen.getByRole('dialog', { name: 'Shortcuts' })
    expect(dialog.className).toBe('svc-dialog svc-dialog-md')
    expect(dialog.querySelector('.svc-dialog-description')).toBeNull()
    expect(dialog.querySelector('.svc-dialog-footer')).toBeNull()
  })

  it('Popover spreads the panel props', () => {
    render(
      <Popover panelProps={{ role: 'group', 'aria-label': 'Columns', id: 'cols' }}>
        <div>Name</div>
      </Popover>,
    )
    const panel = screen.getByRole('group', { name: 'Columns' })
    expect(panel.id).toBe('cols')
    expect(panel.className).toBe('svc-popover')
  })

  it('Toast shows the tone, message, action and dismiss button', () => {
    render(
      <Toast
        tone="success"
        action={<button type="button">Undo</button>}
        dismiss={<button type="button">Dismiss</button>}
      >
        Invoice deleted
      </Toast>,
    )
    const toast = screen.getByText('Invoice deleted').parentElement
    expect(toast?.className).toBe('svc-toast svc-tone-success')
    expect(screen.getByRole('button', { name: 'Undo' })).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Dismiss' })).not.toBeNull()
  })
})
