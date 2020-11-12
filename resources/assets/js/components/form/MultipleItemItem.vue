<template>
    <div>
        <div class="control flex flex-align-items-center mb-1">
		<div class="field">
        <label class="label">Тип</label>

        <div class="control">
            <div class="select w-100p">
                <select class="w-100p"
                    :name="name"
                    v-model="form.data[name]"
                    @change="onChange"
                >
                    <option value="" v-if="showDefaultOption">-</option>

                    <option v-for="(item, index) in options"
                        :key="index"
                        v-text="item[keyText]"
                        :value="item[keyValue]"></option>
                </select>
            </div>
        </div>

        <p class="help is-danger"
            v-if="form.errors[name]"
            v-text="form.errors[name][0]"></p>
		</div>
			
        
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
    props: ['item','options'],

    data() {
        return {
            form: new Form({             
                items: [],
                old_items: [],				
            })
        };
    },
    
    created() {
        if (this.item) {           
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
                this.$emit('itemUpdated',  this.points);
            });
        },

        deleteItem() {
            this.$emit('itemDeleted');
        }
    }
}
</script>
