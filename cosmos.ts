import { Container, CosmosClient, Database } from '@azure/cosmos'

const endpoint = process.env.cosmosDb__accountEndpoint
const key = process.env.cosmosDb__key
const databaseName = process.env.CosmosDbName

const cosmosClient = new CosmosClient({ endpoint, key })

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
