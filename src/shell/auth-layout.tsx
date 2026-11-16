/**
 * Crisp's signed-out frame (sign-in, password reset): one centred card on the canvas, over a
 * faint dot grid that fades out toward the edges. One focal point, nothing to read but the form.
 *
 * The behaviour already wraps this slot in `<main>`, so the frame uses plain elements and never
 * adds a second landmark.
 *
 * @module
 */
import type { AuthLayoutProps } from '@strutvane/ui/design'
import type { ReactElement } from 'react'
import { BrandMark } from '../illustrations.tsx'

/**
 * The frame of every signed-out screen: the app name above a 400 px card.
 *
 * @example
 * <AuthLayout appName="Acme"><h1>Sign in to Acme</h1>…</AuthLayout>
 */
export function AuthLayout(props: AuthLayoutProps): ReactElement {
  return (
    <div className="svc-auth" data-sv-part="auth">
      <div className="svc-auth-top">
        <BrandMark />
        <p className="svc-auth-app">{props.appName}</p>
      </div>
      <div className="svc-auth-card">{props.children}</div>
    </div>
  )
}
