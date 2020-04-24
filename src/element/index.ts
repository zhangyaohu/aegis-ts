import Vue from 'vue';
import { TableColumn, Submenu, Table, Scrollbar,Loading, Pagination, DatePicker, MenuItem, Menu, MenuItemGroup, Button, Dropdown, DropdownItem, DropdownMenu, Tooltip, Select, Option, Notification } from 'element-ui';
const element = {
	install: function () {
		Vue.use(Table);
		Vue.use(Pagination);
		Vue.use(DatePicker);
		Vue.use(MenuItem);
		Vue.use(MenuItemGroup);
		Vue.use(Menu);
		Vue.use(TableColumn);
		Vue.use(Loading);
		Vue.use(Submenu);
		Vue.use(Button);
		Vue.use(Dropdown);
		Vue.use(DropdownItem);
		Vue.use(DropdownMenu);
		Vue.use(Tooltip);
		Vue.use(Select);
    Vue.use(Option);
    Vue.use(Scrollbar)
	}
}

Vue.prototype.$notify = Notification;

export default element;
