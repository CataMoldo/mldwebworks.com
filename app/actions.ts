'use server'
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function markAsResolved(id: number, email: string, note: string) {
  // 1. Actualizăm baza de date
  await supabase.from('contacts').update({ 
    is_resolved: true, 
    resolution_note: note 
  }).eq('id', id);

  // 2. Trimitem emailul
  await resend.emails.send({
    from: 'contact@mldwebworks.com',
    to: email,
    subject: 'Proiectul tău a fost actualizat',
    html: `<p>Salut! Mesajul tău a fost procesat. Notă: ${note}</p>`
  });
}