import React, { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

export default function NewMeetupPage() {
  const route = useRouter();
  async function addedMeetUpHandler(meetupdata) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupdata),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    route.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add New Meetups</title>
        <meta
          name="description"
          content="add a list of new meetups"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addedMeetUpHandler} />
    </Fragment>
  );
}
