export type NailCourse = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
  imageUrl?: string;
  isOffIncluded: boolean;
};

export const courses: NailCourse[] = [
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

export const findCourseById = (id: string): NailCourse | undefined =>
  courses.find((c) => c.id === id);
