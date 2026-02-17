import { CognitoIdentityProviderClient, AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import { pgPool } from './clients'

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
})

export interface CognitoUser {
  cognitoUserId: string
  email: string
  username: string
  fullName?: string
}

/**
 * Get Cognito user details from access token
 */
export async function getCognitoUser(accessToken: string): Promise<CognitoUser | null> {
  try {
    const decodedToken = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString())
    
    return {
      cognitoUserId: decodedToken.sub,
      email: decodedToken.email,
      username: decodedToken['cognito:username'],
      fullName: decodedToken.name
    }
  } catch (error) {
    console.error('Error decoding Cognito token:', error)
    return null
  }
}

/**
 * Sync Cognito user to local database
 */
export async function syncCognitoUserToDb(cognitoUser: CognitoUser) {
  const client = await pgPool.connect()
  try {
    const query = `
      INSERT INTO users (cognito_user_id, email, username, full_name)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (cognito_user_id) DO UPDATE SET
        email = $2,
        username = $3,
        full_name = $4,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, cognito_user_id, email, username, full_name
    `
    
    const result = await client.query(query, [
      cognitoUser.cognitoUserId,
      cognitoUser.email,
      cognitoUser.username,
      cognitoUser.fullName
    ])
    
    return result.rows[0]
  } finally {
    client.release()
  }
}

/**
 * Get user from database by Cognito ID
 */
export async function getUserByCognitoId(cognitoUserId: string) {
  const client = await pgPool.connect()
  try {
    const query = 'SELECT * FROM users WHERE cognito_user_id = $1'
    const result = await client.query(query, [cognitoUserId])
    return result.rows[0] || null
  } finally {
    client.release()
  }
}

/**
 * Get user from database by email
 */
export async function getUserByEmail(email: string) {
  const client = await pgPool.connect()
  try {
    const query = 'SELECT * FROM users WHERE email = $1'
    const result = await client.query(query, [email])
    return result.rows[0] || null
  } finally {
    client.release()
  }
}
