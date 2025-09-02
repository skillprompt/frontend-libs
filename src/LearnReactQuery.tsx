import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PostList } from "./PostList";

const qc = new QueryClient();

export function LearnReactQuery() {
  return (
    <QueryClientProvider client={qc}>
      <div>
        <h1>Learn React Query</h1>

        <PostList />
      </div>
    </QueryClientProvider>
  );
}
