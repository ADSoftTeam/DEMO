@extends('layouts.app')

@section('content')
<div class="columns is-centered">
    <div class="column is-narrow">
        <h1 class="is-size-1">Сброс пароля</h1>

        <form method="POST" action="{{ route('password.request') }}">
            @csrf

            <input type="hidden" name="token" value="{{ $token }}">            

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
                Сохранить пароль
            </button>
        </form>
    </div>
</div>
@endsection
