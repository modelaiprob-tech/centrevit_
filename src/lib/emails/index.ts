import { Resend } from 'resend'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}
const FROM = 'Centrevit <noreply@centrevit.es>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ''

// ─── PLANTILLA BASE ─────────────────────────────────────────────────────────
function emailBase(content: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F3EA;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="100%" style="max-width:560px;background:#FDFAF6;border-radius:8px;overflow:hidden;border:1px solid #EDE5D4;">
          <!-- Header -->
          <tr>
            <td style="background:#1C3A1E;padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:300;color:#FDFAF6;letter-spacing:0.08em;font-family:Georgia,serif;">
                CENTREVIT
              </p>
              <p style="margin:4px 0 0;font-size:11px;color:#C9A84C;letter-spacing:0.12em;text-transform:uppercase;">
                Centro de Bienestar · Tudela
              </p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#EDE5D4;padding:20px 32px;text-align:center;border-top:1px solid #EDE5D4;">
              <p style="margin:0;font-size:11px;color:#5A7060;">
                C. José Ramón Castro Álava, 41, 2ºA · 31500 Tudela · 679 41 71 38
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#5A7060;">
                <a href="https://centrevit.es" style="color:#33763D;">centrevit.es</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── 1. CONFIRMACIÓN DE RESERVA AL CLIENTE ──────────────────────────────────
export async function sendBookingConfirmationToClient(params: {
  clientName: string
  clientEmail: string
  serviceName: string
  startsAt: Date
}) {
  const dateStr = format(params.startsAt, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Solicitud recibida
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#5A7060;">
      Hola ${params.clientName}, hemos recibido tu solicitud correctamente.
    </p>
    <div style="background:#F7F3EA;border-radius:6px;padding:20px;margin:0 0 24px;border-left:3px solid #C9A84C;">
      <p style="margin:0 0 8px;font-size:12px;color:#5A7060;text-transform:uppercase;letter-spacing:0.08em;">Tratamiento</p>
      <p style="margin:0 0 16px;font-size:16px;color:#1C2B1D;font-weight:500;">${params.serviceName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;text-transform:uppercase;letter-spacing:0.08em;">Fecha solicitada</p>
      <p style="margin:0;font-size:15px;color:#1C2B1D;">${dateStr} a las ${timeStr}h</p>
    </div>
    <p style="margin:0 0 24px;font-size:14px;color:#5A7060;line-height:1.6;">
      Nos pondremos en contacto contigo en las próximas horas para confirmar tu cita.
      Si necesitas contactarnos antes, puedes llamarnos al <strong style="color:#1C2B1D;">679 41 71 38</strong>.
    </p>
    <p style="margin:0;font-size:13px;color:#5A7060;">Un saludo,<br><strong style="color:#1C2B1D;">El equipo de Centrevit</strong></p>
  `

  const resend = getResend()
  if (!resend) return
  return resend.emails.send({
    from: FROM,
    to: params.clientEmail,
    subject: `Solicitud recibida — ${params.serviceName} | Centrevit`,
    html: emailBase(content),
  })
}

// ─── 2. ALERTA AL ADMIN DE NUEVA RESERVA ────────────────────────────────────
export async function sendNewBookingAlertToAdmin(params: {
  clientName: string
  serviceName: string
  startsAt: Date
}) {
  const dateStr = format(params.startsAt, "EEEE, d 'de' MMMM", { locale: es })
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Nueva solicitud de reserva
    </h1>
    <div style="background:#F7F3EA;border-radius:6px;padding:20px;margin:16px 0;border-left:3px solid #33763D;">
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Cliente</p>
      <p style="margin:0 0 12px;font-size:15px;color:#1C2B1D;font-weight:500;">${params.clientName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Servicio</p>
      <p style="margin:0 0 12px;font-size:15px;color:#1C2B1D;">${params.serviceName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Fecha solicitada</p>
      <p style="margin:0;font-size:15px;color:#1C2B1D;">${dateStr} a las ${timeStr}h</p>
    </div>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/reservas"
       style="display:inline-block;background:#33763D;color:#FDFAF6;padding:12px 24px;border-radius:4px;text-decoration:none;font-size:14px;font-weight:500;">
      Ver en el panel
    </a>
  `

  const resend = getResend()
  if (!resend) return
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Nueva reserva — ${params.clientName} · ${params.serviceName}`,
    html: emailBase(content),
  })
}

// ─── 3. CONFIRMACIÓN OFICIAL DE CITA ────────────────────────────────────────
export async function sendBookingConfirmedToClient(params: {
  clientName: string
  clientEmail: string
  serviceName: string
  startsAt: Date
}) {
  const dateStr = format(params.startsAt, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Cita confirmada
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:#5A7060;">
      Hola ${params.clientName}, tu cita está confirmada.
    </p>
    <div style="background:#F7F3EA;border-radius:6px;padding:20px;margin:0 0 24px;border-left:3px solid #33763D;">
      <p style="margin:0 0 8px;font-size:12px;color:#5A7060;text-transform:uppercase;letter-spacing:0.08em;">Tratamiento</p>
      <p style="margin:0 0 16px;font-size:16px;color:#1C2B1D;font-weight:500;">${params.serviceName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;text-transform:uppercase;letter-spacing:0.08em;">Fecha y hora</p>
      <p style="margin:0;font-size:15px;color:#1C2B1D;">${dateStr} a las ${timeStr}h</p>
    </div>
    <p style="margin:0 0 8px;font-size:13px;color:#5A7060;">
      <strong style="color:#1C2B1D;">Dirección:</strong> C. José Ramón Castro Álava, 41, 2ºA, Tudela
    </p>
    <p style="margin:0 0 24px;font-size:13px;color:#5A7060;">
      Si necesitas cancelar o cambiar la cita, contáctanos con al menos 24h de antelación.
    </p>
    <p style="margin:0;font-size:13px;color:#5A7060;">Hasta pronto,<br><strong style="color:#1C2B1D;">Centrevit</strong></p>
  `

  const resend = getResend()
  if (!resend) return
  return resend.emails.send({
    from: FROM,
    to: params.clientEmail,
    subject: `Cita confirmada — ${params.serviceName} · ${timeStr}h | Centrevit`,
    html: emailBase(content),
  })
}

// ─── 4. RECORDATORIO 24H ANTES ──────────────────────────────────────────────
export async function sendReminder24h(params: {
  clientName: string
  clientEmail: string
  serviceName: string
  startsAt: Date
}) {
  const dateStr = format(params.startsAt, "EEEE, d 'de' MMMM", { locale: es })
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Tu cita es mañana
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:#5A7060;">
      Hola ${params.clientName}, te recordamos que mañana tienes una sesión en Centrevit.
    </p>
    <div style="background:#F7F3EA;border-radius:6px;padding:20px;margin:0 0 24px;border-left:3px solid #C9A84C;">
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Tratamiento</p>
      <p style="margin:0 0 12px;font-size:15px;color:#1C2B1D;font-weight:500;">${params.serviceName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Cuándo</p>
      <p style="margin:0;font-size:15px;color:#1C2B1D;">${dateStr} a las ${timeStr}h</p>
    </div>
    <p style="margin:0;font-size:13px;color:#5A7060;">
      Si necesitas cancelar, llámanos al <strong style="color:#1C2B1D;">679 41 71 38</strong> con antelación.
    </p>
  `

  const resend = getResend()
  if (!resend) return
  return resend.emails.send({
    from: FROM,
    to: params.clientEmail,
    subject: `Recordatorio — Tu cita de ${params.serviceName} es mañana | Centrevit`,
    html: emailBase(content),
  })
}

// ─── 5. RECORDATORIO 2H ANTES ───────────────────────────────────────────────
export async function sendReminder2h(params: {
  clientName: string
  clientEmail: string
  serviceName: string
  startsAt: Date
}) {
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Tu cita en 2 horas
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:#5A7060;">
      Hola ${params.clientName}, en menos de 2 horas tienes tu sesión de ${params.serviceName}.
    </p>
    <div style="background:#F7F3EA;border-radius:6px;padding:16px 20px;margin:0 0 24px;border-left:3px solid #C9A84C;">
      <p style="margin:0;font-size:16px;color:#1C2B1D;font-weight:500;">Hoy a las ${timeStr}h</p>
      <p style="margin:4px 0 0;font-size:13px;color:#5A7060;">C. José Ramón Castro Álava, 41, 2ºA · Tudela</p>
    </div>
    <p style="margin:0;font-size:13px;color:#5A7060;">Hasta luego,<br><strong style="color:#1C2B1D;">Centrevit</strong></p>
  `

  const resend = getResend()
  if (!resend) return
  return resend.emails.send({
    from: FROM,
    to: params.clientEmail,
    subject: `Tu cita de ${params.serviceName} es en 2 horas | Centrevit`,
    html: emailBase(content),
  })
}
