<template>
    <div class="field">
        <div class="control">
            <label class="checkbox">
                <input type="checkbox" v-model="form.data[name]" :name="name">
                {{ label }}
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
        'label'
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
            value: this.form.data[this.name]
        };
    }
}
</script>
