@component('mail::message')
# Сброс пароля

Для сброса пароля нажмите на кнопку ниже.

@component('mail::button', ['url' => route('password.reset', $token)])
Сбросить пароль
@endcomponent

С уважением,<br>
{{ config('app.name') }}
@endcomponent
