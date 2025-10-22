drop schema if exists ccca;

create schema ccca;

create table ccca.account (
    account_id uuid primary key,
    name varchar(255),
    email varchar(255) unique,
    document varchar(255),
    password varchar(255)
)
