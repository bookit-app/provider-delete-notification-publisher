'use strict';

const logger = require('./logger');

/**
 * Generates a PubSub notification with details
 * of the service provider which was impacted. The following
 * information is placed into the notification
 *
 * {
 *  providerId: string,
 *  ownerUid: string
 * }
 *
 * @param {*} data
 * @param {*} context
 * @returns {Promise<void>}
 */
module.exports = async (data, context, topic) => {
  const { params } = context;

  const notification = {
    providerId: params.providerId,
    ownerUid: data.oldValue.fields.ownerUid.stringValue
  };

  logger.info(
    `Generating service provider notification delete event for ${JSON.stringify(
      notification
    )}`
  );

  // Generate pubsub notification
  return topic.publish(Buffer.from(JSON.stringify(notification)));
};
