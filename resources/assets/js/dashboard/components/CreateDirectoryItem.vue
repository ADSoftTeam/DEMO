<template>
    <div class="flex">
        <v-input :form="form"
            name="value"
            class="flex-1 mr-1"></v-input>

        <div>
            <button class="button is-primary"
                :class="{ 'is-loading': form.isSubmitting }"
                @click="submit">Добавить запись</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['endpoint'],

    data () {
        return {
            form: new Form({
                value: ''
            })
        };
    },

    methods: {
        submit () {
            this.form.submit('post', this.endpoint)
                .then(() => {
                    this.form.reset();

                    this.$emit('itemCreated');
                });
        }
    }
}
</script>
