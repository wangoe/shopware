/**
 * Shopware 4
 * Copyright © shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 */

//{namespace name=backend/index/view/menu}

/**
 * Shopware Menu
 *
 * This component creates the main backend menu. The data for the items
 * array are placed in a global variable named "backendMenu".
 *
 * Note that this component are based on the Ext.toolbar.Toolbar instead
 * of Ext.menu.Menu.
 */
//{block name="backend/index/view/menu"}
Ext.define('Shopware.apps.Index.view.Menu', {
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.mainmenu',
    alternateClassName:'Shopware.Menu',
    cls: 'shopware-menu',
    dock:'top',
    height:40,
    width: Ext.Element.getViewportWidth(),

    /**
     * Creates the menu and sets the component items
     */
    initComponent: function () {

        var me = this;

        Ext.Ajax.request({
            url: '{url action=menu}',
            async: false,
            success: function(response) {
                me.items = Ext.decode(response.responseText);

                me.fireEvent('menu-created', me.items);
            }
        });

        me.callParent(arguments);
        me.items.add(Ext.create('Shopware.Search'));

        // Add event listener which sets the width of the toolbar to the viewport width
        Ext.EventManager.onWindowResize(function(width, height) {
            me.setWidth(width);
        });
    },

    afterRender: function() {
        var me = this;

        Shopware.app.Application.baseComponentIsReady(me);

        me.add({ xtype: 'tbfill' }, {
            xtype: 'container',
            cls: 'x-main-logo-container',
            width: 23, height: 17
        });

        me.callParent(arguments);
    }
});
//{/block}