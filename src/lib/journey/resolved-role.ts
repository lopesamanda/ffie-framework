/** Display role from draft fields (chip selection or custom text). */
export function resolvedCharacterRole(
  role: string,
  roleCustom?: string,
): string {
  const custom = roleCustom?.trim();
  if (custom) return custom;
  const selected = role.trim();
  if (selected) return selected;
  return "someone in this ecosystem";
}
