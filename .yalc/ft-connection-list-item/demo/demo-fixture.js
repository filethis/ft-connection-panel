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
/* ft-connection-list-item element demo */
/* Imports */
/**

An element that renders a single FileThis connection resource as a list item

@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../ft-connection-list-item.js';

import '../ft-connection-list-item-settings.js';
import './ft-connection-list-item-settings-editor.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer
({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
            }
        </style>

        <!-- Set a setting -->
        <ft-connection-list-item-settings ft-connection-list-item-allow-manual-fetch="true">
        </ft-connection-list-item-settings>

            Settings
        <ft-connection-list-item-settings-editor slot="config" style="height:100%; padding:20px; " ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
        </ft-connection-list-item-settings-editor>

        <!-- Panel -->
        <div slot="instance" class="layout vertical scroll" style="width:100%; height: 100%; ">
                Waiting
            <ft-connection-list-item id="itemWaiting" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

            <!-- Waiting, selected -->
            <ft-connection-list-item id="itemWaitingSelected" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

            <!-- Connecting -->
            <ft-connection-list-item id="itemConnecting" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

            <!-- Downloading -->
            <ft-connection-list-item id="itemDownloading" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

            <!-- Downloading, with document -->
            <ft-connection-list-item id="itemDownloadingWithDocument" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

            <!-- Question -->
            <ft-connection-list-item id="itemQuestion" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

            <!-- Error -->
            <ft-connection-list-item id="itemError" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

            <!-- Completed -->
            <ft-connection-list-item id="itemCompleted" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

            <!-- Foo -->
            <ft-connection-list-item id="itemFoo" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
            </ft-connection-list-item>

        </div>
`,

  is: 'demo-fixture',

  properties:
  {
  },

  ready: function()
  {
      this._loadFakeConnection();
  },

  _loadFakeConnection: function()
  {
      var path = "fake-connection.json";

      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.overrideMimeType("application/json");
      xmlHttpRequest.open('GET', path, true);
      xmlHttpRequest.onreadystatechange = function()
      {
          if (xmlHttpRequest.readyState === 4 &&
              xmlHttpRequest.status === 200)
          {
              var connection = JSON.parse(xmlHttpRequest.responseText);

              // Waiting
              var connectionWaiting = Object.assign({}, connection);
              this.$.itemWaiting.connection = connectionWaiting;

              // Waiting, selected
              var connectionWaitingSelected = Object.assign({}, connection);
              this.$.itemWaitingSelected.connection = connectionWaitingSelected;
              this.$.itemWaitingSelected.selected = true;

              // Connecting
              var connectionConnecting = Object.assign({}, connection);
              connectionConnecting.state = "connecting";
              this.$.itemConnecting.connection = connectionConnecting;

              // Downloading
              var connectionDownloading = Object.assign({}, connection);
              connectionDownloading.state = "uploading";
              connectionDownloading.documentCount = 0;
              this.$.itemDownloading.connection = connectionDownloading;

              // Downloading, with document
              var connectionDownloadingWithDocument = Object.assign({}, connection);
              connectionDownloadingWithDocument.state = "uploading";
              connectionDownloadingWithDocument.documentCount = 3;
              this.$.itemDownloadingWithDocument.connection = connectionDownloadingWithDocument;

              // Question
              var connectionQuestion = Object.assign({}, connection);
              connectionQuestion.state = "question";
              this.$.itemQuestion.connection = connectionQuestion;

              // Error
              var connectionError = Object.assign({}, connection);
              connectionError.state = "error";
              this.$.itemError.connection = connectionError;

              // Completed
              var connectionCompleted = Object.assign({}, connection);
              connectionCompleted.state = "completed";
              this.$.itemCompleted.connection = connectionCompleted;

              // Foo
              var fooCompleted = Object.assign({}, connection);
              connectionCompleted.state = "completed";
              this.$.itemFoo.connection = fooCompleted;
          }
      }.bind(this);
      xmlHttpRequest.send();
  }
});
