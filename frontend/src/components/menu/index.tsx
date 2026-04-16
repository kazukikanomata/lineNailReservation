import Link from "next/link";
import BackButton from "../backButton";

type NailCourse = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
  imageUrl?: string;
  isOffIncluded: boolean;
};

export const COURSES: NailCourse[] = [
  {
    id: "1",
    name: "ワンカラー",
    price: 5000,
    durationMinutes: 90,
    description: "シンプルで上品なワンカラーネイル",
    imageUrl: "/images/one_color.jpg",
    isOffIncluded: false,
  },
  {
    id: "2",
    name: "マグネットカラー",
    price: 5000,
    durationMinutes: 90,
    description: "マグネットを使ったネイル",
    imageUrl: "/images/two_color.jpg",
    isOffIncluded: false,
  },
  {
    id: "3",
    name: "フレンチネイル",
    price: 7000,
    durationMinutes: 120,
    description: "上品なフレンチネイル",
    imageUrl: "/images/french.jpg",
    isOffIncluded: false,
  },
  {
    id: "4",
    name: "グラデーションネイル",
    price: 7000,
    durationMinutes: 120,
    description: "グラデーションを使ったネイル",
    imageUrl: "/images/gradient.jpg",
    isOffIncluded: false,
  },
  {
    id: "5",
    name: "オフのみ",
    price: 3000,
    durationMinutes: 60,
    description: "オフのみのサービス",
    imageUrl: "/images/off_only.jpg",
    isOffIncluded: false,
  },
];

export const NailCoursesMenu = () => {
  return (
    <>
      <div className="mb-3">
        <BackButton fallbackHref="/" />
      </div>
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
    </>
  );
};
