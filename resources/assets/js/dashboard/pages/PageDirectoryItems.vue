<template>
    <div>
        <v-select :form="form"
            name="directory_slug"
            label="Справочник"
            :options="directories"
            keyText="title"
            keyValue="slug"
            :showDefaultOption="false"></v-select>

        <create-directory-item v-if="directories.length"
            :endpoint="directoryEndpoint"
            @itemCreated="onItemCreated"></create-directory-item>

        <p><b>Записи</b></p>
        
        <p class="has-text-centered" v-show="fetching">
            <i class="fas fa-spinner fa-spin fa-2x"></i>
        </p>

        <div :class="{ 'is-invisible': fetching }">   
            <directory-list-item v-for="(item, index) in items"
                :key="item.id"
                :data="item"
                @deletingItem="onBeforeItemDeleted(index)"
                @itemDeleted="onItemDeleted"
                @itemUpdated="onItemUpdated(index, ...arguments)"></directory-list-item>

            <p v-show="!items.length">Пусто</p>
        </div>

        <v-paginator :data="data"
            @pageChanged="onPageChanged"
            class="mt-1"></v-paginator>
    </div>
</template>

<script>
import DirectoryListItem from '../components/DirectoryListItem.vue';
import CreateDirectoryItem from '../components/CreateDirectoryItem.vue';

export default {
    components: { DirectoryListItem, CreateDirectoryItem },

    props: ['directories'],

    data () {
        return {
            data: [],
            items: [],
            page: 1,
            fetching: false,

            form: new Form({
                directory_slug: ''
            })
        };
    },

    computed: {
        directoryEndpoint () {
            return `/dashboard/directories/${this.form.data.directory_slug}?page=${this.page}`;
        }
    },

    mounted () {
        this.form = new Form({
            directory_slug: this.directories[0] ? this.directories[0].slug : ''
        });
    },

    watch: {
        'form.data.directory_slug': function () {
            this.page = 1;

            this.fetchData();
        }
    },

    methods: {
        fetchData () {
            if (!this.fetching) {
                this.fetching = true;

                axios.get(this.directoryEndpoint)
                    .then(({ data }) => {
                        this.data = data;
                        this.items = data.data;

                        this.fetching = false;
                    });
            }
        },

        onPageChanged (page) {
            this.page = page;

            this.fetchData();
        },

        onItemCreated () {
            this.fetchData();

            notify('Запись добавлена!');
        },

        onBeforeItemDeleted (index) {
            this.items.splice(index, 0);

            notify('Запись удалена!');
        },

        onItemDeleted (index) {
            this.fetchData();
        },

        onItemUpdated (index, value) {
            this.items[index].value = value; 
        }
    }
}
</script>
