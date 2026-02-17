import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { pgPool } from './clients'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET || ''

/**
 * Generate S3 key path for file
 */
function generateS3Key(userId: string, fileName: string): string {
  const timestamp = Date.now()
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
  return `users/${userId}/${timestamp}_${sanitizedFileName}`
}

/**
 * Upload file to S3
 */
export async function uploadToS3(
  userId: string,
  fileBuffer: Buffer,
  fileName: string,
  fileType: string
): Promise<{ key: string; url: string }> {
  const s3Key = generateS3Key(userId, fileName)
  
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: fileType,
      ServerSideEncryption: 'AES256'
    })
    
    await s3Client.send(command)
    
    // Store file metadata in database
    const client = await pgPool.connect()
    try {
      const dbQuery = `
        INSERT INTO user_files (user_id, file_name, file_key, file_size, file_type)
        VALUES ((SELECT id FROM users WHERE cognito_user_id = $1), $2, $3, $4, $5)
        RETURNING *
      `
      await client.query(dbQuery, [userId, fileName, s3Key, fileBuffer.length, fileType])
    } finally {
      client.release()
    }
    
    const url = `s3://${BUCKET_NAME}/${s3Key}`
    return { key: s3Key, url }
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw error
  }
}

/**
 * Get signed URL for file download
 */
export async function getSignedDownloadUrl(s3Key: string, expiresIn: number = 3600): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key
    })
    
    return await getSignedUrl(s3Client, command, { expiresIn })
  } catch (error) {
    console.error('Error generating signed URL:', error)
    throw error
  }
}

/**
 * Delete file from S3
 */
export async function deleteFromS3(s3Key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key
    })
    
    await s3Client.send(command)
  } catch (error) {
    console.error('Error deleting from S3:', error)
    throw error
  }
}

/**
 * Get user's files
 */
export async function getUserFiles(userId: string) {
  const client = await pgPool.connect()
  try {
    const query = `
      SELECT * FROM user_files
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)
      ORDER BY created_at DESC
    `
    const result = await client.query(query, [userId])
    return result.rows
  } finally {
    client.release()
  }
}

/**
 * Delete file and remove metadata
 */
export async function deleteUserFile(userId: string, fileKey: string): Promise<void> {
  const client = await pgPool.connect()
  try {
    // Delete from database
    const dbQuery = `
      DELETE FROM user_files
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)
      AND file_key = $2
    `
    await client.query(dbQuery, [userId, fileKey])
    
    // Delete from S3
    await deleteFromS3(fileKey)
  } finally {
    client.release()
  }
}
