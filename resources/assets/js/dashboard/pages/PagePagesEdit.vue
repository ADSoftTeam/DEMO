<template>
    <div>
        <form @submit.prevent="onSubmit">
            <v-input :form="form"
                name="name"
                label="* Название"></v-input>
            
			<v-input :form="form"
                name="slug"
                label="* Служебное имя"></v-input>
			
			
            <div class="mt-1">
                <button class="button is-primary"
                    :class="{ 'is-loading': form.isSubmitting }">
                    Сохранить
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        action: {},
        redirect: {},
        data: {},		
    },

    data() {
        return {
            initialized: false,
            form: new Form({
                name: '',
                slug: '',				
            })
        };
    },

    created () {        
        if (this.data && this.data.id) {            
            this.form = new Form(Object.assign({}, this.data));
			this.form.data.items = [];
        }
    },

    methods: {
        onSubmit () {
            this.form.submit('post', this.action)
                .then(({data}) => {
                    window.location = this.redirect;
                })
                .catch(response => {
                    notify({
                        text: 'Форма заполнена с ошибками',
                        theme: 'red'
                    });
                });
        }
    }
}
</script>
