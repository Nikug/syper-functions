import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { v1 } from 'uuid'
import jwtDecode from 'jwt-decode'

const httpTrigger: AzureFunction = async function (
  context: Context,
  request: HttpRequest
): Promise<object> {
  context.log('Set user test results for:', request.params.userId)

  const results = request.body
  const token = jwtDecode<{ sub: string }>(request.headers['authorization'])

  if (!results || !token.sub) {
    return {
      httpResponse: {
        status: 400, // Bad request
      },
      outputDocument: null,
    }
  }

  results.id = v1()
  results.userId = token.sub
  results.date = new Date().toISOString()

  return {
    httpResponse: {
      status: 200,
    },
    outputDocument: JSON.stringify(results),
  }
}

export default httpTrigger
