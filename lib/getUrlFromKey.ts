export function getUrlFromKey(key: string): string {
  const baseUrl = `https://${process.env.S3_BUCKET_NAME}.t3.storageapi.dev/`;
  return `${baseUrl}${key}`;
}
