// incluindo biblioteca http
const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

// configuração de IP e porta
const hostname = '127.0.0.1'; // IP do localhost
const port = 3000;

// Implementação da regra de negógio
const server = http.createServer((req, res) => {

  let resposta = '';
    
  if (req.url != '/favicon.ico') {
      const urlparse = url.parse(req.url, true);
      const params = queryString.parse(urlparse.search);

    if (urlparse.pathname == '/criar-usuario') {
        fs.writeFile('./users/'+params.id+'.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            console.log('Salvo!');
          });
    
        resposta = 'usuario salvo';
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);
    }
    else if (urlparse.pathname == '/atualizar-usuario') {
        fs.writeFile('./users/'+params.id+'.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            console.log('Salvo!');
          });
    
        resposta = 'usuario atualizado';
        res.statusCode = 204;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);
    }
    // pesquisar usuario /pesquisar-usuario
    else if (urlparse.pathname == '/pesquisar-usuario') {
        console.log(urlparse.pathname)
        fs.readFile(`./users/${params.id}.txt`, function(err, data) {
            if (err) {
                resposta = 'usuario nao encontrado'
                res.setHeader('Content-Type', 'text/plain');
            } else {
                resposta = data;
                res.setHeader('Content-Type', 'application/json');
            }
            res.statusCode = 200;
            res.end(resposta);
        });
    }
    else if (urlparse.pathname == '/remover-usuario') {
        console.log(urlparse.pathname)
        
        fs.unlink(`./users/${params.id}.txt`, function (err) {
            resposta = err ? 'usuario nao encontrado': 'usuario deletado'; 
            res.setHeader('Content-Type', 'text/plain');
            console.log(resposta);
            res.statusCode = 200;
            res.end(resposta);
        });
    }
  }

});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});