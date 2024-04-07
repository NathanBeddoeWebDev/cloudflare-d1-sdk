interface D1ClientOptions {
  accountId: string;
  apiKey?: string;
  apiEmail?: string;
  bearerToken?: string;
  databaseId?: string;
}

interface DatabaseCreationResponse {
  errors: {
    code: number;
    message: string;
  }[];
  messages: {
    code: number;
    message: string;
  }[];
  result: {
    created_at: string;
    name: string;
    uuid: string;
    version: string;
  };
  success: boolean;
}

interface DatabaseListResponse {
  errors: {
    code: number;
    message: string;
  }[];
  messages: {
    code: number;
    message: string;
  }[];
  result: {
    created_at: string;
    name: string;
    uuid: string;
    version: string;
  }[];
  result_info: {
    count: number;
    page: number;
    per_page: number;
    total_count: number;
  };
  success: boolean;
}

interface QueryResponse {
  errors: {
    code: number;
    message: string;
  }[];
  messages: {
    code: number;
    message: string;
  }[];
  result: any[];
  success: boolean;
}

type D1ClientType = {
  create: (databaseName: string) => Promise<DatabaseCreationResponse>;
  list: (params?: {
    name?: string;
    page?: number;
    per_page?: number;
  }) => Promise<DatabaseListResponse>;
  query: (
    sql: string,
    params?: string[],
    databaseId?: string,
  ) => Promise<QueryResponse>;
};

/**
 * D1Client is a client object that can be used to interact with the D1 HTTP API.
 * @param options Authentication options, as well as a a default database id to use for queries.
 * @returns A client object with methods to communicate with the D1 HTTP API.
 */
export default function D1Client(options: D1ClientOptions): D1ClientType {
  const { accountId, apiKey, apiEmail, bearerToken } = options;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    headers["X-Auth-Key"] = apiKey;
  }

  if (apiEmail) {
    headers["X-Auth-Email"] = apiEmail;
  }

  if (bearerToken) {
    headers["Authorization"] = bearerToken;
  }

  /**
   * Create a new database in the D1 HTTP API.
   * @param databaseName Name of the database to create
   * @returns The result from the cloudflare D1 HTTP API.
   */
  async function createDatabase(
    databaseName: string,
  ): Promise<DatabaseCreationResponse> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database`;
    const body = {
      name: databaseName,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data: DatabaseCreationResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating D1 database:", error);
      throw error;
    }
  }

  /**
   * List databases from your account from the D1 HTTP API.
   * @param params Search and pagination options for listing D1 databases
   * @returns The result from the cloudflare D1 HTTP API.
   */
  async function listDatabases(params?: {
    name?: string;
    page?: number;
    per_page?: number;
  }): Promise<DatabaseListResponse> {
    const url = new URL(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database`,
    );

    if (params) {
      if (params.name) {
        url.searchParams.append("name", params.name);
      }
      if (params.page) {
        url.searchParams.append("page", params.page.toString());
      }
      if (params.per_page) {
        url.searchParams.append("per_page", params.per_page.toString());
      }
    }

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: headers,
      });

      const data: DatabaseListResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error listing D1 databases:", error);
      throw error;
    }
  }

  /**
   *
   * @param sql The sql you want to execute. Use ? in place of parameters.
   * @param params The parameters to use in the query. Use in order of ? in the sql.
   * @param databaseId The database you wish to execute the query on. If not provided, the default database id will be used.
   * @returns The result from the cloudflare D1 HTTP API.
   */
  async function queryDatabase(
    sql: string,
    params?: string[],
    databaseId?: string,
  ): Promise<QueryResponse> {
    const dbId = databaseId || options.databaseId;
    if (!dbId) {
      throw new Error("No database id provided");
    }
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`;

    const body = {
      sql: sql,
      params: params || [],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data: QueryResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error querying D1 database:", error);
      throw error;
    }
  }

  return {
    create: createDatabase,
    list: listDatabases,
    query: queryDatabase,
  };
}
