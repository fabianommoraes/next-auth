import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { useEffect, useState } from "react";

import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace("/");
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return <AuthForm />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AuthPage;
