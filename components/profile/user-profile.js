// import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import Loader from "../loader/loader";

function UserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData) {
    setIsLoading(true);
    setResponse(false);

    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      setResponse("Something went wrong! Try again.");
    }

    setIsLoading(false);
  }

  return (
    <>
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm onChangePassword={changePasswordHandler} />
        {response && <h2>{response}</h2>}
      </section>

      {isLoading && <Loader />}
    </>
  );
}

export default UserProfile;
