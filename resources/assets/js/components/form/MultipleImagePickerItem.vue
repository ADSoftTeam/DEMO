<template>
    <div class="image-item mr-1 mb-1">
        <div v-if="fileSelected && item.src">
            <div class="image-preview">
                <img :src="item.src">
            </div>

            <p class="has-text-centered pt-05">
                <a class="button is-danger" @click="deleteFile">
                    Удалить
                </a>
            </p>
        </div>

        <div v-else class="control">
            <label class="file-label">
                <input class="file-input"
                    type="file"
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
    </div>
</template>

<script>
export default {
    props: ['item', 'accept'],

    data() {
        return {
            fileSelected: this.item ? true : false,
        }
    },

    methods: {
        updatePreview (e) {
            let input = e.target;

            if (! input.files.length) return;

            let reader = new FileReader();

            reader.readAsDataURL(input.files[0]);

            this.fileSelected = true;

            reader.onload = (e) => {
                this.$emit('fileSelected', input.files[0], e.target.result);
            };
        },

        deleteFile() {
            this.$emit('fileDeleted');
        }
    }
}
</script>

<style>
.image-item {
    width: 13rem;
    display: flex;
    justify-content: center;
}

.image-preview {
    height: 13rem;
    width: 13rem;
    outline-style: solid;
    outline-width: 1px;
    display: flex;
    justify-content: center;
    box-shadow: .3rem .3rem .3rem 0;
}

.image-preview img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>
