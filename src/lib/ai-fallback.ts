/** Mock Kiphnic AI replies — used when ANTHROPIC_API_KEY is not configured,
 *  as a graceful fallback if the model call fails, and by the legacy /api/ai route.
 */
export function mockReply(text: string): string {
  const lower = text.toLowerCase();
  const gamey =
    lower.includes("platformer") ||
    lower.includes("adventure") ||
    lower.includes("rpg") ||
    lower.includes("puzzle") ||
    lower.includes("game");

  if (gamey)
    return `Love it — "${text}" is a great starting point. Tell me: 2D or 3D, single-player or multiplayer, and the one core mechanic that makes it fun? I'll turn that into a concept doc, a tech stack (Unity, Godot or web), and a build roadmap with you.`;

  if (
    lower.includes("chatbot") ||
    lower.includes("code") ||
    lower.includes("build") ||
    lower.includes("app") ||
    lower.includes("website")
  )
    return "Let's build it. Share the goal, users, and must-have features — I'll break it into steps, suggest a stack, and draft the first code with you.";

  if (lower.includes("price") || lower.includes("cost") || lower.includes("contact"))
    return "You can reach Kiphnic at kiphnic7@gmail.com or 0538616119 / 0200823079. Share your brief and we'll scope time and cost.";

  if (lower.includes("who") && lower.includes("kiphnic"))
    return "Kiphnic is an AI-first technology company — AI, software, web, mobile, games and digital solutions. Intelligence. Elevated.";

  if (lower.length < 30)
    return `Interesting — "${text}". Expand that a little and I'll turn it into ideas, a plan, and next actions.`;

  return "Great — tell me more about what you want to build, and I'll help you scope it, design it, and plan the tech.";
}

/** Stream text in word-sized chunks so the UI can animate it like a live model. */
export function mockStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  return new ReadableStream({
    async start(controller) {
      for (const w of words) {
        controller.enqueue(encoder.encode(w));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });
}
