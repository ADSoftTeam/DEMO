<template>
    <article class="message mb-05">
        <div class="message-body">
            <div class="flex" style="align-items: center;">
                <div class="flex-1 mr-1">
                    <v-input v-if="editing"
                        :form="form"
                        name="value"></v-input>

                    <b v-else v-text="data.value"></b>
                </div>

                <div v-show="editing">
                    <div v-show="updating">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>

                    <div v-show="!updating">
                        <a title="Сохранить" @click.prevent="saveChanges">
                            <i class="fas fa-check"></i>
                        </a>

                        <a title="Отмена" @click.prevent="editing = false;">
                            <i class="fas fa-times"></i>
                        </a>
                    </div>
                </div>

                <div v-show="!editing">
                    <a title="Редактировать" @click.prevent="startEditing">
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
            editing: false,

            form: new Form({
                value: ''
            }),
            updating: false
        };
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
        },

        startEditing () {
            this.form.data.value = this.data.value;

            this.editing = true;
        },

        saveChanges () {
            this.updating = true;
            
            this.form.submit('patch', this.data.action_path)
                .then(({data}) => {
                    this.editing = false;
                    this.updating = false;

                    this.$emit('itemUpdated', this.form.data.value);
                })
                .catch(response => {                    
                    this.updating = false;
                });
        }
    }
}
</script>
