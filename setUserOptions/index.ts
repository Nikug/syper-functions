import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import jwtDecode from 'jwt-decode'

const httpTrigger: AzureFunction = async function (
  context: Context,
  request: HttpRequest
): Promise<object> {
  const options = request.body
  const token = jwtDecode<{ sub: string }>(request.headers['authorization'])

  if (!options || !token.sub) {
    return {
      httpResponse: {
        status: 400, // Bad request
      },
      outputDocument: null,
    }
  }

  options.userId = token.sub
  options.id = token.sub

  return {
    httpResponse: {
      status: 200,
    },
    outputDocument: JSON.stringify(options),
  }
}

export default httpTrigger
