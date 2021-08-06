// incluindo biblioteca http
const http = require('http');
const url = require('url');
const queryString = require('query-string');

// configuração de IP e porta
const hostname = '127.0.0.1'; // IP do localhost
const port = 3000;

// Implementação da regra de negógio
const server = http.createServer((req, res) => {

  // Pegar a pergunta da url
  // console.log(req.url);
  const params = queryString.parse(url.parse(req.url, true).search);
  
  let resposta = '';
  // Veriricar pergunta e escolher resposta
  if (params.pergunta == 'melhor-filme') {
    resposta = 'o melhor filme';
  } 
  else if (params.pergunta == 'melhor-livro') {
    resposta = 'o melhor livro';
  }
  else {
    resposta = 'nao sei, descullpe :/';
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);
});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});