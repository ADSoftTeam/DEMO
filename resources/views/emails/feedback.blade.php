<h2>Запрос в техподдержку №{{ $data->id }}</h2>
<hr/>
<h3>Игра: {{ $data->game_slug}}</h3>
<p>Выбранные вопросы: {{ $data->questions }}</p>
<p>Сообщение: {{ $data->message }}</p>
<hr/>
<p><b>Отправитель</b></p>
<p>Имя: {{ $data->name }}</p>
<p>E-mail: {{ $data->email }}</p>
<p>{{ $data->created_at }}

С уважением, {{ config('app.name') }}	

