import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookText, House, MessageSquare, User, ChevronDown, ChevronUp } from "lucide-react";
import paw from "../assets/catter-logo.png";
import { cats as CATS } from "../data/cats";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import profile from "../assets/cat.jpg";
import HeaderBar from "@/components/HeaderBar";
import NavBar from "@/components/NavBar";


const FIVE_MIN = 5 * 60 * 1000;
const catsByName = Object.fromEntries(CATS.map((c) => [c.name, c]));
const loadChats = () => {
  try { return JSON.parse(localStorage.getItem("catter_chats_v1") || "[]"); }
  catch { return []; }
};
const saveChats = (chats) => localStorage.setItem("catter_chats_v1", JSON.stringify(chats));

const ChatCard = ({ cat, lastMessagePreview = "", onClick }) => {
  const meta = catsByName[cat.name] || {};
  const ownerName = "owner's name";
  const address = meta.location || "address";
  const img = meta.image;

  return (
    <div className="relative border rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 transition cursor-pointer flex justify-between items-center"
         onClick={onClick}>
      <div className="flex items-start space-x-4">
        <Avatar className="w-10 h-10 border border-gray-300">
          <AvatarImage src={img} alt={cat.name} />
        </Avatar>
        <div>
          <p className="font-semibold text-left">{cat.name}</p>
          <p className="text-sm text-gray-500 ml-[1rem]">{lastMessagePreview || "Say hi!"}</p>
        </div>
      </div>
      <div className="text-sm text-gray-500 text-right">
        <p>{ownerName}</p>
        <p>{address}</p>
      </div>
    </div>
  );
};

