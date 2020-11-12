<template>
    <div class="field">
        <label class="label" v-show="label" v-text="label"></label>

        <div class="control">
            <textarea class="textarea"
                :class="{ 'is-danger': form.errors[name] }"
                :name="name"
                :placeholder="placeholder"
                v-model="form.data[name]"></textarea>
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
        'placeholder',
    ],

    watch: {
        'form.data': {
            handler: function(newData, oldData) {
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
            value: this.form.data[this.name]
        };
    }
}
</script>
