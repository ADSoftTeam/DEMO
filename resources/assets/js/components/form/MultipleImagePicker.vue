<template>
    <div class="mb-1">
        <label class="label" v-text="label"></label>

        <div class="flex flex-wrap">
            <multiple-image-picker-item
                v-for="(item, index) in items"
                :key="item.incrementalId"
                :item="item"
                :accept="accept"
                @fileSelected="onFileSelected(...arguments, index)"
                @fileDeleted="onFileDeleted(index)"></multiple-image-picker-item>
        </div>
    </div>
</template>

<script>
import MultipleImagePickerItem from './MultipleImagePickerItem.vue';

export default {
    components: { MultipleImagePickerItem },

    props: {
        form: Object,
        name: String,
        label: String,
        accept: String,
        max: {
            type: Number,
            default: 1,
        },
        oldImages: {},
    },

    data() {
        return {
            items: [],
            incrementalId: 0,
        };
    },

    created() {
        if (this.oldImages) {
            for (let image of this.oldImages) {
                this.addItem(image.id, image.full_image_path);
            }

            this.updateFormData();
        }
            
        this.addItem();
    },

    methods: {
        addItem(dbId = null, src = null) {
            if (this.items.length < this.max) {
                this.items.push({
                    dbId: dbId,
                    incrementalId: this.incrementalId++,
                    file: dbId ? true : null,
                    src: src,
                });
            }
        },

        onFileSelected(file, src, index) {
            this.items[index].file = file;
            this.items[index].src = src;

            this.addItem();

            this.updateFormData();
        },

        onFileDeleted(index) {
            this.items.splice(index, 1);

            // If all the present items have an image selected - add a new empty
            // item
            let withFiles = 0;

            for (let item of this.items) {
                withFiles += item.file ? 1 : 0;
            }
            
            if (withFiles == this.max - 1) {
                this.addItem();
            }

            this.updateFormData();
        },

        updateFormData() {
            let files = [];
            let oldIds = [];

            for (let item of this.items) {
                if (!item.dbId && item.file) {
                    files.push(item.file);
                } else {
                    oldIds.push(item.dbId);
                }
            }

            this.form.data[this.name] = files;
            this.form.data['old_' + this.name] = oldIds;
        }
    }
}
</script>
