import Link from "next/link";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { courses } from "@/lib/courses";

export const NailCourseMenu = () => {
  return (
    <>
      <div className="flex flex-col gap-8 p-4 mx-auto">
        <Typography size="lg" align="center">
          MENU
        </Typography>
        <Typography size="sm" variant="muted" align="left">
          タップしてメニューを選択
        </Typography>
        {courses.map((course) => (
          <Link href={`/calendar?courseId=${course.id}`} key={course.id}>
            <div className="flex items-center gap-4 transition-transform duration-150">
              {/* 左側 */}
              <div className="w-16 h-15 rounded-2xl neu-surface overflow-hidden flex-shrink-0 border-white/30">
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300" />
              </div>
              {/* 右側 */}
              <div className="flex-1 h-15 py-3 neu-surface rounded-2xl px-2 flex items-center ">
                <div className="flex flex-col justify-cneter min-w-0 pr-2">
                  <Typography weight="bold" size="sm" className="py-2">
                    {course.name}
                  </Typography>
                  <Typography as="p" size="sm" variant="muted">
                    {course.description}
                  </Typography>
                </div>
                <div className=" px-3 py-2 rounded-xl min-w-[70px] flex items-center justify-center">
                  <Typography size="sm">
                    ¥{course.price.toLocaleString()}/{course.durationMinutes}分
                  </Typography>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <Button isBack size="sm" fallbackHref="/">
          戻る
        </Button>
      </div>
    </>
  );
};
