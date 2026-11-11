import { NextResponse } from "next/server";
import { saveReservation, validate } from "@/lib/reservations";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Requête invalide."] },
      { status: 400 }
    );
  }

  const result = validate(body);
  if (!result.ok || !result.value) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 422 }
    );
  }

  try {
    const reservation = await saveReservation(result.value);
    // Ici tu pourrais aussi envoyer un e-mail de confirmation
    // (Resend, Nodemailer…) ou une notification WhatsApp.
    return NextResponse.json(
      { ok: true, reservation: { id: reservation.id } },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erreur réservation:", err);
    return NextResponse.json(
      { ok: false, errors: ["Une erreur est survenue. Réessayez."] },
      { status: 500 }
    );
  }
}
