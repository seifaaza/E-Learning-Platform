import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import LessonDetails from "./lessonDetails";
import { Suspense } from "react";
import DetailsLoader from "@/components/main/loaders/detailsLoader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface LessonItemProps {
  params: {
    lessonId: string;
  };
}

const LessonItem: React.FC<LessonItemProps> = async ({
  params: { lessonId },
}) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <section className="bg-blue-50">
      <article className="container px-3 xl:px-8 pt-12 pb-20">
        <Link href="/lessons" className="my-6">
          <Button>
            <BsChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="mt-6 flex flex-col gap-10 xl:gap-12 lg:flex-row lg:justify-between">
          <Suspense fallback={<DetailsLoader />}>
            <LessonDetails lessonId={lessonId} />
          </Suspense>
        </div>
      </article>
    </section>
  );
};

export default LessonItem;
