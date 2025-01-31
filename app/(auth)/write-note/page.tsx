import Tiptap from "@/components/tip-tap";
import { RiLightbulbLine } from "@remixicon/react";

export default function Page() {
  return (
    <div className="px-6 py-2">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-3xl font-bold">Escreva suas ideias</h2>
        <RiLightbulbLine size={30} />
      </div>
      <Tiptap />
    </div>
  );
}
