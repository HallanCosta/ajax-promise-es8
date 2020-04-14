# Sintax
---
#### ajax.post();
```javascript
const url = 'request';
const formData = new FormData();
const notification = true;
ajax.post(url, formData, notification)
	.then((response) => {
        #code
	})
```

#### ajax.get();
```javascript
const url = 'request';
const parameters = 'name=foo&lastname=bar';
const notification = true;
ajax.get(url, parameters, notification)
	.then((response) => {
        #code
	})
```


# Documentation
---
#### os ajax tanto post quanto o get são assíncronos então retornará uma promise.
##### ajax.post(url, formData, notification)
- url: por padrão ele já espera um arquivo.php, so o nome do arquivo ja basta.
- formData: passando seu formulario por padrão ele converte em objeto com o constructor do new FormData()
- notification: true para alertar o que realmente esta mandando e o que esta recebendo. false para caso não for mais necessario. OBS: não obrigatorio por padrão recebe false

##### ajax.get(url, formData, notification)
- *url: por padrão ele já espera um arquivo.php, so o nome do arquivo ja basta.
- *parameters: deverá passar uma query string para requisições.
- notification: true para alertar o que realmente esta mandando e o que esta recebendo. false para caso não for mais necessario. OBS: não obrigatorio por padrão recebe false.

# Exemplo to use
---
primeiro crie sua pasta "ajax-promise-es8" e dentro dela crie uma pasta "src", dentro de src crie uma pasta chamada "pages" e dentro de pages outras pastas com nome "get" e outra "post". Abra seu terminal dentro da pasta ajax-promise-es8 e instale o ajax usando o comando "npm i ajax-promise-es8".

#### Estrutura de pastas
```pasta
node_modules
ajax-promise-es8
    -> src
      -> pages
          -> get
          -> post
```

##### dentro de src/pages/post/ vamos criar 3 arquivos (index.js, users.js e users.php).

Abra o index.js e exporte uma função com nome HTMLform, dentro crie seu formulario.
#### src/pages/post/index.js
```js
export default function HTMLform() {
	let form = 	'<form id="myForm">'
	form += 		'<br><label>Name: </label><br>'
	form += 		'<input type="text" name="name"><br>'
	form += 		'<label>Last Name: </label><br>'
	form += 		'<input type="text" name="lastname"><br>'
	form += 		'<button type="submit">Register</button>'
	form += 	'</form>'

	return form;
}
```
Abra o users.js e importe o ajax e o message de dentro de node_modules, exporte uma função com o nome "register" faça um bloco try/catch e chame a função ajax.post(url, formData, notification) e passe os parametros url coloque o diretorio do arquivo.php, em formData coloque o fomulario e em passe true.

obs: você pode usar o bloco try/catch ou pode usar uma promise .catch((error) => {})

#### src/pages/post/users.js
```js
import { ajax, message } from '/node_modules/ajax-promise-es8/ajax.js';

export default function register() {

	try {

		ajax.post('./src/pages/post/users', myForm, true)
			.then((response) => {
				const user = JSON.parse(response);
				alert(`User ${user.name}${user.lastname} register with success!`);
			})

	} catch (error) {
		console.error(error)
	}

}
```
em users.php vamos simular o cadastro de um usuario depois devolver o retorno do usuario em json usando a função json_enconde do php.
#### src/pages/post/users.php
```js
<?php

	//UM EXEMPLO BEM BESTINHA!
	$user = [
        0 => [
            "id"        => 1,
            "name"      => $_POST['name'],
            "lastname"  => $_POST['lastname']
        ]
    ];


    echo json_encode($user[0]);
```
agora em src/pages/get/index.js exporte duas funções uma com nome "HTMLButtonlistAllUsers" e a outra "HTMLDivUsers". crie um botão com id "toList" dentro da função HTMLButtonlistAllUsers, crie uma div com id "div-users" na função HTMLDivUsers.
#### src/pages/get/index.js
```js
export function HTMLButtonlistAllUsers() {

	let button = '<br><br><button id="toList">List All Users</button>';

	return button;
}

export function HTMLDivUsers() {
	let div = '<div id="div-users"></div>'
	return div;
}
```
em users.js importe o ajax e o message, crie uma função assíncrona com o nome "listAllUsers", dentro da função listAllUsers crie o bloco try/catch e crie uma variável let list em seguida chame o ajax.get(url, parameters, notification), na url coloque o diretorio onde se localiza o users.php, parameters não precisa passar nada e notication coloque true  popule os usuarios que vão ser retornado na promise then usando array.map() e retorne a lista
#### src/pages/get/users.js
```js
import { ajax, message } from '/node_modules/ajax-promise-es8/ajax.js';

export default async function listAllUsers() {

	try {

		let list = `<h3>List users</h3>`
		await ajax.get('./src/pages/get/users', '', true)
			.then((response) => {
				const users = JSON.parse(response);

				list += 	`<ol>`;
				users.map((user) => list += `<li>${user.name}${user.lastname}</li>`)
				list += 	`</ol>`;

			})
		return list;

	} catch (error) {
		console.error(error);
	}

}
```
em users.php vamos SIMULAR denovo só que dessa vez o retorno da busca em um banco de dados (3 usuários).
#### src/pages/get/users.php
```php
<?php

    //UM OUTRO EXEMPLO BEM BESTINHA!
	$users = [

        0 => [
            "id"        => 1,
            "name"      => "Hállan",
            "lastname"  => "Costa"
        ],
        1 => [
            "id"        => 2,
            "name"      => "Valentina",
            "lastname"  => "Soares"
        ],
        2 => [
            "id"        => 3,
            "name"      => "Carlos",
            "lastname"  => "Valencio"
        ]
    ];

    echo json_encode($users);
```
## Terminamos nossas rotas para fazer a requisição!
---
Agora crie dois arquivos no diretorio / que é o da nossa pasta ajax-promise-es8 com nome de (app.js e index.php). dentro de /index.php crie o html e um div dentro do body com id "root", embaixo dessa div crie um script e coloque tipo desse script como module, dentro de script importe o arquivo app.js com o nome app e chame a função app.
#### /index.php
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8">
	<title>AJAX - POST</title>
