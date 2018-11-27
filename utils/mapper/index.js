import { DataMapper } from '@aws/dynamodb-data-mapper'
import DynamoDB from 'aws-sdk/clients/dynamodb'

const mapper = new DataMapper({
    client: new DynamoDB({region: process.env.region}),
})

export default mapper
