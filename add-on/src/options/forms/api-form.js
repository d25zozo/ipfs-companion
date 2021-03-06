'use strict'
/* eslint-env browser, webextensions */

const browser = require('webextension-polyfill')
const html = require('choo/html')
const { guiURLString } = require('../../lib/options')
const switchToggle = require('../../pages/components/switch-toggle')

function apiForm ({ ipfsApiUrl, ipfsApiPollMs, automaticMode, onOptionChange }) {
  const onIpfsApiUrlChange = onOptionChange('ipfsApiUrl', (url) => guiURLString(url, { useLocalhostName: false }))
  const onIpfsApiPollMsChange = onOptionChange('ipfsApiPollMs')
  const onAutomaticModeChange = onOptionChange('automaticMode')

  return html`
    <form>
      <fieldset class="mb3 pa4 bg-snow-muted charcoal">
        <h2 class="ttu tracked f6 fw4 teal mt0 mb3">${browser.i18n.getMessage('option_header_api')}</h2>
        <div>
          <label for="ipfsApiUrl">
            <dl>
              <dt>${browser.i18n.getMessage('option_ipfsApiUrl_title')}</dt>
              <dd>${browser.i18n.getMessage('option_ipfsApiUrl_description')}</dd>
            </dl>
          </label>
          <input
            class="bg-white navy"
            id="ipfsApiUrl"
            type="url"
            inputmode="url"
            required
            pattern="^https?://[^/]+/?$"
            spellcheck="false"
            title="Enter URL without any sub-path"
            onchange=${onIpfsApiUrlChange}
            value=${ipfsApiUrl} />
        </div>
        <div>
          <label for="ipfsApiPollMs">
            <dl>
              <dt>${browser.i18n.getMessage('option_ipfsApiPollMs_title')}</dt>
              <dd>${browser.i18n.getMessage('option_ipfsApiPollMs_description')}</dd>
            </dl>
          </label>
          <input
            class="bg-white navy"
            id="ipfsApiPollMs"
            type="number"
            inputmode="numeric"
            min="1000"
            max="60000"
            step="1000"
            required
            onchange=${onIpfsApiPollMsChange}
            value=${ipfsApiPollMs} />
        </div>
        <div>
          <label for="automaticMode">
            <dl>
              <dt>${browser.i18n.getMessage('option_automaticMode_title')}</dt>
              <dd>${browser.i18n.getMessage('option_automaticMode_description')}</dd>
            </dl>
          </label>
          <div>${switchToggle({ id: 'automaticMode', checked: automaticMode, onchange: onAutomaticModeChange })}</div>
        </div>
      </fieldset>
    </form>
  `
}

module.exports = apiForm
