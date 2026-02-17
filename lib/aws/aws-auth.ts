import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { getCognitoUser, syncCognitoUserToDb } from './cognito-auth'

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID || '',
  tokenUse: 'access',
  clientId: process.env.AWS_COGNITO_CLIENT_ID || ''
})

export interface AuthUser {
  userId: string
  email: string
  username: string
  fullName?: string
}

/**
 * Verify and decode Cognito JWT token
 */
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const payload = await verifier.verify(token)
    
    const user: AuthUser = {
      userId: payload.sub,
      email: payload.email,
      username: payload['cognito:username'],
      fullName: payload.name
    }
    
    // Sync user to database
    await syncCognitoUserToDb({
      cognitoUserId: user.userId,
      email: user.email,
      username: user.username,
      fullName: user.fullName
    })
    
    return user
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

/**
 * Get auth user from request headers
 */
export async function getAuthUser(request: Request): Promise<AuthUser | null> {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.slice(7)
  return verifyToken(token)
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(user: AuthUser | null): boolean {
  return user !== null
}
