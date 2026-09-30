import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { transactions } from "../../../db/schema";

const fail = (error: unknown) => Response.json({ error: error instanceof Error ? error.message : "Erro inesperado" }, { status: 500 });

export async function GET() {
  try { return Response.json({ transactions: await getDb().select().from(transactions).orderBy(desc(transactions.startDate), desc(transactions.id)) }); }
  catch (error) { return fail(error); }
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as Record<string, unknown>;
    const description = String(data.description ?? "").trim();
    const amountCents = Number(data.amountCents);
    if (!description || !Number.isInteger(amountCents) || amountCents <= 0) return Response.json({ error: "Preencha descrição e valor." }, { status: 400 });
    const [transaction] = await getDb().insert(transactions).values({
      description, category: String(data.category ?? "Outros"), account: String(data.account ?? "Conta 1"),
      type: data.type === "income" ? "income" : "expense",
      recurrence: data.recurrence === "monthly" ? "monthly" : data.recurrence === "installment" ? "installment" : "one_time",
      amountCents, startDate: String(data.startDate ?? new Date().toISOString().slice(0, 10)),
      installmentCount: Math.max(1, Number(data.installmentCount) || 1), createdAt: new Date().toISOString(),
    }).returning();
    return Response.json({ transaction }, { status: 201 });
  } catch (error) { return fail(error); }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json() as Record<string, unknown>;
    const [transaction] = await getDb().update(transactions).set({
      description: String(data.description ?? "").trim(), category: String(data.category ?? "Outros"), account: String(data.account ?? "Conta 1"),
      type: data.type === "income" ? "income" : "expense",
      recurrence: data.recurrence === "monthly" ? "monthly" : data.recurrence === "installment" ? "installment" : "one_time",
      amountCents: Number(data.amountCents), startDate: String(data.startDate), installmentCount: Math.max(1, Number(data.installmentCount) || 1),
    }).where(eq(transactions.id, Number(data.id))).returning();
    return Response.json({ transaction });
  } catch (error) { return fail(error); }
}

export async function DELETE(request: Request) {
  try { await getDb().delete(transactions).where(eq(transactions.id, Number(new URL(request.url).searchParams.get("id")))); return Response.json({ ok: true }); }
  catch (error) { return fail(error); }
}
