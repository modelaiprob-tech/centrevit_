'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface GraficaServiciosProps {
  data: { service: string; count: number; revenue: number }[]
}

export function GraficaServicios({ data }: GraficaServiciosProps) {
  return (
    <div className="h-[300px] w-full font-sans text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EDE5D4" />
          <XAxis type="number" stroke="#5A7060" tick={{ fill: '#5A7060' }} axisLine={false} tickLine={false} />
          <YAxis dataKey="service" type="category" stroke="#5A7060" tick={{ fill: '#5A7060' }} axisLine={false} tickLine={false} width={120} />
          <Tooltip
            cursor={{ fill: '#F7F3EA' }}
            contentStyle={{ borderRadius: '8px', border: '1px solid #EDE5D4', backgroundColor: '#FDFAF6' }}
            formatter={(value: any) => [value, 'Sesiones']}
          />
          <Bar dataKey="count" fill="#C9A84C" radius={[0, 4, 4, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
