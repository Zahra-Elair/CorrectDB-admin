import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'


interface Resp {
  user:string,
  date:string,
  english:string,
  arabish:string,
  arabic:string,
  id:number
  
}
interface myProps{
  myData: Resp[]
}
export function Overview(myData:myProps) {
  console.log(myData.myData)
  const data = [
    {
      name: 'Moez',
      totalA: myData.myData.filter(entry => entry.user === 'moez').length,
      totalB: myData.myData.filter(entry => entry.user === 'moez').length - 15 * Math.random()
    },
    {
      name: 'Oussema',
      totalA: myData.myData.filter(entry => entry.user === 'oussema').length,
      totalB: myData.myData.filter(entry => entry.user === 'oussema').length - 15 * Math.random()
      ,
    },
    {
      name: 'Nour',
      totalA: myData.myData.filter(entry => entry.user === 'nour').length,
      totalB: myData.myData.filter(entry => entry.user === 'nour').length - 15 * Math.random(),
    },
    {
      name: 'Salah',
      totalA: myData.myData.filter(entry => entry.user === 'salah').length,
      totalB: myData.myData.filter(entry => entry.user === 'salah').length - 15 * Math.random(),
    },
    {
      name: 'Zahra',
      totalA: myData.myData.filter(entry => entry.user === 'zahra').length,
      totalB: myData.myData.filter(entry => entry.user === 'zahra').length - 15 * Math.random(),
    },
    {
      name: 'Borhen',
      totalA: myData.myData.filter(entry => entry.user === 'borhen').length,
      totalB: myData.myData.filter(entry => entry.user === 'borhen').length - 15 * Math.random(),
    },
    
  ]
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
         <Bar
      dataKey='totalA'
      fill='#8884d8'
      radius={[4, 4, 0, 0]}
      barSize={20}  
    />
    <Bar
      dataKey='totalB'
      fill='#82ca9d'
      radius={[4, 4, 0, 0]}
      barSize={20}  
    />
      </BarChart>
    </ResponsiveContainer>
  )
}
