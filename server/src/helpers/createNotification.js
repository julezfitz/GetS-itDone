module.exports = (db, userId, notificationId, offerId) => {
    console.log('notification created');
    return db.query(
        `INSERT INTO user_notifications (user_id, notification_id, offer_id) 
            VALUES ($1::integer, $2::integer, $3::integer);`,
        [userId, notificationId, offerId]
    )
};

