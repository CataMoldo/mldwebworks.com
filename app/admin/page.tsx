"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [note, setNote] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const fetchMessages = async () => {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  useEffect(() => { if (isAuthenticated) fetchMessages(); }, [isAuthenticated]);

  const deleteMessage = async (id: number) => {
    await supabase.from('contacts').delete().eq('id', id);
    fetchMessages();
  };

  const handleResolve = async (msg: any) => {
    await supabase.from('contacts').update({ 
      is_resolved: true, 
      resolution_note: note 
    }).eq('id', msg.id);

    if (sendEmail) {
      console.log("Email trimis către:", msg.email, "cu nota:", note);
    }
    setNote("");
    fetchMessages();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <input type="password" placeholder="Parola" className="px-4 py-2 border rounded text-black" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={() => password === "parola123" ? setIsAuthenticated(true) : alert("Parolă greșită!")}>Intră</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Mesaje Noi</TabsTrigger>
          <TabsTrigger value="resolved">Rezolvate</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {messages.filter(m => !m.is_resolved).map(msg => (
            <div key={msg.id} className="p-4 border my-2 flex justify-between items-center rounded-lg bg-muted/20">
              <div>
                <p className="font-bold">{msg.name}</p>
                {/* Afișare Email */}
                <p className="text-xs text-blue-600 font-medium mb-1">{msg.email}</p>
                <p className="text-sm">{msg.message}</p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild><Button variant="outline"><CheckCircle2 /></Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Finalizează tichetul</DialogTitle></DialogHeader>
                    <Textarea placeholder="Note rezolvare..." onChange={(e) => setNote(e.target.value)} />
                    <div className="flex items-center gap-2">
                      <Checkbox id="email" onCheckedChange={(c) => setSendEmail(c as boolean)} />
                      <label htmlFor="email">Trimite email clientului ({msg.email})</label>
                    </div>
                    <Button onClick={() => handleResolve(msg)}>Confirmă Rezolvarea</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteMessage(msg.id)}><Trash2 /></Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="resolved">
          {messages.filter(m => m.is_resolved).map(msg => (
            <div key={msg.id} className="p-4 border my-2 flex justify-between items-center rounded-lg bg-green-500/10">
              <div>
                <p className="font-bold">{msg.name} (Rezolvat)</p>
                {/* Afișare Email */}
                <p className="text-xs text-blue-600 font-medium mb-1">{msg.email}</p>
                <p className="text-sm italic">{msg.resolution_note || "Fără notă"}</p>
              </div>
              <Button variant="destructive" onClick={() => deleteMessage(msg.id)}><Trash2 /></Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}