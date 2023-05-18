import { Container, CosmosClient, Database } from '@azure/cosmos'
import { DefaultAzureCredential } from '@azure/identity'

const endpoint = process.env.cosmosDb__accountEndpoint
const databaseName = process.env.CosmosDbName
const credential = new DefaultAzureCredential({
  managedIdentityClientId: process.env.cosmosDb__clientId,
})

const cosmosClient = new CosmosClient({ endpoint, aadCredentials: credential })

const getDatabase = async (): Promise<Database> => {
  const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName })
  return database
}

type Containers = 'UserOptions' | 'UserTestResults'

export const getContainer = async (containerName: Containers): Promise<Container> => {
  const database = await getDatabase()
  const { container } = await database.containers.createIfNotExists({ id: containerName })
  return container
}
