import { Pool } from 'pg'
import { 
  CognitoIdentityProviderClient, 
  AdminGetUserCommand,
  AdminUpdateUserAttributesCommand,
  ListUsersCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { S3Client } from '@aws-sdk/client-s3'

// PostgreSQL RDS Connection Pool
const pgPool = new Pool({
  host: process.env.AWS_RDS_HOST,
  port: parseInt(process.env.AWS_RDS_PORT || '5432'),
  database: process.env.AWS_RDS_DATABASE,
  user: process.env.AWS_RDS_USERNAME,
  password: process.env.AWS_RDS_PASSWORD,
})

// Cognito Client
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
})

// S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
})

export { pgPool, cognitoClient, s3Client }
