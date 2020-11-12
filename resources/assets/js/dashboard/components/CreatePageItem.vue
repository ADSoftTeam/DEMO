<template>
    <div class="flex">
        <div>
            <button class="button is-primary"
                :class="{ 'is-loading': form.isSubmitting }"
                @click="/dashboard/page-items/add/string">Добавить строку</button>
        </div>&nbsp;
		        <div>
            <button class="button is-info"
                :class="{ 'is-loading': form.isSubmitting }"
                @click="submit">Добавить текст</button>
        </div>&nbsp;
		        <div>
            <button class="button is-warning"
                :class="{ 'is-loading': form.isSubmitting }"
                @click="submit">Добавить картинку</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['endpoint'],

    data () {
        return {
            form: new Form({
                value: '',
				slug: '',
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
