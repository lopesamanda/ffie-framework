import { RegisterDeckCardFace } from "@/components/register/RegisterDeckCardFace";
import { REGISTER_DECK } from "@/lib/register-deck-data";

/** Create orientation — all five registers fanned open with inline descriptions. */
export function RegisterDeckExpandedRow() {
  return (
    <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 pt-1 sm:justify-between sm:gap-4">
      {REGISTER_DECK.map((entry) => (
        <RegisterDeckCardFace key={entry.category} entry={entry} variant="expanded" />
      ))}
    </div>
  );
}
