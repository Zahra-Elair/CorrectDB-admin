import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface datePickerProps {
  setStart: (start: string) => void
  setEnd: (end: string) => void
}

export function DatePickerWithRange({
  className,
  setStart,
  setEnd,
}: datePickerProps & React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(2024, 9, 20),
    to: addDays(new Date(2024, 9, 20), 6),
  })

  React.useEffect(() => {
    const from = date?.from
    const fromDay = from?.getDate()
    const fromYear = from?.getFullYear()
    const fromMonth = from?.getMonth() + 1
    const to = date?.to
    const toDay = to?.getDate()
    const toYear = to?.getFullYear()
    const toMonth = to?.getMonth() + 1
    const fromFormat = fromYear + '-' + fromMonth + '-' + fromDay
    const toFormat = toYear + '-' + toMonth + '-' + toDay
    console.log(fromFormat + '===>' + toFormat)
    setStart(fromFormat)
    setEnd(toFormat)
  }, [date])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
