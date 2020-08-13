var LowDB = require('./src/db/lowdb.js')
var htmlPdf = require('html-pdf-chrome')

module.exports = {
  api: {
    port: 3000,
    token: 'api-token'
  },
  db: LowDB({
    lowDbOptions: {},
    //path: 'pdfbot/db'
  }),
  //storagePath: "pdfbot",
  queue: {
    webhookMaxTries: 0
  },
  webhook: {
    secret: '1234',
    url: 'https://api.e1c.etisalatdigital.ae/api/internals/webhooks/pdf'
  },
  generator: {
    // Triggers that specify when the PDF should be generated
    completionTrigger: new htmlPdf.CompletionTrigger.Variable(
      'reportLoaded', // optional, name of the variable to wait for.  Defaults to 'htmlPdfDone'
      300000 // optional, timeout (milliseconds)
    ),
    // The port to listen for Chrome (default: 9222)
    port: 9222,
    printOptions: {
        printBackground: true,
       	marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    }
  }
}