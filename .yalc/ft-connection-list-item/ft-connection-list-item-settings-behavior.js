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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
// Make sure the "FileThis" namespace exists
window.FileThis = window.FileThis || {};

import { IronMeta } from '@polymer/iron-meta/iron-meta.js';

/**
 * `<ft-connection-list-item-settings-behavior>`
 *
 * Mixin to get connection list item settings properties.
 *
 * @demo
 * @polymerBehavior FileThis.ConnectionListItemSettingsBehavior
 */
FileThis.ConnectionListItemSettingsBehavior = {

    observers:[
        '_onInternalSettingsChanged(ftConnectionListItemAllowManualFetch)',
        '_onInternalSettingsChanged(ftConnectionListItemShowDocumentCount)',
    ],

    properties: {

        /**
         * Whether to allow users to trigger document fetching "manually" by clicking a button in the connection item, or not.
         *
         * Note that you can provide the strings "true" and "false" as attribute values.
         *
         * @type {boolean}
         */
        ftConnectionListItemAllowManualFetch: {
            type: Object,
            value: true,
            notify: true,
        },

        /**
         * Whether to show the document count when retrieving, or not.
         *
         * Note that you can provide the strings "true" and "false" as attribute values.
         *
         * @type {boolean}
         */
        ftConnectionListItemShowDocumentCount: {
            type: Object,
            value: true,
            notify: true,
        },

    },

    attached: function()
    {
        this.async(function()
        {
            this._applySettingToProperty("ft-connection-list-item-allow-manual-fetch", "ftConnectionListItemAllowManualFetch");
            this._applySettingToProperty("ft-connection-list-item-show-document-count", "ftConnectionListItemShowDocumentCount");
        });
    },

    _applySettingToProperty: function(settingName, propertyName)
    {
        var meta = new IronMeta({type: "setting", key: settingName});
        var value = meta.value;
        if (value !== undefined)
            this.set(propertyName, value);
    },

    _onInternalSettingsChanged: function(to)
    {
        this.fire("internal-settings-changed");
    },

    generateSettingsImport: function(indent)
    {
        if (!this.hasSettings())
            return "";

        var theImport = indent + "<link rel=\"import\" href=\"https://connect.filethis.com/{{RELEASE_VERSION}}/ft-connection-list-item/ft-connection-list-item.html\">\n";

        return theImport;
    },

    generateSettingsElement: function(indent)
    {
        if (!this.hasSettings())
            return "";

        var settings = indent + "<ft-connection-list-item-settings";

        // Keep alphabetized
        if (this.ftConnectionListItemAllowManualFetch !== true)
            settings += this._buildSettingAttribute("ft-connection-list-item-allow-manual-fetch", "false", indent);
        if (this.ftConnectionListItemShowDocumentCount !== true)
            settings += this._buildSettingAttribute("ft-connection-list-item-show-document-count", "false", indent);

        settings += ">\n" + indent + "</ft-connection-list-item-settings>\n";

        return settings;
    },

    // TODO: Factor out from here and copies in other classes
    _buildSettingAttribute: function(propertyName, propertyValue, indent)
    {
        return '\n' + indent + '    ' + propertyName + '="' + propertyValue + '"';
    },

    hasSettings: function()
    {
        if (this.ftConnectionListItemAllowManualFetch !== true)
            return true;
        if (this.ftConnectionListItemShowDocumentCount !== true)
            return true;
        return false;
    },

    revertToDefaults: function()
    {
        this.ftConnectionListItemAllowManualFetch = true;
        this.ftConnectionListItemShowDocumentCount = true;
    },
}
