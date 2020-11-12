<template>
    <div class="field">
        <label class="label" v-text="label"></label>

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
</template>

<script>
export default {
    props: {
        form: {},
        name: {},
        label: {},
        options: {},
        keyText: {},
        keyValue: {},
        showDefaultOption: {
            default: true
        }
    },

    methods: {
        onChange () {
            this.form.clearErrors(this.name);

            this.$emit('change');
        }
    }
}
</script>
