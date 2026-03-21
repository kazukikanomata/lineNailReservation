import { COURSES } from "@/app/models/nail-menu";
import Link from "next/link";

export const NailCoursesMenu = () => {
  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {COURSES.map((course) => (
          <li key={course.id}>
            <Link href={`/calendar`}>
              <div>
                <strong>{course.name}</strong>
                <p>クリックして詳細を見る</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
