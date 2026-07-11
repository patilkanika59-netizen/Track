// Supabase Edge Function: ai-assistant
// Proxies chat messages to the Anthropic API so the API key never
// reaches the browser. Deploy with:
//   supabase functions deploy ai-assistant
// and set the secret with:
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...

import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const SYSTEM_PROMPT = `You are the Rhythm health-routine assistant. You help users build
healthier daily habits: sleep, hydration, movement, nutrition, and stress management.
Give practical, general wellness guidance in a warm, concise tone. You are not a doctor:
for symptoms, diagnoses, medications, or anything urgent, tell the user to consult a
qualified healthcare professional instead of giving specific medical advice.`

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  }

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY")
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY secret is not set")

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
      }),
    })

    const data = await anthropicRes.json()
    const reply = data?.content?.[0]?.text ?? "Sorry, I couldn't generate a reply just now."

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "content-type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    })
  }
})
