import { MongoClient } from "mongodb";
import Head, { head } from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
//request for authentication=getServerSideProps
//no request for authentication =getStaticProps
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props:{
//       meetups: DUMMY_LOCATIONS
//     }
//   }
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Eche:Echendu4@cluster0.ckqjgyq.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
