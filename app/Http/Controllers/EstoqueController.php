<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estoque;

class EstoqueController extends Controller
{
    // Mostrar todos os itens
    public function index()
    {
        $itens = Estoque::all();
        return view('estoque', compact('itens'));
    }

    // Adicionar item novo com quantidade 0
    public function store(Request $request)
    {
        Estoque::create([
            'nome' => $request->nome,
            'quantidade' => 0
        ]);

        return redirect()->route('estoque.index');
    }

    // Atualizar quantidade
    public function update(Request $request, $id)
    {
        $item = Estoque::findOrFail($id);
        $item->quantidade = $request->quantidade;
        $item->save();

        return redirect()->route('estoque.index');
    }

    // Remover item
    public function delete(Request $request, $id)
    {
        $item = Estoque::findOrFail($id);
        $item->delete();

        return redirect()->route('estoque.index');
    }
}
