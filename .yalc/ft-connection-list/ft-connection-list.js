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
`<ft-connection-list>`

This element displays a list of FileThis connection resources.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import 'ft-connection-list-item/ft-connection-list-item.js';

import 'ft-connection-list-item/ft-connection-list-item-settings-behavior.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-label/iron-label.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
                @apply --layout-vertical;
                @apply --ft-connection-list;
            }
            #connectionList {
                @apply --ft-connection-list-list;
            }
        </style>

        <!-- List -->
        <iron-list selection-enabled="" id="connectionList" class="flex" items="[[connections]]" selected-item="{{selectedConnection}}" as="connection">
            <!-- Connection item template -->
            <template>
                <ft-connection-list-item style="border-bottom:1px solid #DDD; " connection="[[connection]]" selected\$="[[selected]]" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
                </ft-connection-list-item>
            </template>
        </iron-list>
`,

  is: 'ft-connection-list',

  behaviors: [
      FileThis.ConnectionListItemSettingsBehavior,
  ],

  properties: {

      /** The list of connection resources to be displayed in the list. */
      connections:
      {
          type: Array,
          notify: true,
          value: []
      },

      /** The currently selected connection. */
      selectedConnection:
      {
          type: Object,
          notify: true,
          value: null
      }
  }
});
