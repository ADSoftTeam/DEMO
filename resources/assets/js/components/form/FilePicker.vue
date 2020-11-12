<template>
    <div class="field">
        <label class="label" v-text="label"></label>

        <div class="control">

            <label class="file-label">
                <input class="file-input"
                    type="file"
                    :name="name"
                    :accept="accept"
                    @change="updateFile">

                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>

                    <span class="file-label">
                        Выберите файл…
                    </span>
                </span>

                <p class="pl-1" v-text="filename"></p>
            </label>
        </div>

        <p class="help is-danger"
            v-if="form.errors[name]"
            v-text="form.errors[name][0]"></p>
    </div>
</template>

<script>
export default {
    props: [
        'form',
        'name',
        'label',
        'accept',
        'dataFilename'
    ],

    watch: {
        'form.data': {
            handler: function(newData, oldData, atata) {
                if (this.value != newData[this.name]) {
                    this.value = newData[this.name];
                    this.form.clearErrors(this.name);
                }
            },
            deep: true
        },
    },

    data () {
        return {
            filename: this.dataFilename ? this.dataFilename : '',
        };
    },

    methods: {
        updateFile(e) {
            let input = e.target;

            if (! input.files.length) return;

            this.form.data[this.name] = input.files[0];

            this.filename = input.files[0].name;

            this.$emit('file-chosen');
        }
    }
}
</script>
