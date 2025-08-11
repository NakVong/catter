import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  BookText,
  House,
  MessageSquare,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import profile from "../assets/cat.jpg";
import HeaderBar from "@/components/HeaderBar";
import NavBar from "@/components/NavBar";

/* ───────────────── Chat Card ───────────────── */
const ChatCard = ({
  catName,
  lastMessage,
  ownerName,
  address,
  onClick,
  selectionMode = false,
  checked = false,
  onCheckToggle = () => {},
}) => (
  <div
    className={`relative border rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 transition cursor-pointer flex justify-between items-center`}
    onClick={() => {
      if (selectionMode) onCheckToggle(catName);
      else onClick?.();
    }}
  >
    {/* Checkbox (selection mode) */}
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

    {/* Left side: Avatar + name/message */}
    <div className={`flex items-start space-x-4 ${selectionMode ? "pl-6" : ""}`}>
      <Avatar className="w-10 h-10 border border-gray-300">
        <AvatarImage src={profile} alt={catName} />
      </Avatar>
      <div>
        <p className="font-semibold text-left">{catName}</p>
        <p className="text-sm text-gray-500 ml-[1rem]">{lastMessage}</p>
      </div>
    </div>

    {/* Right side: Owner info */}
    <div className="text-sm text-gray-500 text-right">
      <p>{ownerName}</p>
      <p>{address}</p>
    </div>
  </div>
);

