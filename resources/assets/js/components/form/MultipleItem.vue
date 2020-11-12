<template>
    <div class="mb-1">
        <label class="label" v-text="label"></label>

        <multiple-item-item
            v-for="(item, index) in items"
            :key="item.incrementalId"
            :item="item"
            @itemAdded="onItemAdded(index)"
            @itemUpdated="onItemUpdated(...arguments, index)"
            @itemDeleted="onItemDeleted(index)"></multiple-item-item>
        
        <p class="help is-danger"
            v-if="form.errors[name]"
            v-text="form.errors[name][0]"></p>
    </div>
</template>

<script>
import MultipleItemItem from './MultipleItemItem.vue';

export default {
    components: { MultipleItemItem },

    props: {
        form: Object,
        name: String,
        label: String,
        max: {
            type: Number,
            default: 1,
        },
        oldItems: {},
    },

    data() {
        return {
            items: [],
            incrementalId: 0,
        };
    },

    created() {
        if (this.oldItems) {
            for (let items of this.oldItems) {
                this.addItem(items.id, items.type, items.lang, items.value);
            }

            this.updateFormData();
        }
            
        this.addItem();
    },

    methods: {
        addItem(dbId = null, type = 'text', lang = 'RU', value = '') {
            if (this.items.length < this.max || this.max == 0) {
                this.items.push({
                    dbId: dbId,
                    incrementalId: this.incrementalId++,
                    type: type,
                    lang: lang,
					value : value,
                });
            }
        },

        onItemAdded(index) {
            if (index == this.items.length - 1) {
                this.addItem();
            }
        },

        onItemUpdated(type, lang, value, index) {
            this.items[index].type = type;
            this.items[index].lang = lang;
			this.items[index].value = value;

            this.updateFormData();
        },

        onItemDeleted(index) {
            this.items.splice(index, 1);

            this.updateFormData();

            if (this.items.length == 0) {
                this.addItem();
            }
        },

        updateFormData() {
            let items = [];

            for (let item of this.items) {
                items.push(JSON.stringify(item));
            }

            this.form.data[this.name] = items;
        }
    }
}
</script>
