import { COURSES } from "../../app/models/nail-menu";

export const NailCoursesMenu = () => {
  return (
    <div>
      <h2>ネイルメニュー</h2>
      <ul>
        {COURSES.map((course) => (
          <li key={course.id}>
            <strong>{course.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};
