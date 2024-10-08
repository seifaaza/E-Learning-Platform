import { ScrollArea } from "@/components/ui/scroll-area";

// Define the interface for each article
interface Article {
  _id: string;
  title: string;
  content: string;
}

// Update the props interface to accept an array of articles
interface LessonArticlesProps {
  articles: Article[];
}

const LessonArticles: React.FC<LessonArticlesProps> = ({ articles }) => {
  return (
    <ScrollArea className="h-72 xl:h-96 w-full bg-main/5 p-3 xl:p-4 rounded-lg">
      <ul className="flex flex-col gap-4">
        {articles.map((article, index) => (
          <li key={article._id}>
            <h6 className="text-gray-900 font-medium mb-2">
              {index + 1}, {article.title}
            </h6>
            <h6 className="text-gray-700">{article.content}</h6>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default LessonArticles;
