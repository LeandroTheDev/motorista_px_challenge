# Motorista PX Challenge
> [!NOTE]
> Esse é um projeto derivado de um desafio e não deve ser usado em produção.

### Iniciando
- Instale php e composer no seu OS
``Extensões Necessárias do PHP``
```

extension=pdo_sqlite
extension=sqlite3
extension=openssl
extension=fileinfo
extension=mbstring
extension=zip
```
- Clone o repositorio atual ``git clone https://github.com/LeandroTheDev/motorista_px_challenge``
- Instale dependenciais do composer: ``composer install``
- Gere uma chave: ``php artisan key:generate``
- Inicie o servidor: ``php artisan serve``