import Sidebar from "@/components/Sidebar";
import ApiCard from "@/components/ApiCard";

const endpoints = [
  {
    method: "GET" as const,
    path: "/v1/users",
    description: "List all users",
    responseCode: `{
  "data": [
    {
      "id": "usr_1a2b3c",
      "email": "ada@example.com",
      "name": "Ada Lovelace",
      "created_at": "2024-01-15T09:30:00Z"
    }
  ],
  "has_more": true,
  "total": 142
}`,
  },
  {
    method: "POST" as const,
    path: "/v1/users",
    description: "Create a new user",
    responseCode: `{
  "id": "usr_4d5e6f",
  "email": "grace@example.com",
  "name": "Grace Hopper",
  "created_at": "2024-03-16T14:22:00Z"
}`,
  },
  {
    method: "GET" as const,
    path: "/v1/users/:id",
    description: "Retrieve a user by ID",
    responseCode: `{
  "id": "usr_1a2b3c",
  "email": "ada@example.com",
  "name": "Ada Lovelace",
  "role": "admin",
  "created_at": "2024-01-15T09:30:00Z",
  "last_login": "2024-03-16T08:15:00Z"
}`,
  },
  {
    method: "PUT" as const,
    path: "/v1/users/:id",
    description: "Update an existing user",
    responseCode: `{
  "id": "usr_1a2b3c",
  "email": "ada@example.com",
  "name": "Ada Lovelace",
  "role": "superadmin",
  "updated_at": "2024-03-16T14:30:00Z"
}`,
  },
  {
    method: "DELETE" as const,
    path: "/v1/users/:id",
    description: "Delete a user",
    responseCode: `{
  "deleted": true,
  "id": "usr_1a2b3c"
}`,
  },
];

const Index = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 py-12 px-8 lg:px-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">API Reference</h1>
        <p className="text-muted-foreground text-base mb-12 max-w-[65ch]">
          Complete reference for the Users API. All endpoints require a valid API key passed via the{" "}
          <code className="text-sm font-mono bg-secondary px-1.5 py-0.5 rounded-sm text-foreground">
            Authorization
          </code>{" "}
          header.
        </p>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-1">Users</h2>
          <p className="text-sm text-muted-foreground mb-6">
            The Users API lets you create, retrieve, update, and delete user records.
          </p>
          <div className="space-y-3">
            {endpoints.map((ep) => (
              <ApiCard key={`${ep.method}-${ep.path}`} {...ep} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-lg font-semibold text-foreground mb-1">Authentication</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-[65ch]">
            Authenticate your requests by including your API key in the Authorization header.
          </p>
          <div className="rounded-lg border border-border bg-card/50 p-5">
            <pre className="text-sm font-mono text-foreground/90">
              <code>{`curl -X GET https://api.example.com/v1/users \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
            </pre>
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default Index;
