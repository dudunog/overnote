import NotesList from "@/components/notes-list";
import { StickyNote } from "lucide-react";

const notes = [
  {
    id: "1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos!",
    color: "#FFAB91",
    updatedAt: new Date(),
  },
  {
    id: "1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos!",
    color: "#FFCC80",
    updatedAt: new Date(),
  },
  {
    id: "1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos!",
    color: "#E7ED9C",
    updatedAt: new Date(),
  },
  {
    id: "1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos!",
    color: "#82DEEA",
    updatedAt: new Date(),
  },
  {
    id: "1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque quibusdam nisi eaque ea iste accusamus dolores vel, tenetur debitis doloribus porro cum impedit odit eos nihil. Deserunt, corrupti dignissimos!",
    color: "#CF94DA",
    updatedAt: new Date(),
  },
];

export default function Page() {
  return (
    <div className="px-6 py-2">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-3xl font-bold">My notes</h2>
        <StickyNote size={30} />
      </div>

      <NotesList notes={notes} />
    </div>
  );
}
