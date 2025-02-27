"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-red-200 text-red-200">
      hello {session ? session.user.name : "anonymous"}
    </div>
  );
}
