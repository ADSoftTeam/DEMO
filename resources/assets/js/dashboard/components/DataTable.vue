<template>
    <div>
        <div v-if="items && items.length > 0">
            <table class="table is-striped is-hoverable is-bordered is-fullwidth datatable">
                <thead>
                    <th v-for="(col, index) in columns"
                        :key="index"
                        @click="sortData(col)"
                    >
                        <span v-text="col.title"></span>

                        <span v-show="sortBy == col.field && sortOrder == 'asc'">
                            <i class="fas fa-caret-up"></i>
                        </span>

                        <span v-show="sortBy == col.field && sortOrder == 'desc'">
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </th>

                    <th v-if="actions && Object.keys(actions).length > 0"></th>
                </thead>
                
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td v-for="(col, index2) in columns" :key="index2">
                            <span v-if="col.value" v-html="value(item, col.value)"></span>
                            
                            <span v-else>
                                <span v-if="! col.image" v-text="field(item, col.field)"></span>

                                <img v-else-if="item[col.field]"
                                    :src="item[col.field]"
                                    style="max-height: 5rem;">
                            </span>
                        </td>

                        <td v-if="actions && Object.keys(actions).length > 0"
                            class="white-space-nowrap"
                        >
                            <a v-if="actions.edit"
                                :href="item[actions.edit]"
                                title="Редактировать"
                                class="mr-05"
                            >
                                <i class="fas fa-pencil-alt"></i>
                            </a>

                            <a v-if="actions.delete"
                                :href="item[actions.edit]"
                                title="Удалить"
                                @click.prevent="showDeleteConfirmation(item, index)"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <v-paginator class="mt-1"
                :data="data"
                @pageChanged="onPageChanged"></v-paginator>
        </div>

        <p v-else class="has-text-centered">Пусто</p>
    </div>
</template>

<script>
export default {
    props: {
        url: String,
        columns: Array,
        dataSortBy: { default: '' },
        dataSortOrder: { default: 'asc' },
        actions: Object,
    },

    data() {
        return {
            page: 1,
            data: [],
            items: [],
            sortBy: this.dataSortBy,
            sortOrder: this.dataSortOrder,
        };
    },

    created() {
        this.fetchData();
    },

    watch: {
        url() {
            this.fetchData();
        }
    },

    methods: {
        fetchData() {
            let endpoint = `${this.url}?page=${this.page}&sort_by=${this.sortBy}&order=${this.sortOrder}`;

            axios.get(endpoint)
                .then(({ data }) => {
                    this.data = data;
                    this.items = data.data;
                })
        },

        field(item, field) {            
            let fields = field.split('.');
            let template = 'item';

            for (let field of fields) {
                template += `['${field}']`;
            }

            return eval(template);
        },

        value(item, expression) {            
            return eval(expression);
        },

        onPageChanged(page) {
            this.page = page;

            this.fetchData();
        },

        sortData(column) {
            if (!column.sortable) {
                return;
            }

            if (this.sortBy == column.field) {
                this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
            } else {
                this.sortOrder = 'asc';
            }

            this.sortBy = column.field;
            
            this.fetchData();
        },

        showDeleteConfirmation(item, index) {
            VoerroModal.show({
                title: 'Подтверждение удаления',
                buttons: [
                    { 
                        text: 'Удалить',
                        handler: () => {
                            this.deleteItem(item, index);
                        },
                    },
                    { text: 'Отмена' },
                ]
            });
        },

        deleteItem(item, index) {
            this.items.splice(index, 1);

            axios.delete(item.action_path)
                .then(() => {
                    this.fetchData();
                });
        },
    },
}
</script>

<style scoped>
.datatable th {
    cursor: pointer;
}
</style>

