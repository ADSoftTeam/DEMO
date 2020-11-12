@extends('layouts.app')

@section('content')
<div class="columns is-centered">
    <div class="column is-narrow">
        <h1 class="is-size-1">Регистрация</h1>

        <form method="POST" action="{{ route('register') }}">
            @csrf

            @component('components.input', [
                'name' => 'name',
                'label' => 'Имя'
            ])@endcomponent

            @component('components.input', [
                'name' => 'email',
                'label' => 'E-mail адрес'
            ])@endcomponent

            @component('components.input', [
                'type' => 'password',
                'name' => 'password',
                'label' => 'Пароль'
            ])@endcomponent

            @component('components.input', [
                'type' => 'password',
                'name' => 'password_confirmation',
                'label' => 'Подтверждение пароля'
            ])@endcomponent

            <button type="submit" class="button is-primary">
                Зарегистрироваться
            </button>
        </form>
    </div>
</div>
@endsection
