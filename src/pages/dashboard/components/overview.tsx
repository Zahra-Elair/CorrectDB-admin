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
  ResponsiveContainer,
} from 'recharts'

interface Resp {
  user: string
  date: string
  english: string
  arabish: string
  arabic: string
  id: number
}
interface myProps {
  myData: Resp[]
}

export function Overview(myData: myProps) {
  const data = [
    {
      name: 'Moez',
      totalA: myData.myData.filter((entry) => entry.user === 'moez').length,
      totalB:
        myData.myData.filter((entry) => entry.user === 'moez').length +
        15 * Math.random(),
      date: '10-09-2024',
    },
    {
      name: 'Borhen',
      totalA: myData.myData.filter((entry) => entry.user === 'borhen').length,
      totalB:
        myData.myData.filter((entry) => entry.user === 'borhen').length +
        15 * Math.random(),
      date: '10-09-2024',
    },
    {
      name: 'Oussema',
      totalA: myData.myData.filter((entry) => entry.user === 'oussema').length,
      totalB:
        myData.myData.filter((entry) => entry.user === 'oussema').length +
        15 * Math.random(),
      date: '10-09-2024',
    },
    {
      name: 'Zahra',
      totalA: myData.myData.filter((entry) => entry.user === 'zahra').length,
      totalB:
        myData.myData.filter((entry) => entry.user === 'zahra').length +
        15 * Math.random(),
      date: '10-09-2024',
    },
    {
      name: 'Nour',
      totalA: myData.myData.filter((entry) => entry.user === 'nour').length,
      totalB:
        myData.myData.filter((entry) => entry.user === 'nour').length +
        15 * Math.random(),
      date: '10-09-2024',
    },
    {
      name: 'Salah',
      totalA: myData.myData.filter((entry) => entry.user === 'salah').length,
      totalB:
        myData.myData.filter((entry) => entry.user === 'salah').length +
        15 * Math.random(),
      date: '10-09-2024',
    },
  ]
  return (
    <ResponsiveContainer width='100%' height={350}>
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
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey='totalA'
          fill='#F95454'
          activeBar={<Rectangle fill='pink' stroke='blue' />}
        />
        <Bar
          dataKey='totalB'
          fill='#0D92F4'
          activeBar={<Rectangle fill='gold' stroke='purple' />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
