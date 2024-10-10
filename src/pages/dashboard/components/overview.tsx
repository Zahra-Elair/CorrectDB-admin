// import "./styles.css";
// import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  Rectangle,
} from 'recharts'

const data = [
  {
    date: '10/10/24',
    LLM: 4000,
    Manual: 2400,
  },
  {
    date: '11/10/24',
    LLM: 3000,
    Manual: 1398,
  },
  {
    date: '12/10/24',
    LLM: 2000,
    Manual: 9800,
  },
  {
    date: '13/10/24',
    LLM: 2780,
    Manual: 3908,
  },
  {
    date: '14/10/24',
    LLM: 1890,
    Manual: 4800,
  },
  {
    date: '15/10/24',
    LLM: 2390,
    Manual: 3800,
  },
  {
    date: '16/10/24',
    LLM: 3490,
    Manual: 4300,
  },
]

export default function BarChartStats() {
  return (
    <BarChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='date' />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey='LLM'
        fill='#F95454'
        activeBar={<Rectangle fill='pink' stroke='blue' />}
      />
      <Bar
        dataKey='Manual'
        fill='#0D92F4'
        activeBar={<Rectangle fill='gold' stroke='purple' />}
      />
    </BarChart>
  )
}
