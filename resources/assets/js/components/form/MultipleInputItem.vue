<template>
    <div>
        <div class="control flex flex-align-items-center mb-1">
            <input type="text"
                class="input flex-1"
                @keypress="addItem"
                v-model="answer">

            <input type="text"
                class="input flex-1"
                @keypress="addItem"
                v-model="points">

            <span class="pl-025">баллов</span>

            <a class="pl-05" @click.prevent="deleteItem">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],

    data() {
        return {
            answer: '',
            points: 0,
        };
    },
    
    created() {
        if (this.item.answer) {
            this.answer = this.item.answer;
            this.points = this.item.points;
        }
    },

    methods: {
        addItem() {
            this.$emit('itemAdded');

            this.updateItem();
        },

        updateItem() {
            this.$nextTick(() => {
                this.$emit('itemUpdated', this.answer, this.points);
            });
        },

        deleteItem() {
            this.$emit('itemDeleted');
        }
    }
}
</script>
