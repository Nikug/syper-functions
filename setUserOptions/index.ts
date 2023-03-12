import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const httpTrigger: AzureFunction = async function (
  context: Context,
  request: HttpRequest
): Promise<object> {
  context.log('HTTP trigger function processed a request.', request.body, request.params.userId)

  const options = request.body
  const userId = request.params.userId

  if (!options || !userId) {
    context.log('bad request')
    return {
      httpResponse: {
        status: 400, // Bad request
      },
      outputDocument: null,
    }
  }

  options.userId = userId

  context.log('returning ok, outputdocument:', options)

  return {
    httpResponse: {
      status: 200,
    },
    outputDocument: JSON.stringify(options),
  }
}

export default httpTrigger
