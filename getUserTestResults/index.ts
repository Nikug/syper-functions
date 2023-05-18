import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getContainer } from '../cosmos'
import { endOfDay, startOfDay, subDays } from 'date-fns'

const defaultDays = 10
const getDefaultStartDate = () => startOfDay(Date.now())
const getDefaultEndDate = (startDate: Date) => endOfDay(subDays(startDate, defaultDays))

const getStartDate = (value: string | undefined) => {
  if (!value) return getDefaultStartDate()

  const date = new Date(value)
  return startOfDay(date)
}

const getEndDate = (value: string | undefined, startDate: Date) => {
  if (!value) return getDefaultEndDate(startDate)

  const date = new Date(value)
  return endOfDay(date)
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  request: HttpRequest
): Promise<object> {
  const userId = request.params.userId
  if (!userId)
    return {
      httpResponse: {
        status: 404,
      },
    }

  const startDate = getStartDate(request.query.startDate)
  const endDate = getEndDate(request.query.endDate, startDate)

  context.log('Getting test results for', userId, 'between dates', startDate, '-', endDate)

  const container = await getContainer('UserTestResults')
  const { resources } = await container.items
    .query({
      query:
        'select * from c where c.userId = @userId and c.date < @endDate and c.date >= @startDate order by c.date asc',
      parameters: [
        {
          name: '@userId',
          value: userId,
        },
        {
          name: '@startDate',
          value: startDate.toISOString(),
        },
        {
          name: '@endDate',
          value: endDate.toISOString(),
        },
      ],
    })
    .fetchAll()

  context.log('Found', resources.length, 'results')

  return {
    httpResponse: {
      body: resources,
    },
  }
}

export default httpTrigger
