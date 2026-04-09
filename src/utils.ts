export function prettifyRole(role: string): string {
  switch (role) {
    case "moderator":
      return "Moderator";
    case "user":
      return "Bruker";
    default:
      throw new Error(`Invalid role: ${role}`);
  }
}

export function prettifyChannelMode(mode: string): string {
  switch (mode) {
    case "upcoming":
      return "Kommer";
    case "in-progress":
      return "Direkte nå!";
    case "closed":
      return "Avsluttet";
    default:
      throw new Error(`Invalid mode: ${mode}`);
  }
}