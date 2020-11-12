<template>
    <div class="field">
        <label class="label" v-text="label"></label>

        <div class="control">
            <datetime v-model="form.data[name]"
                type="datetime"
                :input-class="form.errors[name] ? 'input is-danger' : 'input'"
                moment-locale="ru"
                :i18n="{ok:'Выбрать', cancel:'Отмена'}"
                monday-first
                auto-continue></datetime>
        </div>

        <p class="help is-danger"
            v-if="form.errors[name]"
            v-text="form.errors[name][0]"></p>
    </div>
</template>

<script>
import { Datetime } from 'vue-datetime';

export default {
    components: { Datetime },

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
