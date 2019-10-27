[![Coverage Status](https://coveralls.io/repos/github/bookit-app/provider-delete-notification-publisher/badge.svg?branch=master)](https://coveralls.io/github/bookit-app/provider-delete-notification-publisher?branch=master)

# provider-delete-notification-publisher

Generates notifications to a PubSub topic when deletions are detected for Service Provider. This will allow services to be notified of changes so that they can make necessary adjustments to any dependent information.

## Processing

This function hooks to the delete event trigger raised by firestore. When the function is triggered it will extract the information about the changes and generate a PubSub message similar to the below:

```json
{
  "providerId": "10001",
  "ownerUid": "iuhc8a97yhi321"
}
```

## Environment

The function expects some information to be provided within the environment in order to function. The attributes are defined below:

```yaml
pubsub-topic: '<NAME OF THE PUBSUB TOPIC>'
app-log-level: '<DEFAULT LOG LEVEL>'
NODE_ENV: 'production'
```

## Deployment

This is deployed on GCP as a Cloud Function linked to a firestore trigger. The deployment defined within the [cloudbuild.yaml](./cloudbuild.yaml). The deployment expects to find and encrypted file within this repository which contains the environment information that will be associated with the deployed function. The file is decrypted based on encryption keys managed in GCP KMS. The deployment process