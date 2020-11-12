<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Необходимо принять условия.',
    'boolean' => 'Укажите булево значение.',
    'confirmed' => 'Поля не совпадают.',
    'date' => 'Неверный формат.',
    'date_format' => 'Необходимый формат: :format.',
    'email' => 'Введите корректный email адрес.',
    'exists' => 'Указано несуществующее значение.',
    'file' => 'Поле не является файлом.',
    'image' => 'Поле не является изображением.',
    'in' => 'Выбран неверный элемент.',
    'integer' => 'Поле должно быть целым числом.',
    'max' => [
        'numeric' => 'Значение поля не может быть больше чем :max.',
        'string' => 'Поле не должно быть длиннее :max символов.',
    ],
    'mimes' => 'Разрешенные форматы: :values.',
    'mimetypes' => 'Разрешенные форматы: :values.',
    'min' => [
        'numeric' => 'Значения поля должно быть не меньше :min.',
        'string' => 'Поле должно быть не короче :min символов.',
    ],
    'numeric' => 'Поле должно быть числом.',
    'regex' => 'Неверный формат.',
    'required' => 'Поле является обязательным.',
    'required_if' => 'Поле является обязательным.',
    'required_without' => 'Поле является обязательным.',
    'string' => 'Поле должно содержать текст.',
    'unique' => 'Такое значение уже занято.',
    'url' => 'Неверный формат ссылки.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
     */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
     */

    'attributes' => [],
];
