'use strict'

const { setInterval, clearInterval } = require('sdk/timers')
const notifications = require('sdk/notifications')
const prefs = require('sdk/simple-prefs').prefs
const api = require('./api.js')
const gui = require('./gui.js')
const gw = require('./gateways.js')
const _ = require('sdk/l10n').get

function ipfsHealthCheck () {
  api.getSwarmPeers((peers) => {
    const peerCount = (peers && peers.Strings) ? peers.Strings.length : null
    gui.setButtonBadge(peerCount)

    if (prefs.automatic) {
      let isUp = peerCount > 0
      if (isUp !== gw.redirectEnabled) {
        notifications.notify({
          title: isUp ? _('automatic_up_notification_title') : _('automatic_down_notification_title'),
          text: isUp ? _('automatic_up_notification_text') : _('automatic_down_notification_text')
        })
        gw.redirectEnabled = isUp
      }
    }
  })
}

let checkRunner = null
require('sdk/simple-prefs').on('apiPollInterval', (function f () {
  clearInterval(checkRunner)
  checkRunner = setInterval(ipfsHealthCheck, prefs.apiPollInterval)
  return f
})())

require('sdk/system/unload').when(() => {
  clearInterval(checkRunner)
})

exports.triggerManualCheck = ipfsHealthCheck