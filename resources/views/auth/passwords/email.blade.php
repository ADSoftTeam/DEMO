@extends('layouts.app')

@section('content')
<div class="columns is-centered">
    <div class="column is-narrow">
        <h1 class="is-size-1">Сброс пароля</h1>

        <form method="POST" action="{{ route('password.email') }}">
            @csrf

            @component('components.input', [
                'name' => 'email',
                'label' => 'E-mail адрес'
            ])@endcomponent

            <button type="submit" class="button is-primary">
                Отправить ссылку для сброса пароля
            </button>
        </form>
    </div>
</div>
@endsection
