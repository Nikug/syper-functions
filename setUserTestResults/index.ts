import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { v1 } from 'uuid'

const httpTrigger: AzureFunction = async function (
  context: Context,
  request: HttpRequest
): Promise<object> {
  context.log('Set user test results for:', request.params.userId)

  const results = request.body
  const userId = request.params.userId

  if (!results || !userId) {
    return {
      httpResponse: {
        status: 400, // Bad request
      },
      outputDocument: null,
    }
  }

  results.id = v1()
  results.userId = userId
  results.date = new Date().toISOString()

  return {
    httpResponse: {
      status: 200,
    },
    outputDocument: JSON.stringify(results),
  }
}

export default httpTrigger
