export default {
    // Minio
    'minio': {
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,
        accessKey: 'macoolka',
        secretKey: 'macoolka'
    },

    // Generic S3
    'generic-s3': {
        endPoint: process.env.SMCS_GENERICS3_ENDPOINT,
        accessKey: process.env.SMCS_GENERICS3_ACCESS_KEY,
        secretKey: process.env.SMCS_GENERICS3_SECRET_KEY,
        region: process.env.SMCS_GENERICS3_REGION
    },

    // Azure
    'azure-storage': {
        storageAccount: process.env.SMCS_AZURESTORAGE_STORAGEACCOUNT,
        storageAccessKey: process.env.SMCS_AZURESTORAGE_ACCESSKEY
    },

    // AWS
    'aws-s3': {
        accessKeyId: process.env.SMCS_AWSS3_ACCESS_KEY, // Test against AWS S3
        secretAccessKey: process.env.SMCS_AWSS3_SECRET_KEY,
        region: process.env.SMCS_AWSS3_REGION // Region for when using AWS S3
    },

    // Google Cloud
    'google-cloud-storage': {
        // Use env vars GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
    },

    // Backblaze B2
    'backblaze-b2': {
        accountId: process.env.SMCS_BACKBLAZEB2_ACCOUNT_ID,
        applicationKey: process.env.SMCS_BACKBLAZEB2_APPLICATION_KEY
    }
}
