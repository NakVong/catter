import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import profile from "../assets/cat.jpg";
import HeaderBar from "@/components/HeaderBar";
import NavBar from "@/components/NavBar";
import { cats as CATS } from "../data/cats";

/* === CONFIG: 30 seconds until a chat moves to Past === */
const CHAT_EXPIRY_MS = 30 * 1000;
/* === STORAGE KEY bump so you start from 0 (ignores old saved chats) === */
const STORAGE_KEY = "catter_chats_v2";

/* Helpers */
const catsByName = Object.fromEntries(CATS.map((c) => [c.name, c]));
const loadChats = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
};
const saveChats = (chats) => localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));

/* Chat row */
const ChatCard = ({
  catName,
  lastMessage,
  ownerName,
  address,
  onClick,
  selectionMode = false,
  checked = false,
  onCheckToggle = () => {},
}) => {
  const meta = catsByName[catName] || {};
  const img = meta.image || profile;
  const displayOwner = ownerName || "owner's name";
  const displayAddr = address || meta.location || "address";

  return (
    <div
      className="relative border rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 transition cursor-pointer flex justify-between items-center"
      onClick={() => {
        if (selectionMode) onCheckToggle(catName);
        else onClick?.();
      }}
    >
      {selectionMode && (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            onCheckToggle(catName);
          }}
          className="absolute top-2 left-2 w-4 h-4 accent-purple-600"
          aria-label={`Select ${catName}`}
        />
      )}

      <div className={`flex items-start space-x-4 ${selectionMode ? "pl-6" : ""}`}>
        <Avatar className="w-10 h-10 border border-gray-300">
          <AvatarImage src={img} alt={catName} />
        </Avatar>
        <div>
          <p className="font-semibold text-left">{catName}</p>
          <p className="text-sm text-gray-500 ml-[1rem]">{lastMessage || "Say hi!"}</p>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-right">
        <p>{displayOwner}</p>
        <p>{displayAddr}</p>
      </div>
    </div>
  );
};