</head>
<body>
	<div id="root"></div>

	<script type="module">
		import app from './app.js';
		app();
	</script>
</body>
</html>

```

No diretorio src/ crie dois arquivos com nome (index.js e o routes.js).

dentro de routes.js importe a função "HTMLform" que criamos dentro de pages/post/index.js e a função "register" que criamos dentro de pages/post/users.js.

ainda dentro de routes.js importe as funções "HTMLButtonlistAllUsers" e "HTMLDivUsers" que criamos dentro de pages/get/index.js e importe também a função "listAllUsers" que criamos dentro de pages/get/users.js

export uma função chamada RequestInPost. dentro de RequestInPost crie uma variável root para pegar nossa div do /index.php. execute a função "HTMLform" dentro de root depois crie uma variável pegando o id do formulario, crie um evento para quando o formulario for submetido de um preventDefault no formulario e execute a nossa função "register".

agora exporte uma função chamada RequestInGet. dentro de RequestInGet crie a mesma variável com nome "root" e pegue a div com id root do /index.php. execute a nossa função HTMLButtonlistAllUsers dentro de root e pegue o id do nosso botão e crie um evento para ele, execute dentro de root também a função HTMLDivUsers, pegue o id dessa div e execite a função listAllUsers e use a promise then para quando o resultado estiver pronto ele retorne. dentro do then coloque a resposta dentro de divUsers.

#### src/routes.js
```js
import HTMLform from './pages/post/index.js';
import register from './pages/post/users.js';

import { HTMLButtonlistAllUsers, HTMLDivUsers } from './pages/get/index.js';
import listAllUsers from './pages/get/users.js';

export function RequestInPost() {
	const root = document.getElementById('root');

	root.innerHTML += HTMLform();

	const myForm = document.getElementById('myForm');
	myForm.addEventListener('submit', (e) => {
		e.preventDefault();
		register();
	})
}

export function RequestInGet() {
	root.innerHTML += HTMLButtonlistAllUsers();

	const button = document.querySelector('button#toList');
	button.addEventListener('click', () => {
		root.innerHTML += HTMLDivUsers();
		const divUsers = document.querySelector('div#div-users');
		listAllUsers()
			.then((response) => {
				divUsers.innerHTML = response;
			});
	})
}
```
dentro de index.js importe RequestInPost e RequestInGet de dentro de routes.js. Exporte uma função e crie os botões "POST" e passe o id "post" e GET e passe o id "get", chame esses botões para dentro da nossa div root do /index.php.

Crie a variável btnPost e crie um evento para quando ele clicar esse botão dar um alerta com a messagem "You will initialize the request POST" e executar a função RequestInPost.

Crie a variável btnGet e crie um evento para quando ele clicar esse botão dar um alerta com a messagem "You will initialize the request GET" e executar a função RequestInGet.
#### src/index.js
```js
import { RequestInPost, RequestInGet } from './routes.js';

export default function() {
	let buttons = '<button id="post">POST</button>&nbsp'
	buttons += '<button id="get">GET</button>'
	document.getElementById('root').innerHTML = buttons;

	const btnPost = document.querySelector('button#post');
	btnPost.addEventListener('click', () => {
		alert('You will initialize the request POST');
		RequestInPost();
	})

	const btnGet = document.querySelector('button#get');
	btnGet.addEventListener('click', () => {
		alert('You will initialize the request GET');
		RequestInGet();
	})
}
```
---
#### TERMINADO TUDO, EXECUTE O SERVIDOR PHP COM O COMANDO E TESTO-O:
```php
php -S localhost:8888
```
---
#### REPOSITÓRIO PROJETO CONCLUÍDO: (https://github.com/HallanCosta/how-to-use-ajax-promise-es8.git)

