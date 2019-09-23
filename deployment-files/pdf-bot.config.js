var LowDB = require('./src/db/lowdb.js')
var htmlPdf = require('html-pdf-chrome')

module.exports = {
  api: {
    port: 3000,
    token: 'api-token'
  },
  db: LowDB({
    lowDbOptions: {},
    path: 'pdf-storage/db/db'
  }),
  storagePath: "pdf-storage",
  webhook: {
    secret: '1234',
    url: 'http://10.0.75.1:5000/api/internals/webhooks/pdf'
  },
  generator: {
    // Triggers that specify when the PDF should be generated
    completionTrigger: new htmlPdf.CompletionTrigger.Timer(1000), // waits for 1 sec
    // The port to listen for Chrome (default: 9222)
    port: 9222,
    printOptions: {
        printBackground: true
    }
  }
}