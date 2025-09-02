import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type TPost = {
  id: number;
  userId: number;
  title: string;
};

export function PostList() {
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const { data, isLoading, error, isError } = useQuery<TPost[]>({
    queryKey: ["/posts"],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data = await res.json();
      return data;
    },
  });

  const { isLoading: isMutationLoading, mutate } = useMutation<
    any,
    any,
    { title: string }
  >({
    mutationFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: "no",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    },
  });

  // const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetch(`https://jsonplaceholder.typicode.com/posts`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("data", data);
  //       setTimeout(() => {
  //         setPosts(data);
  //         setIsLoading(false);
  //       }, 2000);
  //     });
  // }, []);

  if (isError) {
    return <p>{error || "something went wrong!"}</p>;
  }

  const handlePostSubmit = () => {
    // submit data to the backend
    console.log("title", title);
    mutate(
      {
        title,
      },
      {
        onSuccess: (data) => {
          qc.invalidateQueries({
            queryKey: ["/posts"],
          });
        },
        onError(error) {
          console.log("err", error.message);
          alert("Something went wrong");
        },
      }
    );
  };

  return (
    <div>
      <h2>Post List</h2>

      <form>
        <input
          name="title"
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
        <button
          type="button"
          onClick={handlePostSubmit}
          disabled={isMutationLoading}
        >
          {isMutationLoading ? "submitting..." : "submit"}
        </button>
      </form>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {data?.map((post) => {
            return <li>{post.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
