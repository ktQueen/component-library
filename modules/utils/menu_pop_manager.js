/**
 * @name menu_pop_manager
 * @description menu_pop_manager所有菜单下拉的公共管理
 * @author kt
 * @since 2018-1-4
 */
define(function () {
    function menuPopManager(menu) {
        this.oldMenu && this.oldMenu.hide();
        this.oldMenu=menu;
        menu.show();
    }
    return menuPopManager;
});