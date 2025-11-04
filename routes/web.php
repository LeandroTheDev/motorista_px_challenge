<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EstoqueController;

Route::get('/', function () {
    return redirect('/estoque');
});

Route::get('/estoque', [EstoqueController::class, 'index'])->name('estoque.index');
Route::post('/estoque', [EstoqueController::class, 'store'])->name('estoque.store');
Route::post('/estoque/{id}', [EstoqueController::class, 'update'])->name('estoque.update');
Route::delete('/delete/{id}', [EstoqueController::class, 'delete'])->name('estoque.delete');