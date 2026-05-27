'use server'
import { supabase } from '@/lib/supabase';

export async function markAsResolved(id: number, email: string, note: string) {
  // 1. Actualizăm baza de date
  await supabase.from('contacts').update({ 
    is_resolved: true, 
    resolution_note: note 
  }).eq('id', id);

  // Funcționalitatea de trimitere email a fost eliminată
}