# koa GraphQL server

This is a GraphQL backend server using Koajs, Typescript and MongoDB.

## Installation

- Clone the repo.

```sh
# install all dependencies
yarn
# or
npm install
# copy .env file
cp .env.example .env
# start project
yarn dev
# see on GraphiQL graphql interface on localhost link
http://localhost:9000/graphql

```

## Mutations
- Create a new transaction.
```graphql 
mutation {
  TransactionCreate(input: {
    transactionId: 1,
    name: "rent",
    category: "bills",
    price: "1500.00"
  }) {
    transaction {
      id
      name
      category
      price
      
    }
    error
  }
}
```
- Update a transaction.
```graphql 
mutation {
  TransactionUpdate(input: {
    transactionId: 1,
    name: "rent",
    category: "bills",
    price: "1700.00"
  }) {
    transaction {
      id
      name
      category
      price
      
    }
    error
  }
}
```
- Delete a transaction.
```graphql 
mutation {
  TransactionDelete(input: { transactionId: 1}) {
    transactionId
  }
}
```

## Queries

- All Transactions query
```graphql 
query {
  transactions {
    totalCount
    edges {
      node {
        id
        name
        category
        price
      }
    }
  }
}
```