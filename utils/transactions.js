module.exports = {
    shouldAbort: (client) => {
        return err => {
            if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', err => {
                    if (err) {
                        console.error('Error rolling back client', err.stack)
                    }
                })
            }
            return !!err
        }
    }
}