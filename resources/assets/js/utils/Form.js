class Form {
    /**
     * Create a new Form instance.
     * 
     * @param {object} fields 
     */
    constructor(fields) {
        this.data = fields;
        this.initialData = Object.assign({}, fields);

        this.isSubmitting = false;

        this.errors = [];
        this.error = '';
    }

    /**
     * Submit the form.
     * 
     * @param {string} method 
     * @param {string} endpoint
     * @param {object} data 
     */
    submit(method, endpoint, data = this.data) {
        this.isSubmitting = true;
        this.error = '';

        // Send data in the FormData format, otherwise files are not processed
        // correctly
        if (method === 'post') {
            const formData = new FormData();

            for (let key in data) {
                let value = data[key];

                if (typeof value === 'boolean') {
                    // Booleans are not allowed, only strings & buffers are allowed
                    if (value === true) {
                        formData.append(key, '1');
                    }
                } else if (value === null) {
                    formData.append(key, '');
                } else if (typeof value === 'object' && value.constructor === Array) {
                    // Arrays should be added in this way (each item separately)
                    for (let i = 0; i < value.length; i++) {
                        formData.append(key + '[]', value[i]);
                    }
                } else {
                    formData.append(key, value);
                }
            }

            data = formData;
        }

        return new Promise((resolve, reject) => {
            axios[method](endpoint, data)
                .then((response) => {
                    this.onSuccess(response);

                    resolve(response);
                })
                .catch((response) => {
                    this.onFail(response);

                    reject(response);
                });
        });
    }

    /**
     * Handle a successful form submission.
     * 
     * @param {object} response 
     */
    onSuccess(response) {
        this.isSubmitting = false;
    }

    /**
     * Handle a failed form submission.
     * 
     * @param {object} response 
     */
    onFail(response) {
        if (response.response.data.errors) {
            if (typeof response.response.data.errors === 'string') {
                this.errors = [];
                this.error = response.response.data.errors;
            } else {
                this.error = response.response.data.message;
                this.errors = response.response.data.errors;
            }
        }

        this.isSubmitting = false;
    }

    /** 
     * Whether the form has any errors.
    */
    hasErrors() {
        return !!Object.keys(this.errors).length;
    }

    /**
     * Clear errors for the provided field.
     * 
     * @param {string} field 
     */
    clearErrors(field) {
        delete this.errors[field];
    }

    /** 
     * Reset the form to the initial state.
    */
    reset(setInitialData = false) {
        if (setInitialData) {
            this.data = Object.assign({}, this.initialData);
        } else {
            for (let key in this.data) {
                if (typeof this.data[key] === 'string') {
                    this.data[key] = '';
                } else if (typeof this.data[key] === 'number') {
                    this.data[key] = '';
                } else if (typeof this.data[key] === 'boolean') {
                    this.data[key] = false;
                } else if (typeof this.data[key] === 'array') {
                    this.data[key] = [];
                } else if (typeof this.data[key] === 'object') {
                    this.data[key] = {};
                }
            }
        }

        this.errors = [];
        this.error = '';

        this.isSubmitting = false;
    }
}

export default Form;