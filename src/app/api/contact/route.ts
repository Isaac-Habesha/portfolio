import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  company: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: 'Invalid form submission.' }, { status: 400 });
    }

    if (parsed.data.company) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true, message: 'Message received.' });
  } catch {
    return NextResponse.json({ ok: false, message: 'Server error.' }, { status: 500 });
  }
}
