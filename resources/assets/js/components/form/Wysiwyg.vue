<template>
    <div class="field">
        <label class="label" v-text="label"></label>

        <div class="control">
            <textarea :name="name"
                :id="name"
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
        'label'
    ],

    data () {
        return {
            value: this.form.data[this.name]
        }
    },

    watch: {
        'form.data': {
            handler: function(newData, oldData, atata) {
                if (this.value != newData[this.name]) {
                    this.value = newData[this.name];
                    this.form.clearErrors(this.name);

                    if (!this.value) {
                        tinymce.get(this.name).setContent('');
                    }
                }
            },
            deep: true
        },
    },

    mounted () {
        var editor_config = {
            path_absolute : "/",
            selector: `#${this.name}`,

            plugins: [
                "autoresize",
                "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars code fullscreen",
                "insertdatetime media nonbreaking save table directionality",
                "emoticons template paste textcolor colorpicker textpattern"
            ],

            toolbar: "undo redo | styleselect | bold italic underline strikethrough | superscript subscript | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | table hr code",

            relative_urls: false,

            statusbar: false,
            menubar: false,

            language: 'ru',

            file_browser_callback : function(field_name, url, type, win) {
                var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
                var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
                var cmsURL = editor_config.path_absolute + 'laravel-filemanager?field_name=' + field_name;
                if (type == 'image') {
                    cmsURL = cmsURL + "&type=Images";
                } else {
                    cmsURL = cmsURL + "&type=Files";
                }
                tinyMCE.activeEditor.windowManager.open({
                    file : cmsURL,
                    title : 'Filemanager',
                    width : x * 0.8,
                    height : y * 0.8,
                    resizable : "yes",
                    close_previous : "no"
                });
            },

            init_instance_callback: (editor) => {
                editor.on('keyup', (e) => {
                    this.form.data[this.name] = editor.getContent();
                });

                editor.on('NodeChange', (e) => {
                    this.form.data[this.name] = editor.getContent();
                });

                editor.on('Undo', (e) => {
                    this.form.data[this.name] = editor.getContent();
                });

                editor.on('Redo', (e) => {
                    this.form.data[this.name] = editor.getContent();
                });
            },

            valid_elements: '*[*]',
        };

        tinymce.init(editor_config);
    }
}
</script>
