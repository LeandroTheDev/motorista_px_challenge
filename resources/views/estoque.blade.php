<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Estoque</title>
    <link rel="stylesheet" href="{{ asset('css/estoque.css') }}">
</head>

<body>
    <h1>Estoque</h1>

    <!-- Form para adicionar novo item -->
    <form action="{{ route('estoque.store') }}" method="POST" id="novo-item">
        @csrf
        <input type="text" name="nome" placeholder="Nome do item" required>
        <button type="submit" id="novo-btn">Novo</button>
    </form>

    <br>

    <!-- Tabela de itens -->
    <table>
        <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Ações</th>
        </tr>
        @foreach($itens as $item)
            <tr>
                <td>{{ $item->nome }}</td>

                <!-- Input de quantidade -->
                <td>
                    <form action="{{ route('estoque.update', $item->id) }}" method="POST" class="update-form">
                        @csrf
                        <input type="number" name="quantidade" value="{{ $item->quantidade }}" class="quantity-input">
                        <button type="submit" class="save-btn">Salvar</button>
                    </form>
                </td>

                <!-- Botão deletar separado -->
                <td class="delete-cell">
                    <form action="{{ route('estoque.delete', $item->id) }}" method="POST" class="delete-form">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="delete-btn">Deletar</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </table>


</body>

</html>