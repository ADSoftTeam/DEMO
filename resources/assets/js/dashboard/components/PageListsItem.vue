<template>
    <article class="message mb-05">
        <div class="message-body">
            <div class="flex" style="align-items: center;">
				<div class="flex-1 mr-1">                    
                    Тип: <b v-text="data.type"></b>, Язык: <b v-text="data.language.value"></b>                
                    </br>Название: <b v-text="data.slug"></b>
                     </br>
					  <div v-if="data.type=='image' && data.image_path" >
						<div class="image-preview">
							<img :src="data.image_path">
						</div>
					  </div>
					  <div v-else>Значение: <b v-text="data.value"></b></div>
                </div>
				
                
                <div>
                    <a :href="editEndpoint" title="Редактировать" >
                        <i class="fas fa-edit"></i>
                    </a>

                    <a title="Удалить" @click.prevent="deleteItemConfirmation">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: ['data'],

    data () {
        return {
            form: new Form({
                value: ''
            }),            
        };
    },
	
	computed: {
        editEndpoint () {
            return `${this.data.action_path}/edit`;
        }
    },

    methods: {
        deleteItemConfirmation () {
            VoerroModal.show({
                title: `Подтверждение удаления`,
                body: `Действительно удалить запись "${this.data.value}"? Все связанные данные будут удалены безвозвратно.`,
                buttons: [
                    {
                        text: 'Удалить',
                        handler: this.deleteItem
                    },
                    {
                        text: 'Отмена'
                    }
                ]
            });
        },

        deleteItem () {
            this.$emit('deletingItem');
            
            axios.delete(this.data.action_path)
                .then(() => {
                    this.$emit('itemDeleted');
                });
        }
    }
}
</script>
