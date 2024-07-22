import React, { Suspense } from "react";
import LessonsList from "./lessonsList";
import Heading from "@/components/main/heading";
import ListLoader from "@/components/main/loaders/listLoader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { MainPagination } from "@/components/main/pagination";

const Lessons: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-12 pb-20">
        <Heading title="engage with interactive video lessons" />
        <ul className="mt-8 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <Suspense fallback={<ListLoader />}>
            <LessonsList />
          </Suspense>
        </ul>
        <MainPagination />
      </article>
    </section>
  );
};

export default Lessons;
