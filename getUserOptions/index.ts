import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const httpTrigger: AzureFunction = async function (
  context: Context,
  request: HttpRequest,
  inputDocument: object
): Promise<object> {
  context.log('Get user options for:', request.params.userId)

  return {
    httpResponse: {
      body: inputDocument,
    },
  }
}

export default httpTrigger
