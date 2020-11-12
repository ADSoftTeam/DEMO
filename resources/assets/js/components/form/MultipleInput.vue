<template>
    <div class="mb-1">
        <label class="label" v-text="label"></label>

        <multiple-input-item
            v-for="(item, index) in items"
            :key="item.incrementalId"
            :item="item"
            @itemAdded="onItemAdded(index)"
            @itemUpdated="onItemUpdated(...arguments, index)"
            @itemDeleted="onItemDeleted(index)"></multiple-input-item>
        
        <p class="help is-danger"
            v-if="form.errors[name]"
            v-text="form.errors[name][0]"></p>
    </div>
</template>

<script>
import MultipleInputItem from './MultipleInputItem.vue';

export default {
    components: { MultipleInputItem },

    props: {
        form: Object,
        name: String,
        label: String,
        max: {
            type: Number,
            default: 1,
        },
        oldAnswers: {},
    },

    data() {
        return {
            items: [],
            incrementalId: 0,
        };
    },

    created() {
        if (this.oldAnswers) {
            for (let answer of this.oldAnswers) {
                this.addItem(answer.id, answer.answer, answer.points);
            }

            this.updateFormData();
        }
            
        this.addItem();
    },

    methods: {
        addItem(dbId = null, answer = null, points = null) {
            if (this.items.length < this.max || this.max == 0) {
                this.items.push({
                    dbId: dbId,
                    incrementalId: this.incrementalId++,
                    answer: answer,
                    points: points,
                });
            }
        },

        onItemAdded(index) {
            if (index == this.items.length - 1) {
                this.addItem();
            }
        },

        onItemUpdated(answer, points, index) {
            this.items[index].answer = answer;
            this.items[index].points = points;

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
            let answers = [];

            for (let item of this.items) {
                answers.push(JSON.stringify(item));
            }

            this.form.data[this.name] = answers;
        }
    }
}
</script>
