'use client'

import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart, Cell, Legend } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

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

export default function PieChartStats() {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <Card className='flex h-full w-full flex-col '>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Team Performance Chart</CardTitle>
        <CardDescription>Individual Contributions</CardDescription>
      </CardHeader>
      <CardContent className='flex-1  '>
        <ChartContainer config={chartConfig} className=' 0  h-full w-full '>
          <PieChart className=' flex items-center justify-center'>
            <Legend align='center' verticalAlign='bottom' />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              innerRadius={100}
              outerRadius={130}
              strokeWidth={5}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
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
                          {totalValue.toLocaleString()}
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
      {/* <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Team performance up by 8.3% this quarter{' '}
          <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing individual contributions to the team's total value
        </div>
      </CardFooter> */}
    </Card>
  )
}
