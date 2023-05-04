import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getContainer } from '../cosmos'
import { startOfDay, subDays } from 'date-fns'

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

  const startDate = subDays(startOfDay(new Date()), 30).toISOString()

  const container = await getContainer('UserTestResults')
  const { resources } = await container.items
    .query({
      query: 'select * from c where c.userId = @userId and c.date >= @date',
      parameters: [
        {
          name: '@userId',
          value: userId,
        },
        {
          name: '@date',
          value: startDate,
        },
      ],
    })
    .fetchAll()

  return {
    httpResponse: {
      body: resources,
    },
  }
}

export default httpTrigger