/* Profile tab */
const ProfileTab = ({ name }) => {
  const c = catsByName[name] || {};
  return (
    <div className="px-4 py-6 space-y-3">
      <div className="flex items-start space-x-4">
        <Avatar className="w-16 h-16 border border-gray-300">
          <AvatarImage src={c.image || profile} alt={c.name || name} />
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
};

const ChatPage = () => {
  // Collapsibles
  const [showActive, setShowActive] = useState(true); // open Active by default
  const [showAll, setShowAll] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false); // we’re not using Favorites

  // Drawer state
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef(null);

  // Selection mode (kept)
  const [selectMode, setSelectMode] = useState(false);
  const [selectedCats, setSelectedCats] = useState({});
  const [successPage, setSuccessPage] = useState(false);

  // Source of truth (starts EMPTY thanks to v2 key)
  const [chats, setChats] = useState(() => loadChats());

  // Persist
  useEffect(() => saveChats(chats), [chats]);

  // Re-evaluate Active vs Past every 1s so 30s feels snappy
  useEffect(() => {
    const t = setInterval(() => setChats((p) => [...p]), 1000);
    return () => clearInterval(t);
  }, []);

  // Listen for swipe-right + external changes
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
      if (e.key === STORAGE_KEY) setChats(loadChats());
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

  // Derive sections:
  // - ACTIVE = chats created or messaged within 30s
  // - PAST   = older than 30s since last user message (or since creation if none)
  const now = Date.now();
  const { activeChats, past } = useMemo(() => {
    const a = [];
    const p = [];
    for (const c of chats) {
      const last = c.lastMessageAt ?? c.createdAt;
      (now - last <= CHAT_EXPIRY_MS ? a : p).push(c);
    }
    return { activeChats: a, past: p };
  }, [chats, now]);

  // current chat
  const current = chats.find((c) => c.name === selectedChat);
  const currentMsgs = current?.messages || [];

  useEffect(() => {
    if (!selectedChat) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat, currentMsgs.length]);

  const openChat = (cat) => {
    if (selectMode || successPage) return;
    setSelectedChat(cat);
    setActiveTab("chat");
    setDraft("");
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !current) return;
    const ts = Date.now();
    setChats((prev) =>
      prev.map((c) =>
        c.id === current.id
          ? { ...c, lastMessageAt: ts, messages: [...c.messages, { from: "me", text, ts }] }
          : c
      )
    );
    setDraft("");
  };

  // Selection UI (kept)
  const toggleCheck = (cat) => setSelectedCats((prev) => ({ ...prev, [cat]: !prev[cat] }));
  const exitSelectMode = () => { setSelectMode(false); setSelectedCats({}); };
  const handleDone = () => { setSuccessPage(true); setSelectMode(false); };
  useEffect(() => {
    if (!successPage) return;
    const t = setTimeout(() => { setSuccessPage(false); setSelectedCats({}); }, 1500);
    return () => clearTimeout(t);
  }, [successPage]);

  // Names list for selection mode (from both sections)
  const allCats = useMemo(
    () => [...activeChats.map((c) => c.name), ...past.map((c) => c.name)],
    [activeChats, past]
  );

  return (
    <>
      <HeaderBar />

      {/* Back button on chat subpage */}
      {selectedChat && !successPage && !selectMode && (
        <div className="px-4 pt-2">
          <button
            onClick={() => setSelectedChat(null)}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            aria-label="Back to Chats"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      )}

      {/* Chat SUBPAGE */}
      {selectedChat && !successPage && !selectMode ? (
        <>
        <div className="flex items-center gap-2 p-4 border-b">
  <button
    onClick={() => setSelectedChat(null)}
    className="flex items-center gap-1 text-black hover:text-gray-700"
  >
    <ArrowLeft size={20} />
    <span>Back</span>
  </button>
  <h2 className="font-semibold">{selectedChat?.name}</h2>
</div>

          <div className="mt-2 text-3xl font-bold text-center">{selectedChat}</div>

          <div className="flex w-full border-b border-gray-300 mt-4">
            <button
              onClick={() => setActiveTab("chat")}
              className={`w-1/2 pb-2 text-center font-medium ${
                activeTab === "chat" ? "text-black border-b-2 border-black" : "text-gray-400 border-b-2 border-transparent"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-1/2 pb-2 text-center font-medium ${
                activeTab === "profile" ? "text-black border-b-2 border-black" : "text-gray-400 border-b-2 border-transparent"
              }`}
            >
              Profile
            </button>
          </div>

          {activeTab === "chat" ? (
            <>
              <div className="px-4 mt-4 pb-36">
                <div className="flex flex-col space-y-2">
                  {currentMsgs.map((m, idx) => (
                    <div
                      key={idx}
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        m.from === "me" ? "self-end bg-purple-600 text-white" : "self-start bg-gray-200 text-gray-900"
                      }`}
                    >
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
              <ProfileTab name={selectedChat} />
            </div>
          )}
        </>
      ) : successPage ? (
        /* Success page (kept) */
        <div className="text-center text-xl mt-20 text-gray-600 pb-24">
          <div className="text-3xl font-semibold mb-3">Success ✅</div>
          <div>Your adoption request has been submitted.</div>
        </div>
      ) : (
        /* LISTS */
        <div className="px-15 mt-9 pb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-5xl font-sami-bold text-left">Chats</h2>
            <button
              onClick={() => (selectMode ? setSelectMode(false) : setSelectMode(true))}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                selectMode ? "bg-gray-700 text-white border-gray-700" : "bg-gray-200 text-gray-800 border-gray-300"
              }`}
            >
              {selectMode ? "Cancel" : "Adopt a Cat"}
            </button>
          </div>

          {selectMode ? (
            <div className="space-y-3">
              {allCats.map((cat) => (
                <ChatCard
                  key={cat}
                  catName={cat}
                  lastMessage="last message"
                  ownerName="owner's name"
                  address="address"
                  selectionMode
                  checked={!!selectedCats[cat]}
                  onCheckToggle={(name) =>
                    setSelectedCats((prev) => ({ ...prev, [name]: !prev[name] }))
                  }
                />
              ))}
              <div className="mt-6 flex justify-center">
                <button onClick={() => { setSuccessPage(true); setSelectMode(false); }} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold">
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Favorites (remove) */}
          {false && (
            <div className="border-b pb-3">
              <div
                className="flex justify-between items-center cursor-pointer pl-10"
                onClick={() => setShowFavorites(!setShowFavorites)}
              >
                <p className="text-lg font-regular text-left">Favorites (0)</p>
                {showFavorites ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
              </div>
              {showFavorites && <div className="mt-3 ml-20 text-gray-500">No favorites.</div>}
            </div>
          )}


              {/* Active chats (NEW: fresh chats live here) */}
              <div className="border-b pb-3">
                <div
                  className="flex justify-between items-center cursor-pointer pl-10"
                  onClick={() => setShowActive(!showActive)}
                >
                  <p className="text-lg font-regular text-left">Active chats ({activeChats.length})</p>
                  {showActive ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
                </div>
                {showActive && (
                  <div className="mt-3 space-y-3 ml-20">
                    {activeChats.map((c) => (
                      <ChatCard
                        key={c.id}
                        catName={c.name}
                        lastMessage={c.messages.at(-1)?.text}
                        ownerName="owner's name"
                        address={catsByName[c.name]?.location}
                        onClick={() => openChat(c.name)}
                      />
                    ))}
                    {activeChats.length === 0 && (
                      <div className="text-sm text-gray-500 ml-2">No active chats yet.</div>
                    )}
                  </div>
                )}
              </div>

              {/* Past chats */}
              <div className="border-b pb-3">
                <div
                  className="flex justify-between items-center cursor-pointer pl-10"
                  onClick={() => setShowAll(!showAll)}
                >
                  <p className="text-lg font-regular text-left">Past chats ({past.length})</p>
                  {showAll ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
                </div>
                {showAll && (
                  <div className="mt-3 space-y-3 ml-20">
                    {past.map((c) => (
                      <ChatCard
                        key={c.id}
                        catName={c.name}
                        lastMessage={c.messages.at(-1)?.text}
                        ownerName="owner's name"
                        address={catsByName[c.name]?.location}
                        onClick={() => openChat(c.name)}
                      />
                    ))}
                    {past.length === 0 && (
                      <div className="text-sm text-gray-500 ml-2">No past chats.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <NavBar />
    </>
  );
};

export default ChatPage;