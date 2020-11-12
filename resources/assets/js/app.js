require('./bootstrap');
require('bootstrap-fileinput')

// Components - Form
import Input from './components/form/Input.vue';
Vue.component('v-input', Input);

import Textarea from './components/form/Textarea.vue';
Vue.component('v-textarea', Textarea);

import Select from './components/form/Select.vue';
Vue.component('v-select', Select);

import Checkbox from './components/form/Checkbox.vue';
Vue.component('v-checkbox', Checkbox);

import FilePicker from './components/form/FilePicker.vue';
Vue.component('v-file-picker', FilePicker);

import ImagePicker from './components/form/ImagePicker.vue';
Vue.component('v-image-picker', ImagePicker);

import DatetimePicker from './components/form/DatetimePicker.vue';
Vue.component('v-datetime-picker', DatetimePicker);

import Wysiwyg from './components/form/Wysiwyg.vue';
Vue.component('v-wysiwyg', Wysiwyg);

import MultipleImagePicker from './components/form/MultipleImagePicker.vue';
Vue.component('v-multiple-image-picker', MultipleImagePicker);

import MultipleInput from './components/form/MultipleInput.vue';
Vue.component('v-multiple-input', MultipleInput);

import MultipleItem from './components/form/MultipleItem.vue';
Vue.component('v-multiple-item', MultipleItem);

// Components - Other
import Paginator from './components/Paginator.vue';
Vue.component('v-paginator', Paginator);

// Dashboard - Components
import DataTable from './dashboard/components/DataTable.vue';
Vue.component('v-table', DataTable);

// Dashboard - Pages
import PageDirectoryItems from './dashboard/pages/PageDirectoryItems.vue';
Vue.component('page-directory-items', PageDirectoryItems);

import PageListsItems from './dashboard/pages/PageListsItems.vue';
Vue.component('page-lists-items', PageListsItems);

/*import PageListsItem from './dashboard/components/PagesListItem.vue';
Vue.component('pages-list-items', PagesListItems);*/

import PagePagesEdit from './dashboard/pages/PagePagesEdit.vue';
Vue.component('page-pages-edit', PagePagesEdit);



// A new Vue app
new Vue({
    el: '#app'
});
