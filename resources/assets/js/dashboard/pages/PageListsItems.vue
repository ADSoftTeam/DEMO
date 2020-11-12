<template>
    <div>
        <v-select :form="form"
            name="page_id"
            label="Страница"
            :options="pages"
            keyText="name"
            keyValue="id"
            :showDefaultOption="false"></v-select>

        <div class="flex">			
			<div>
				<a class="button is-primary"					
					:href="ItemsEndpoint + '/string'">
				Добавить строку</a>
			</div>&nbsp;
			<div>
				<a class="button is-info" 
					:href="ItemsEndpoint + '/text'">
				Добавить текст</a>
			</div>&nbsp;
			<div>
				<a class="button is-warning"					
					:href="ItemsEndpoint + '/image'">
				Добавить картинку</a>
			</div>
		</div>

        <p><b>Записи</b></p>
        
        <p class="has-text-centered" v-show="fetching">
            <i class="fas fa-spinner fa-spin fa-2x"></i>
        </p>

        <div :class="{ 'is-invisible': fetching }">   
            <page-lists-item v-for="(item, index) in items"
                :key="item.id"
                :data="item"
                @deletingItem="onBeforeItemDeleted(index)"
                @itemDeleted="onItemDeleted"
                ></page-lists-item>

            <p v-show="!items.length">Пусто</p>
        </div>

        
    </div>
</template>

<script>
import PageListsItem from '../components/PageListsItem.vue';

export default {
	components: { PageListsItem },
	
    props: ['pages','page_id'],

    data () {
        return {
            data: [],
			items: [],			
            page: 1,			
            fetching: false,

            form: new Form({
                page_id: ''
            })
        };
    },

    computed: {
        pagesEndpoint () {
            return `/dashboard/page-items/${this.form.data.page_id}`;
        },
		ItemsEndpoint () {
            return `/dashboard/page-items/${this.form.data.page_id}/create`;
        }
		
    },

    mounted () {
        this.form = new Form({
			page_id: (this.page_id!=-1) ? this.page_id : (this.pages[0] ? this.pages[0].id : '')            
        });
    },

    watch: {
        'form.data.page_id': function () {
            this.page = 1;
            this.fetchData();
        }
    },

    methods: {
        fetchData () {
            if (!this.fetching) {
                this.fetching = true;

                axios.get(this.pagesEndpoint)
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

        onBeforeItemDeleted (index) {
            this.items.splice(index, 0);
            notify('Запись удалена!');
        },

        onItemDeleted (index) {
            this.fetchData();
        }

    }
}
</script>
