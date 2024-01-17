import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Loader from "../loader/loader";

import classes from "./main-navigation.module.css";
import { useState } from "react";

function MainNavigation() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function logoutHandler() {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  }

  return (
    <>
      <header className={classes.header}>
        <Link legacyBehavior href="/">
          <a>
            <div className={classes.logo}>Next Auth</div>
          </a>
        </Link>
        <nav>
          <ul>
            {!session && status === "unauthenticated" && (
              <li>
                <Link href="/auth">Login</Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            )}
            {session && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {isLoading && <Loader />}
    </>
  );
}

export default MainNavigation;
