import { getServerSession } from "next-auth/next";

import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: {
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        image: session.user.image ?? null,
      },
    },
  };
}

export default ProfilePage;
