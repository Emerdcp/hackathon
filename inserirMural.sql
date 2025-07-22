create table cad_mural (
    id int auto_increment primary key,
    tipo char(1) COMMENT 'TIPO DE SERVICO (V)ENDA (O)FERECO',
    nome varchar(100) COMMENT 'NOME PESSOA',
    email varchar(100) COMMENT 'EMAIL PESSOA',
    telefone varchar(20) COMMENT 'TELEFONE PESSOA',
    titulo varchar(100) COMMENT 'TÍTULO PESSOA',
    descricao varchar(250)
    data_criacao datetime default current_timestamp
);