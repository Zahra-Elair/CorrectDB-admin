import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
// import BarChartStats from './components/overview'
import PieChartStats from './components/pieChart2'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// import { TopNav } from '@/components/top-nav'
// import { UserNav } from '@/components/user-nav'
// import { RecentSales } from './components/recent-sales'
import { Overview } from './components/overview'
// import PieChartStats from './components/pieChart'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DatePickerWithRange } from './components/datePicker'
interface Resp {
  user: string
  date: string
  english: string
  arabish: string
  arabic: string
  id: number
}
const getData = async () => {
  return await axios.get('http://10.70.0.48:8001/stats')
}
export default function Dashboard() {
  const today = new Date()
  const todatDateFormat =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const [data, setData] = useState<Resp[]>([])
  const [start, setStart] = useState(todatDateFormat)
  const [end, setEnd] = useState(todatDateFormat)
  const [filteredData, setfilteredData] = useState<Resp[]>([])

  const handleFilterData = () => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const newFilteredData = data.filter((entry) => {
      const entryDate = new Date(entry.date.split('-').reverse().join('-'))
      return entryDate >= startDate && entryDate <= endDate
    })
    setfilteredData(newFilteredData)
  }

  useEffect(() => {
    getData().then((res) => {
      setData(res.data[0])
    })
    start !== '' && handleFilterData()
  }, [start, end])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='flex w-full items-center justify-between '>
          <h1 className='text-2xl font-bold '>Dashboard</h1>
          <ThemeSwitch />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <DatePickerWithRange
          className={'mb-4 flex items-center justify-end'}
          setStart={setStart}
          setEnd={setEnd}
        />
        {/* date picker */}
        {/* <div className='mb-4 flex items-center justify-end space-x-10'>
          <div className='flex items-center space-x-2 align-middle'>
            <p>Start :</p>
            <input
              type='date'
              onChange={(e) => {
                setStart(e.target.value)
                console.log(start)
              }}
              className=' rounded-lg px-4 py-2 font-semibold text-black'
              id='start'
            />
          </div>
          <div className='flex items-center space-x-2 align-middle'>
            <p>End :</p>
            <input
              type='date'
              onChange={(e) => {
                setEnd(e.target.value)
                console.log(end)
              }}
              className=' rounded-lg px-4 py-2 font-semibold text-black'
              id='end'
            />
          </div>
        </div> */}

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            {/* Cards */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Rows Corrected
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{data.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    +5.1% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Rows Corrected Today
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+2350</div>
                  <p className='text-xs text-muted-foreground'>
                    +1.1% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Rows Translated by LLM
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{data.length - 428}</div>
                  <p className='text-xs text-muted-foreground'>
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Rows Translated by LLM Today
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            {/* charts */}
            <div className='grid grid-cols-1 gap-4  lg:grid-cols-7'>
              {/* Overview: Bar chart */}
              <Card className='col-span-1  lg:col-span-4'>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle>User Overview</CardTitle>
                  <Select>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='User' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Moez'>Moez</SelectItem>
                      <SelectItem value='Borhen'>Borhen</SelectItem>
                      <SelectItem value='Oussema'>Oussema</SelectItem>
                      <SelectItem value='Zahra'>Zahra</SelectItem>
                      <SelectItem value='Nour'>Nour</SelectItem>
                      <SelectItem value='Seif'>Seif</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>

                <CardContent className='flex items-center justify-center pl-2'>
                  {start && end && <Overview myData={filteredData} />}
                </CardContent>
              </Card>

              {/* Pie chart */}

              <div className='col-span-1   lg:col-span-3'>
                <PieChartStats myData={data} start={start} end={end} />
              </div>

              {/* RecentSales */}
              {/* <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card> */}
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
