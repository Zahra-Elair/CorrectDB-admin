'use client'

import * as React from 'react'

import { Label, Pie, PieChart, Cell, Legend } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useState } from 'react'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FFA1C5',
  '#A28CFE',
  '#FF8042',
]

const chartConfig = {
  value: {
    label: 'Value',
  },
  Moez: {
    label: 'Moez',
    color: COLORS[0],
  },
  Borhen: {
    label: 'Borhen',
    color: COLORS[1],
  },
  Oussema: {
    label: 'Oussema',
    color: COLORS[2],
  },
  Zahra: {
    label: 'Zahra',
    color: COLORS[3],
  },
  Nour: {
    label: 'Nour',
    color: COLORS[4],
  },
  Seif: {
    label: 'Seif',
    color: COLORS[5],
  },
} satisfies ChartConfig

interface Resp {
  user: string
  date: string
  english: string
  arabish: string
  arabic: string
  id: number
}
interface DataType {
  myData: Resp[]
  start: string
  end: string
}

export default function PieChartStats(myData: DataType) {
  const [filteredData, setFilteredData] = useState<Resp[]>([])
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([
    { name: 'Moez', value: 0 },
    { name: 'Borhen', value: 0 },
    { name: 'Oussema', value: 0 },
    { name: 'Zahra', value: 0 },
    { name: 'Nour', value: 0 },
    { name: 'Seif', value: 0 },
  ])
  const counterFunc = () => {
    const startDate = new Date(myData.start)
    const endDate = new Date(myData.end)
    const filteredData = myData.myData.filter((entry) => {
      const entryDate = new Date(entry.date.split('-').reverse().join('-'))
      return entryDate >= startDate && entryDate <= endDate
    })
    setFilteredData(filteredData)

    const countOussema = filteredData.filter(
      (entry) => entry.user === 'oussema'
    ).length
    const countzahra = filteredData.filter(
      (entry) => entry.user === 'zahra'
    ).length
    const countmoez = filteredData.filter(
      (entry) => entry.user === 'moez'
    ).length
    const countborhen = filteredData.filter(
      (entry) => entry.user === 'borhen'
    ).length
    const countnour = filteredData.filter(
      (entry) => entry.user === 'nour'
    ).length
    const countsalah = filteredData.filter(
      (entry) => entry.user === 'salah'
    ).length
    setPieData([
      { name: 'oussema', value: countOussema },
      { name: 'moez', value: countmoez },
      { name: 'zahra', value: countzahra },
      { name: 'borhen', value: countborhen },
      { name: 'salah', value: countsalah },
      { name: 'nour', value: countnour },
    ])
  }
  React.useEffect(() => {
    console.log(myData.myData)
    counterFunc()
  }, [myData.myData])

  return (
    <Card className='flex h-full flex-col '>
      <CardHeader className='flex items-center justify-center '>
        <CardTitle>Team Performance Chart</CardTitle>
        <CardDescription>Individual Contributions</CardDescription>
      </CardHeader>
      <CardContent className='h-full'>
        <ChartContainer config={chartConfig} className='  h-[350px] w-full '>
          <PieChart>
            <Legend align='center' verticalAlign='bottom' />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey='value'
              nameKey='name'
              innerRadius={80}
              outerRadius={110}
              strokeWidth={5}
              paddingAngle={3}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {filteredData.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Total Value
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
