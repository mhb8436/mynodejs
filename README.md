# mynodejs

# create database and user 

create database ch10;
create user admin with encrypted password 'admin1234';
grant all privileges on database ch10 to admin;




create table users (
    id integer primary key autoincrement, 
    email varchar
    password varchar
    name varchar
    address varchar
)

