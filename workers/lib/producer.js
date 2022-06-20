const connector = require('./connector')

module.exports = (exchange, payload) => {

    connector(channel => {
        channel.assertExchange(exchange, 'fanout', {durable: false})
        channel.publish(exchange, '', Buffer.from(JSON.stringify(payload)))
    })
}