function ProfileTab({ name }) {
  const c = catsByName[name] || {};
  return (
    <div className="px-4 py-6 space-y-3">
      <div className="flex items-start space-x-4">
        <Avatar className="w-16 h-16 border border-gray-300">
          <AvatarImage src={c.image} alt={c.name || name} />
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{c.name || name}</h3>
          <p className="text-gray-600">{c.shortDescription}</p>
          <p className="text-gray-500">{c.location}</p>
        </div>
      </div>
      <div className="text-gray-800">
        <div className="font-medium mb-1">About</div>
        <p className="text-sm">{c.about || "No description provided."}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="border rounded-lg p-3"><div className="text-gray-500">Breed</div><div className="font-medium">{c.breed || "—"}</div></div>
        <div className="border rounded-lg p-3"><div className="text-gray-500">Age</div><div className="font-medium">{c.age != null ? `${c.age} yrs` : "—"}</div></div>
        <div className="border rounded-lg p-3"><div className="text-gray-500">Color</div><div className="font-medium">{c.color || "—"}</div></div>
        <div className="border rounded-lg p-3"><div className="text-gray-500">Weight</div><div className="font-medium">{c.weight || "—"}</div></div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [chats, setChats] = useState(() => loadChats());
  const [selectedName, setSelectedName] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [draft, setDraft] = useState("");
  const [openFav, setOpenFav] = useState(true);
  const [openPast, setOpenPast] = useState(true);
  const messagesEndRef = useRef(null);

  // Persist chats
  useEffect(() => saveChats(chats), [chats]);

  // Re-evaluate sections every 30s
  useEffect(() => {
    const t = setInterval(() => setChats((p) => [...p]), 30_000);
    return () => clearInterval(t);
  }, []);

  // Listen for swipes and external storage updates
  useEffect(() => {
    const onSwipeRight = (e) => {
      const name = e.detail?.name;
      if (!name) return;
      setChats((prev) => {
        if (prev.some((c) => c.name === name)) return prev;
        const next = [{ id: crypto.randomUUID(), name, createdAt: Date.now(), lastMessageAt: null, messages: [] }, ...prev];
        saveChats(next);
        return next;
      });
    };
    const onStorage = (e) => {
      if (e.key === "catter_chats_v1") setChats(loadChats());
    };
    const onLocalEvent = () => setChats(loadChats());

    window.addEventListener("catter:swipeRight", onSwipeRight);
    window.addEventListener("storage", onStorage);
    window.addEventListener("catter:chatsChanged", onLocalEvent);
    return () => {
      window.removeEventListener("catter:swipeRight", onSwipeRight);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("catter:chatsChanged", onLocalEvent);
    };
  }, []);

  const now = Date.now();
  const { favorites, past } = useMemo(() => {
    const fav = [], pst = [];
    for (const c of chats) {
      const last = c.lastMessageAt;
      const inFavorites = last ? now - last <= FIVE_MIN : now - c.createdAt <= FIVE_MIN;
      (inFavorites ? fav : pst).push(c);
    }
    return { favorites: fav, past: pst };
  }, [chats, now]);

  const totalCount = chats.length;
  const current = chats.find((c) => c.name === selectedName);
  const currentMsgs = current?.messages || [];

  useEffect(() => {
    if (!selectedName) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedName, currentMsgs.length]);

  const openChat = (name) => {
    setSelectedName(name);
    setActiveTab("chat");
    setDraft("");
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !current) return;
    const ts = Date.now();
    setChats((prev) =>
      prev.map((c) =>
        c.id === current.id ? { ...c, lastMessageAt: ts, messages: [...c.messages, { from: "me", text, ts }] } : c
      )
    );
    setDraft("");
  };

  return (
    <>      {/* Header (profile button restored) */}
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center space-x-2">
          <img src={paw} alt="paw" className="h-20 w-auto mt-2 -ml-6" />
        </div>
        <Link to="/profile">
          <Avatar className="w-14 h-14 border border-gray-300">
            <AvatarImage src={profile} alt="me" />
          </Avatar>
        </Link>
      </div>


      {selectedName ? (
        <>
          <div className="mt-2 w-full text-left px-4">
            <button onClick={() => setSelectedName(null)} className="text-xl font-medium">← Back</button>
          </div>
          <div className="mt-4 ml-0 text-3xl font-bold pl-4">{selectedName}</div>

          <div className="flex w-full border-b border-gray-300 mt-4">
            <button onClick={() => setActiveTab("chat")}
              className={`w-1/2 pb-2 text-center font-medium ${activeTab === "chat" ? "text-black border-b-2 border-black" : "text-gray-400"}`}>
              Chat
            </button>
            <button onClick={() => setActiveTab("profile")}
              className={`w-1/2 pb-2 text-center font-medium ${activeTab === "profile" ? "text-black border-b-2 border-black" : "text-gray-400"}`}>
              Profile
            </button>
          </div>

          {activeTab === "chat" ? (
            <>
              <div className="px-4 mt-4 pb-36">
                <div className="flex flex-col space-y-2">
                  {currentMsgs.map((m, idx) => (
                    <div key={idx}
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${m.from === "me" ? "self-end bg-purple-600 text-white" : "self-start bg-gray-200 text-gray-900"}`}>
                      {m.text}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="fixed bottom-16 left-0 w-full bg-white border-t px-3 py-3">
                <div className="flex items-center gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 border rounded-full px-4 py-2 outline-none"
                    placeholder="Type a message"
                  />
                  <button onClick={sendMessage} className="px-4 py-2 rounded-full bg-purple-600 text-white font-medium">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="pb-24">
              <ProfileTab name={selectedName} />
            </div>
          )}
        </>
      ) : (
        <div className="px-6 mt-2 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-semibold text-left">Chats</h2>
          </div>

          <div className="border-b pb-3">
            <div className="flex justify-between items-center cursor-pointer pl-4" onClick={() => setOpenFav((v) => !v)}>
              <p className="text-lg text-left">Favorites ({favorites.length})</p>
              {openFav ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
            </div>
            {openFav && (
              <div className="mt-3 space-y-3 ml-10">
                {favorites.map((c) => (
                  <ChatCard key={c.id} cat={c} lastMessagePreview={c.messages.at(-1)?.text} onClick={() => openChat(c.name)} />
                ))}
              </div>
            )}
          </div>

          <div className="border-b pb-3 mt-4">
            <div className="flex justify-between items-center cursor-pointer pl-4" onClick={() => setOpenPast((v) => !v)}>
              <p className="text-lg text-left">Past chats ({past.length})</p>
              {openPast ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
            </div>
            {openPast && (
              <div className="mt-3 space-y-3 ml-10">
                {past.map((c) => (
                  <ChatCard key={c.id} cat={c} lastMessagePreview={c.messages.at(-1)?.text} onClick={() => openChat(c.name)} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Nav (no Profile tab, Chat badge fixed at 4) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-16">
        <Link to="/main" className="text-gray-400 flex flex-col items-center text-xs">
          <House />
          Home
        </Link>
        <Link to="/guide" className="text-gray-400 flex flex-col items-center text-xs">
          <BookText />
          Guides
        </Link>
        <Link to="/chat" className="text-purple-500 relative flex flex-col items-center text-xs">
          <MessageSquare />
          Chat
          <span className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full px-1">
            4
          </span>
        </Link>
      </div>


    </>
  );
}
