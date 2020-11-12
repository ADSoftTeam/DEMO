<template>
    <div class="field">
        <label class="label" v-text="label"></label>

        <div class="columns" v-show="imageSrc">
            <div class="column is-6">
                <img :src="imageSrc">
            </div>
        </div>

        <div class="control">

            <label class="file-label">
                <input class="file-input"
                    type="file"
                    :name="name"
                    :accept="accept"
                    @change="updatePreview">

                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>

                    <span class="file-label">
                        Выберите файл…
                    </span>
                </span>
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
        'src'
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
            inputType: this.type ? this.type : 'text',
            value: this.form.data[this.name],
            imageSrc: this.src ? this.src : ''
        };
    },

    methods: {
        updatePreview (e) {
            let input = e.target;

            if (! input.files.length) return;

            this.form.data[this.name] = input.files[0];

            let reader = new FileReader();

            reader.readAsDataURL(input.files[0]);

            reader.onload = (e) => {
                this.imageSrc = e.target.result;
            };
        }
    }
}
</script>

<style scoped>
.image-preview {
    max-height: 15rem;
}

.image-preview img {
    height: 100%;
}
</style>
