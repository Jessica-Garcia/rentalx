import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'database'; // Essa opção deverá ser EXATAMENTE o nome do service do banco de dados no arquivo docker-compose.yml
  createConnection({
    ...options,
  });
});
