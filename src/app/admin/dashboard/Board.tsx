"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import ChangePassword from "@/components/ChangePassword";

type CategoryEvent = "BEHIND_SCENES" | "TOURNAMENTS" | "LEAGUES";
type VolunteerRole = "REFEREE" | "PHOTOGRAPHER" | "LOGISTICS" | "FIRST_AID" | "TECH_SUPPORT";

type Volunteer = {
  id: string;
  fullname: string;
  email: string;
  role: VolunteerRole;
  reason?: string;
  createdAt: string;
};

type Partner = {
  id: string;
  fullname: string;
  email: string;
  createdAt: string;
};

type Event = {
  id: string;
  event: string;
  location: string;
  date: string;
  category: CategoryEvent;
  img: string;
  title: string;
  createdAt: string;
};

type ActiveTab = "events" | "volunteers" | "partners";

type NewEventData = Partial<Omit<Event, "id" | "createdAt">>;
type NewVolunteerData = Partial<Omit<Volunteer, "id" | "createdAt">>;
type NewPartnerData = Partial<Omit<Partner, "id" | "createdAt">>;

export default function AdminDashboard() {
  const [showChangePassword, setShowPassword] = useState(false)
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("events");
  const [events, setEvents] = useState<Event[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newData, setNewData] = useState<NewEventData | NewVolunteerData | NewPartnerData>({});
  const [isloggedIn,setIsLoggedIn] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, volunteersRes, partnersRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/volunteers"),
          fetch("/api/partners"),
        ]);

        const [eventsData, volunteersData, partnersData] = await Promise.all([
          eventsRes.json(),
          volunteersRes.json(),
          partnersRes.json(),
        ]);

        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setVolunteers(Array.isArray(volunteersData) ? volunteersData : []);
        setPartners(Array.isArray(partnersData) ? partnersData : []);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
   
  const handleLogOut = async () => {
    const res = await fetch('/api/admin/logout',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })
    if (res.ok) {
      setIsLoggedIn(false)
      window.location.href='/admin/auth'
    } else {
      console.log("Log out failed")
    }

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setNewData((prev) => ({ ...prev, [key]: value }));
  };

  const openEdit = (item: Event | Volunteer | Partner) => {
    setEditId(item.id);
    setNewData(item);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/${activeTab}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      if (activeTab === "events") setEvents(events.filter((e) => e.id !== id));
      if (activeTab === "volunteers") setVolunteers(volunteers.filter((v) => v.id !== id));
      if (activeTab === "partners") setPartners(partners.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/${activeTab}/${editId}` : `/api/${activeTab}`;

      const formData = new FormData();
      if (file) formData.append("img", file);
      Object.entries(newData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "img") {
          formData.append(key, String(value));
        }
      });

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      // Update state based on tab
      if (!editId) {
        if (activeTab === "events") setEvents((prev) => [data, ...prev]);
        if (activeTab === "volunteers") setVolunteers((prev) => [data, ...prev]);
        if (activeTab === "partners") setPartners((prev) => [data, ...prev]);
      } else {
        if (activeTab === "events") setEvents((prev) => prev.map((item) => (item.id === editId ? data : item)));
        if (activeTab === "volunteers") setVolunteers((prev) => prev.map((item) => (item.id === editId ? data : item)));
        if (activeTab === "partners") setPartners((prev) => prev.map((item) => (item.id === editId ? data : item)));
      }

      // Clear form and close dialog
      setNewData({});
      setFile(null);
      setEditId(null);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  const renderItemActions = (item: Event | Volunteer | Partner) => (
    <div className="flex gap-2 mt-2">
      <Button size="sm" onClick={() => openEdit(item)}>Edit</Button>
      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
        <div>
          <Button variant="secondary" onClick={handleLogOut}>Logout</Button>
          <Button
            onClick={() => {
              setShowPassword(prev=>!prev)
            }}
          
          >Settings</Button>
          {showChangePassword&&<ChangePassword/>}

        </div>
      </div>
      {isloggedIn &&
        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as ActiveTab)}
          className="max-w-6xl mx-auto">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
          </TabsList>

          {/* EVENTS */}
          <TabsContent value="events">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Events</h2>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>{editId ? "Edit Event" : "Add Event"}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editId ? "Edit Event" : "Add Event"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                      name="event"
                      placeholder="Event name"
                      value={(newData as NewEventData).event || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="location"
                      placeholder="Location"
                      value={(newData as NewEventData).location || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="date"
                      type="date"
                      value={(newData as NewEventData).date?.split("T")[0] || ""}
                      onChange={handleInputChange}
                    />
                    <Select
                      value={(newData as NewEventData).category || ""}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEHIND_SCENES">Behind the scenes</SelectItem>
                        <SelectItem value="TOURNAMENTS">Tournaments</SelectItem>
                        <SelectItem value="LEAGUES">Leagues</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      name="img"
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      ref={fileInputRef}
                    />

                    <Input
                      name="title"
                      placeholder="Title"
                      value={(newData as NewEventData).title || ""}
                      onChange={handleInputChange}
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((e: Event) => (
                <div key={e.id} className="p-4 bg-white rounded shadow">
                  {e.img ? (
                    <Image
                      src={e.img}
                      width={100}
                      height={100}
                      alt={e.title}
                      className="rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <h3 className="font-semibold">{e.title}</h3>
                  <p>{e.location}</p>
                  <p className="text-sm text-gray-500">{new Date(e.date).toLocaleDateString()}</p>
                  {renderItemActions(e)}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* VOLUNTEERS */}
          <TabsContent value="volunteers">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Volunteers</h2>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>{editId ? "Edit Volunteer" : "Add Volunteer"}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editId ? "Edit Volunteer" : "Add Volunteer"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                      name="fullname"
                      placeholder="Full name"
                      value={(newData as NewVolunteerData).fullname || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="email"
                      placeholder="Email"
                      value={(newData as NewVolunteerData).email || ""}
                      onChange={handleInputChange}
                    />
                    <Label>Role</Label>
                    <Select
                      value={(newData as NewVolunteerData).role || ""}
                      onValueChange={(value) => handleSelectChange("role", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="REFEREE">Referee</SelectItem>
                        <SelectItem value="PHOTOGRAPHER">Photographer</SelectItem>
                        <SelectItem value="LOGISTICS">Logistics</SelectItem>
                        <SelectItem value="FIRST_AID">First Aid</SelectItem>
                        <SelectItem value="TECH_SUPPORT">Tech Support</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      name="reason"
                      placeholder="Reason (optional)"
                      value={(newData as NewVolunteerData).reason || ""}
                      onChange={handleInputChange}
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {volunteers.map((v) => (
                <div key={v.id} className="p-4 bg-white rounded shadow">
                  <h3 className="font-semibold">{v.fullname}</h3>
                  <p>{v.email}</p>
                  <p className="text-sm text-gray-500">{v.role}</p>
                  {renderItemActions(v)}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* PARTNERS */}
          <TabsContent value="partners">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Partners</h2>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>{editId ? "Edit Partner" : "Add Partner"}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editId ? "Edit Partner" : "Add Partner"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                      name="fullname"
                      placeholder="Full name"
                      value={(newData as NewPartnerData).fullname || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="email"
                      placeholder="Email"
                      value={(newData as NewPartnerData).email || ""}
                      onChange={handleInputChange}
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((p) => (
                <div key={p.id} className="p-4 bg-white rounded shadow">
                  <h3 className="font-semibold">{p.fullname}</h3>
                  <p>{p.email}</p>
                  {renderItemActions(p)}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>}
      
    </div>
  );
}




