'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface GraficaIngresosProps {
  data: { date: string; amount: number }[]
}

export function GraficaIngresos({ data }: GraficaIngresosProps) {
  return (
    <div className="h-[300px] w-full font-sans text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDE5D4" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => format(new Date(value), 'd MMM', { locale: es })}
            stroke="#5A7060"
            tick={{ fill: '#5A7060' }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            tickFormatter={(value) => `${value}€`}
            stroke="#5A7060"
            tick={{ fill: '#5A7060' }}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #EDE5D4', backgroundColor: '#FDFAF6' }}
            formatter={(value: any) => [`${Number(value).toFixed(2)}€`, 'Ingresos']}
            labelFormatter={(label) => format(new Date(label), 'd MMMM yyyy', { locale: es })}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#33763D" 
            strokeWidth={3}
            dot={{ fill: '#33763D', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#C9A84C', stroke: '#FDFAF6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
