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
import React, { useCallback, useEffect, useState } from 'react'


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
interface Resp {
  user:string,
  date:string,
  english:string,
  arabish:string,
  arabic:string,
  id:number
  
}
interface DataType{
  myData:Resp[],
  start:string,
  end:string
}

export default function PieChartStats(myData:DataType) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [pieData, setPieData] = useState<{name:string,value:number}[]>( [ { name: 'Moez', value: 0 },
      { name: 'Borhen', value: 0 },
      { name: 'Oussema', value: 0 },
      { name: 'Zahra', value: 0 },
      { name: 'Nour', value: 0 },
      { name: 'Seif', value: 0 }])
  const counterFunc = () =>{
    
    const startDate = new Date(myData.start);
    const endDate = new Date(myData.end); 
    const filteredData = myData.myData.filter(entry => {
      const entryDate = new Date(entry.date.split('-').reverse().join('-'));
  return entryDate >= startDate && entryDate <= endDate;
});

const countOussema = filteredData.filter(entry => entry.user === 'oussema').length;
const countzahra = filteredData.filter(entry => entry.user === 'zahra').length;
const countmoez = filteredData.filter(entry => entry.user === 'moez').length;
const countborhen = filteredData.filter(entry => entry.user === 'borhen').length;
const countnour = filteredData.filter(entry => entry.user === 'nour').length;
const countsalah = filteredData.filter(entry => entry.user === 'salah').length;
setPieData([{name:"oussema",value:countOussema},{name:"moez",value:countmoez},{name:"zahra",value:countzahra},{name:"borhen",value:countborhen},{name:"salah",value:countsalah},{name:"nour",value:countnour}])
}
useEffect(() => {
  console.log(myData.myData)
  counterFunc();
}, [myData.myData])
const onMouseEnter = useCallback((_: number, index: number) => {
  setActiveIndex(index)
}, [])
  return (
    <ResponsiveContainer width='100%' height={400}>
      <PieChart>
        <Legend align='center' verticalAlign='bottom' />
        <Tooltip />
        <Pie
          data={pieData}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          fill='#8884d8'
          dataKey='value'
          onMouseEnter={onMouseEnter}
        >
          {pieData && pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