/* ───────────────── Page ───────────────── */
const ChatPage = () => {
  const [showActive, setShowActive] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const [selectedChat, setSelectedChat] = useState(null);   // chat subpage (tabs)
  const [activeTab, setActiveTab] = useState("chat");       // "chat" | "profile"

  // Multi-adopt selection mode + selected set + success subpage
  const [selectMode, setSelectMode] = useState(false);
  const [selectedCats, setSelectedCats] = useState({});
  const [successPage, setSuccessPage] = useState(false);

  // Simple chat messages state per cat
  // { Luna: [{from:'them'|'me', text:'...'}], ... }
  const [messagesByCat, setMessagesByCat] = useState({
    Luna: [
      { from: "them", text: "Hi!" },
      { from: "them", text: "Is the cat still available?" },
    ],
    Milo: [{ from: "them", text: "Thanks again!" }],
    Simba: [{ from: "them", text: "Talk soon 🐾" }],
    Whiskers: [],
    Nala: [],
    Tiger: [],
  });

  // Input state for the chat subpage
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef(null);

  const favorites = useMemo(() => ["Luna", "Milo", "Simba"], []);
  const active = useMemo(() => ["Whiskers", "Nala"], []);
  const past = useMemo(() => ["Tiger"], []);
  const allCats = useMemo(() => [...favorites, ...active, ...past], [favorites, active, past]);

  // Scroll to bottom when messages change in the open chat
  useEffect(() => {
    if (!selectedChat) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat, messagesByCat[selectedChat]?.length]);

  // Chat actions
  const openChat = (cat) => {
    if (selectMode || successPage) return;
    setSelectedChat(cat);
    setActiveTab("chat");
    setDraft("");
  };
  const backFromChat = () => setSelectedChat(null);

  const sendMessage = () => {
    const text = draft.trim();
    if (!selectedChat || !text) return;
    setMessagesByCat((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), { from: "me", text }],
    }));
    setDraft("");
  };

  // Selection mode helpers
  const toggleCheck = (cat) =>
    setSelectedCats((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const exitSelectMode = () => {
    setSelectMode(false);
    setSelectedCats({});
  };

  const handleDone = () => {
    setSuccessPage(true);
    setSelectMode(false);
  };

  useEffect(() => {
    if (!successPage) return;
    const t = setTimeout(() => {
      setSuccessPage(false);
      setSelectedCats({});
      // back to main list
    }, 1500);
    return () => clearTimeout(t);
  }, [successPage]);

  return (
    <>
      {/* Shared Header */}
      <HeaderBar/>

      {/* Back button for any subpage / selection mode */}
      {(selectedChat || selectMode || successPage) && (
        <div className="mt-2 w-full text-left px-4">
          <button
            onClick={() => {
              if (selectedChat) setSelectedChat(null);
              else if (successPage) setSuccessPage(false);
              else if (selectMode) exitSelectMode();
            }}
            className="text-xl font-medium"
          >
            ← Back
          </button>
        </div>
      )}

      {/* ───────────── CHAT SUBPAGE ───────────── */}
      {selectedChat && !successPage && !selectMode && (
        <>
          {/* Cat name under back button */}
          <div className="mt-4 ml-0 text-3xl font-bold pl-4">{selectedChat}</div>

          {/* Tabs: 50/50 */}
          <div className="flex w-full border-b border-gray-300 mt-4">
            <button
              onClick={() => setActiveTab("chat")}
              className={`w-1/2 pb-2 text-center font-medium ${
                activeTab === "chat"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 border-b-2 border-transparent"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-1/2 pb-2 text-center font-medium ${
                activeTab === "profile"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 border-b-2 border-transparent"
              }`}
            >
              Profile
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "chat" ? (
            <>
              {/* Messages area */}
              <div className="px-4 mt-4 pb-36">
                <div className="flex flex-col space-y-2">
                  {(messagesByCat[selectedChat] || []).map((m, idx) => (
                    <div
                      key={idx}
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        m.from === "me"
                          ? "self-end bg-purple-600 text-white"
                          : "self-start bg-gray-200 text-gray-900"
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input bar (fixed above bottom nav) */}
              <div className="fixed bottom-16 left-0 w-full bg-white border-t px-3 py-3">
                <div className="flex items-center gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                    className="flex-1 border rounded-full px-4 py-2 outline-none"
                    placeholder="Type a message"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 rounded-full bg-purple-600 text-white font-medium"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-xl mt-20 text-gray-600 pb-24">
              Profile
            </div>
          )}
        </>
      )}

      {/* ───────────── SUCCESS SUBPAGE ───────────── */}
      {successPage && (
        <div className="text-center text-xl mt-20 text-gray-600 pb-24">
          <div className="text-3xl font-semibold mb-3">Success ✅</div>
          <div>Your adoption request has been submitted.</div>
        </div>
      )}

      {/* ───────────── CHAT LIST + ADOPT SELECTION MODE ───────────── */}
      {!selectedChat && !successPage && (
        <div className="px-15 mt-9 pb-24">
          {/* Top row: title + adopt button */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-5xl font-sami-bold text-left">Chats</h2>

            {/* Adopt a Cat toggle button */}
            <button
              onClick={() => {
                if (selectMode) {
                  setSelectMode(false);
                  setSelectedCats({});
                } else {
                  setSelectMode(true);
                }
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                selectMode
                  ? "bg-gray-700 text-white border-gray-700"
                  : "bg-gray-200 text-gray-800 border-gray-300"
              }`}
            >
              {selectMode ? "Cancel" : "Adopt a Cat"}
            </button>
          </div>

          {/* SELECTION MODE */}
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
                  onCheckToggle={toggleCheck}
                />
              ))}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleDone}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* NORMAL MODE */
            <div className="space-y-4">
              {/* Favorites */}
              <div className="border-b pb-3">
                <div
                  className="flex justify-between items-center cursor-pointer pl-10"
                  onClick={() => setShowFavorites(!showFavorites)}
                >
                  <p className="text-lg font-regular text-left">
                    Favorites ({favorites.length})
                  </p>
                  {showFavorites ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
                </div>
                {showFavorites && (
                  <div className="mt-3 space-y-3 ml-20">
                    {favorites.map((cat) => (
                      <ChatCard
                        key={cat}
                        catName={cat}
                        lastMessage="last message"
                        ownerName="owner's name"
                        address="address"
                        onClick={() => openChat(cat)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Active */}
              <div className="border-b pb-3">
                <div
                  className="flex justify-between items-center cursor-pointer pl-10"
                  onClick={() => setShowAll(!showAll)}
                >
                  <p className="text-lg font-regular text-left">
                    Active chats ({active.length})
                  </p>
                  {showAll ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
                </div>
                {showAll && (
                  <div className="mt-3 space-y-3 ml-20">
                    {active.map((cat) => (
                      <ChatCard
                        key={cat}
                        catName={cat}
                        lastMessage="last message"
                        ownerName="owner's name"
                        address="address"
                        onClick={() => openChat(cat)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Past */}
              <div className="border-b pb-3">
                <div
                  className="flex justify-between items-center cursor-pointer pl-10"
                  onClick={() => setShowActive(!showActive)}
                >
                  <p className="text-lg font-regular text-left">
                    Past chats ({past.length})
                  </p>
                  {showActive ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
                </div>
                {showActive && (
                  <div className="mt-3 space-y-3 ml-20">
                    {past.map((cat) => (
                      <ChatCard
                        key={cat}
                        catName={cat}
                        lastMessage="last message"
                        ownerName="owner's name"
                        address="address"
                        onClick={() => openChat(cat)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation (always) */}
      <NavBar/>
    </>
  );
};

export default ChatPage;
