// import './styles.css'
// import React, { useCallback, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import React, { useCallback, useState } from 'react'

const data = [
  { name: 'Moez', value: 400 },
  { name: 'Borhen', value: 200 },
  { name: 'Oussema', value: 400 },
  { name: 'Zahra', value: 400 },
  { name: 'Nour', value: 600 },
  { name: 'Seif', value: 300 },
]

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FFA1C5',
  '#A28CFE',
  '#FF8042',
]
const RADIAN = Math.PI / 180

interface renderCustomizedLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: renderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function PieChartStats() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const onMouseEnter = useCallback((_: number, index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <ResponsiveContainer width='100%' height={400}>
      <PieChart>
        <Legend align='center' verticalAlign='bottom' />
        <Tooltip />
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={90}
          outerRadius={130}
          labelLine={false}
          label={renderCustomizedLabel}
          fill='#8884d8'
          dataKey='value'
          onMouseEnter={onMouseEnter}
          strokeWidth={1}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
