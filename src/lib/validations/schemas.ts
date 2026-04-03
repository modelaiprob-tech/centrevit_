import { z } from 'zod'

export const createBookingSchema = z.object({
  client_name:  z.string().min(2, 'Nombre requerido').max(100).trim(),
  client_email: z.string().email('Email inválido').toLowerCase().trim(),
  client_phone: z.string().regex(/^[0-9\s\+\-]{9,15}$/, 'Teléfono inválido').optional(),
  service_id:   z.string().uuid('Servicio inválido'),
  starts_at:    z.string().datetime(),
  notes:        z.string().max(500).optional(),
})

export const updateBookingSchema = z.object({
  status:        z.enum(['pending', 'confirmed', 'cancelled', 'done']).optional(),
  internal_notes: z.string().max(1000).optional(),
  price_charged: z.number().positive().optional(),
  payment_status: z.enum(['unpaid', 'paid', 'partial']).optional(),
  followup_done: z.boolean().optional(),
})

export const createClientSchema = z.object({
  name:           z.string().min(2).max(100).trim(),
  email:          z.string().email().toLowerCase().trim(),
  phone:          z.string().optional(),
  birth_date:     z.string().optional(),
  allergies:      z.string().max(1000).optional(),
  medical_notes:  z.string().max(2000).optional(),
  general_notes:  z.string().max(2000).optional(),
  source:         z.string().max(100).optional(),
})

export const createServiceSchema = z.object({
  name:           z.string().min(2).max(100).trim(),
  slug:           z.string().regex(/^[a-z0-9-]+$/).min(2).max(50),
  duration:       z.number().int().positive().max(480),
  price:          z.number().positive().optional(),
  description:    z.string().max(2000).optional(),
  followup_days:  z.number().int().min(1).max(365).optional(),
  followup_notes: z.string().max(500).optional(),
})

export const createPaymentSchema = z.object({
  booking_id: z.string().uuid().optional(),
  client_id:  z.string().uuid().optional(),
  amount:     z.number().positive(),
  method:     z.enum(['cash', 'card', 'transfer']),
  notes:      z.string().max(500).optional(),
  paid_at:    z.string().datetime().optional(),
})

export type CreateBookingInput  = z.infer<typeof createBookingSchema>
export type UpdateBookingInput  = z.infer<typeof updateBookingSchema>
export type CreateClientInput   = z.infer<typeof createClientSchema>
export type CreateServiceInput  = z.infer<typeof createServiceSchema>
export type CreatePaymentInput  = z.infer<typeof createPaymentSchema>
