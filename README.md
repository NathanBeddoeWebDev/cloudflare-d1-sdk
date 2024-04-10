# Cloudflare D1 SDK

This is a TypeScript/JavaScript client for interacting with the Cloudflare D1 HTTP API. It provides a simple and intuitive way to create databases, list databases, and execute SQL queries on your D1 databases.

## Installation

You can install this package using your favourite package manager:

```bash
bun install d1-sdk
```

## Usage

First, import the `D1Client` function from the package:

```typescript
import D1Client from 'd1-sdk';
```

Then, create a new client instance by calling the `D1Client` function with your authentication options:

```typescript
const d1 = D1Client({
  accountId: 'your-account-id',
  apiKey: 'your-api-key',
  apiEmail: 'your-api-email',
  databaseId: 'your-default-database-id', // optional
});
```

You can provide either an `apiKey` and `apiEmail` pair or a `bearerToken` for authentication.

### Creating a Database

To create a new database, use the `create` method:

```typescript
const response = await d1.create('my-new-database');
console.log(response);
```

### Listing Databases

To list your existing databases, use the `list` method:

```typescript
const response = await d1.list();
console.log(response);
```

You can also provide optional search and pagination parameters:

```typescript
const response = await d1.list({
  name: 'database-name',
  page: 1,
  per_page: 10,
});
console.log(response);
```

### Executing SQL Queries

To execute SQL queries on a database, use the `query` method:

```typescript
const sql = 'SELECT * FROM users WHERE id = ?';
const params = ['user-id'];
const response = await d1.query(sql, params);
console.log(response);
```

If you provided a `databaseId` when creating the client, it will be used as the default database for queries. You can also specify a different database for a specific query:

```typescript
const response = await d1.query(sql, params, 'another-database-id');
console.log(response);
```

## API

### `D1Client(options: D1ClientOptions): D1ClientType`

Creates a new D1 client instance.

#### Parameters

- `options: D1ClientOptions`
  - `accountId: string` - Your Cloudflare account ID.
  - `apiKey?: string` - Your Cloudflare API key.
  - `apiEmail?: string` - Your Cloudflare API email.
  - `bearerToken?: string` - Your Cloudflare API bearer token.
  - `databaseId?: string` - The default database ID to use for queries.

#### Returns

- `D1ClientType` - An object with methods to interact with the D1 HTTP API.

### `create(databaseName: string): Promise<DatabaseCreationResponse>`

Creates a new database.

#### Parameters

- `databaseName: string` - The name of the database to create.

#### Returns

- `Promise<DatabaseCreationResponse>` - A promise that resolves to the response from the Cloudflare D1 HTTP API.

### `list(params?: { name?: string; page?: number; per_page?: number }): Promise<DatabaseListResponse>`

Lists databases in your account.

#### Parameters

- `params?: { name?: string; page?: number; per_page?: number }` (optional)
  - `name?: string` - Filter databases by name.
  - `page?: number` - The page number for pagination.
  - `per_page?: number` - The number of results per page.

#### Returns

- `Promise<DatabaseListResponse>` - A promise that resolves to the response from the Cloudflare D1 HTTP API.

### `query(sql: string, params?: string[], databaseId?: string): Promise<QueryResponse>`

Executes an SQL query on a database.

#### Parameters

- `sql: string` - The SQL query to execute. Use `?` as placeholders for parameters.
- `params?: string[]` (optional) - The parameters to use in the query, in the order of the `?` placeholders.
- `databaseId?: string` (optional) - The ID of the database to execute the query on. If not provided, the default database ID will be used.

#### Returns

- `Promise<QueryResponse>` - A promise that resolves to the response from the Cloudflare D1 HTTP API.

## License

This package is licensed under the MIT License.