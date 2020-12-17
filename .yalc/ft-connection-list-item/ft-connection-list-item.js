/*
Copyright 2018 FileThis, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
`<ft-connection-list-item>`

This element displays a single FileThis connection resource, suitable for use in vertical list of other connections.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import './ft-connection-list-item-settings-behavior.js';

Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
                height: 70px;
                @apply --layout-vertical;
                @apply --ft-connection-list-item;
            }
            #root {
                @apply --ft-connection-list-item-root;
            }
            #name {
                width: 150px;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 15px;
                @apply --ft-connection-list-item-name;
            }
            #logo {
                @apply --ft-connection-list-item-logo;
            }
            #quiescentPanel {
                @apply --ft-connection-list-item-quiescent-panel;
            }
            #quiescentButton {
                width: 100px;
                height: 32px;
                background-color: white;
                @apply --ft-connection-list-item-quiescent-button;
            }
            #quiescentButtonLabel {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                @apply --ft-connection-list-item-quiescent-button-label;
            }
            #quiescentSubtext {
                margin-top: 6px;
                font-family: Arial, Helvetica, sans-serif;
                font-size: small;
                font-style: italic;
                @apply --ft-connection-list-item-quiescent-subtext;
            }
            #activePanel {
                @apply --ft-connection-list-item-active-panel;
            }
            #activeSpinner {
                @apply --ft-connection-list-item-active-spinner;
            }
            #activeSpinnerLabel {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                text-transform: uppercase;
                padding-top: 2px;
                @apply --ft-connection-list-item-active-spinner-label;
            }
        </style>

        <custom-style>
            <style>
                paper-spinner-lite.spinner
                {
                    --paper-spinner-color: black;
                    --paper-spinner-stroke-width: 2px;
                    width: 17px;
                    height: 17px;
                }
            </style>
        </custom-style>

        <!-- Root -->
        <div id="root" class="flex layout horizontal center">
            <!-- Name -->
            <iron-label id="name">
                [[connection.name]]
            </iron-label>

            <!-- Spacer -->
            <div style="width:16px;"></div>

            <!-- Logo -->
            <div id="logo" class="layout horizontal center center-justified">
                <img style="width:auto; max-width:100%;" src="[[connection.logoUrl]]">
            </div>

            <!-- Spacer -->
            <div class="flex"></div>
            <div style="width:25px;"></div>

            <!-- Quiescent panel -->
            <div id="quiescentPanel" class="layout vertical center" hidden="[[_quiescentPanelHidden]]">
                <!-- Button -->
                <paper-button raised="" id="quiescentButton" hidden="[[_quiescentButtonHidden]]" on-tap="_onQuiescentButtonTapped">
                    <iron-icon id="quiescentButtonIcon"></iron-icon>
                    <div style="width:3px;"></div>
                    <iron-label id="quiescentButtonLabel">
                    </iron-label>
                </paper-button>

                <!-- Subtext -->
                <iron-label id="quiescentSubtext" hidden="[[_quiescentSubtextHidden]]">
                    [[_getRefreshDateString(connection)]]
                </iron-label>
            </div>

            <!-- Active panel -->
            <div id="activePanel" class="layout horizontal center" hidden="[[_activePanelHidden]]">
                <!-- Spinner -->
                <paper-spinner-lite id="activeSpinner">
                </paper-spinner-lite>

                <div style="width:6px;"></div>

                <!-- Label -->
                <iron-label id="activeSpinnerLabel">
                </iron-label>
            </div>

        </div>
`,

  is: 'ft-connection-list-item',

  listeners:
  {
      'iron-resize': '_onIronResize'
  },

  behaviors: [
      FileThis.ConnectionListItemSettingsBehavior,
      IronResizableBehavior
  ],

  /**
   * Fired when the the action button is clicked.
   * The event detail argument is the item's connection resource.
   *
   * @event action-button-clicked
   * @param {Object} detail The selected connection.
   */

  observers:
  [
      "_onConnectionChanged(connection.state, connection.documentCount, ftConnectionListItemAllowManualFetch, ftConnectionListItemShowDocumentCount)",
  ],

  properties: {

      /** The connection resource to be displayed. */
      connection: {
          type: Object,
          notify: true,
          value:
              {
                  id: "1",
                  accountId: "1",
                  attemptDate: "2016-03-15T01:05:34+00:00",
                  checkedDate: "2016-04-15T01:05:24+00:00",
                  documentCount: 1,
                  enabled: true,
                  fetchAll: false,
                  historicalPeriod: "30",
                  info: "",
                  logoUrl: "https://filethis.com/static/logos/72/Logo_FileThisHosted.png",
                  name: "Untitled",
                  period: "2d",
                  sourceId: "1",
                  state: "waiting",
                  successDate: "2016-03-15T01:05:14+00:00",
                  tries: 0,
                  validation: "done"
              }
      },

      /** Whether the item should appear selected, or not. */
      selected: {
          type: Boolean,
          notify: true,
          value: false,
          observer: "_onSelectedChanged"
      },

      /** True when the active panel is hidden. */
      _activePanelHidden: {
          type: Boolean,
          value: true
      },

      /** True when the quiescent panel is hidden. */
      _quiescentPanelHidden: {
          type: Boolean,
          value: false
      },

      /** True when the quiescent button is hidden. */
      _quiescentButtonHidden: {
          type: Boolean,
          value: false
      },

      /** True when the quiescent subtext is hidden. */
      _quiescentSubtextHidden: {
          type: Boolean,
          value: false
      }

  },

  _onIronResize: function(event)
  {
      var root = this.$.root;
      var availableWidth = root.offsetWidth;

      if (availableWidth < 400)
          this._useSmallLayout();
      else if (availableWidth < 700)
          this._useMediumLayout();
      else
          this._useLargeLayout();
  },

  _useSmallLayout: function()
  {
      var root = this.$.root;
      root.style.paddingLeft = "7px";
      root.style.paddingRight = "7px";
  },

  _useMediumLayout: function()
  {
      var root = this.$.root;
      root.style.paddingLeft = "16px";
      root.style.paddingRight = "16px";
  },

  _useLargeLayout: function()
  {
      var root = this.$.root;
      root.style.paddingLeft = "20px";
      root.style.paddingRight = "20px";
  },

  _onConnectionChanged: function(state)
  {
      if (this.connection === null)
          return;

      var isActive;
      var label;
      var showQuiescentButton = false;
      var showQuiescentSubtext = false;
      var quiescentButtonIcon = "refresh";

      switch (this.connection.state)
      {
          case "waiting":
              isActive = false;
              label = "Refresh";
              showQuiescentButton = this.ftConnectionListItemAllowManualFetch;
              showQuiescentSubtext = true;
              break;
              
          case "created":
          case "manual":
          case "connecting":
              isActive = true;
              label = "Connecting";
              break;
              
          case "uploading":
              isActive = true;
              var documentCount = this.connection.documentCount;
              if (documentCount === 0 ||
                  !this.ftConnectionListItemShowDocumentCount)
                  label = "Retrieving";
              else
                  label = "Retrieved " + documentCount.toString();
              break;
              
          case "question":
              isActive = false;
              label = "Fix It";
              showQuiescentButton = true;
              quiescentButtonIcon = "report-problem";
              break;
              
          case "answered":
              isActivel = true;
              label = "Answered";
              break;
              
          case "completed":
              isActive = true;
              label = "Closing";
              break;
              
          case "error":
              isActive = false;
              label = "Fix It";
              showQuiescentButton = true;
              quiescentButtonIcon = "report-problem";
              break;
              
          case "incorrect":
          default:
              isActive = true;
              label = "Refresh";
              break;
      }

      this._activePanelHidden = !isActive;
      this.$.activeSpinnerLabel.innerHTML = label;
      this.$.activeSpinner.active = isActive;

      this._quiescentPanelHidden = isActive;
      this._quiescentButtonHidden = !showQuiescentButton;
      this._quiescentSubtextHidden = !showQuiescentSubtext;
      this.$.quiescentButtonLabel.innerHTML = label;
      this.$.quiescentButtonIcon.icon = quiescentButtonIcon;
  },

  _onSelectedChanged: function(to, from)
  {
      var top = this.$.top;
      if (this.selected)
          this.style.backgroundColor = "#F6F6F6";
      else
          this.style.backgroundColor = "#FFFFFF";
  },

  _onQuiescentButtonTapped: function(event, detail)
  {
      // TODO: The following is not preventing toggle of the selection...
      event.stopPropagation(); // So that we don't toggle the item selection when the button is clicked
      event.preventDefault();

      this.fire('action-command', this.connection);
  },

  _getRefreshDateString: function formatDate(connection)
  {
      if (this.connection === null)
          return "";

      var checkedDate = new Date(connection.checkedDate);

      var checkedYear = checkedDate.getYear();
      var year2001 = 101;
      var hasNeverFetched = (checkedYear < year2001);
      if (hasNeverFetched)
          return "";

      var monthNames =
          [
              "Jan", "Feb", "Mar",
              "Apr", "May", "Jun", "Jul",
              "Aug", "Sep", "Oct",
              "Nov", "Dec"
          ];

      var day = checkedDate.getDate();
      var monthIndex = checkedDate.getMonth();

      return "Refreshed " + monthNames[monthIndex] + ' ' + day;
  }
});
