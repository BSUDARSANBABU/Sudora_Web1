import React, { useState } from 'react';

export const MessagesPortalView: React.FC = () => {
  const [activeContact, setActiveContact] = useState('sarah');
  const [newMessageText, setNewMessageText] = useState('');
  const [chatToast, setChatToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setChatToast(msg);
    setTimeout(() => setChatToast(null), 3500);
  };
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Sarah Jenkins',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_ILVGmL3qR3AYCJgXhm8hEN4BBkoMQmDT8hRwbCjhhZl40cGsD9cf_6aqCtoW7X2nCG9rA7p34NSOuaOeSEhOK-JMs5uJEGwsYgsBVHym4ES6A-TDlAjSDeZDXnPu1xSG_D5MMV4LF5vPxrzzjxPqvsALDCfCG7HeAzc6wStxUQDQMM7rZP52Y6FVGIyFR3fQNn1hoTflct64m_-iRQLzcGFWWY11N0x0_ti73VQfwYFB2xdsbgHo',
      content: "Hi Alex, I've updated the specifications for the payment gateway integration. Could you take a look when you have a moment?",
      time: '10:15 AM',
      isMe: false,
      type: 'text'
    },
    {
      id: '2',
      sender: 'Sarah Jenkins',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8zcEP1bRrq3P6nnW0t0mmMed7MiX2tBwhrMHfeTbkETkcPHUHuiOtpc6XYm6Z6IWmVfrtSl9g3j1fAWnXHVQffwZjrJFzfAQXC_gDzH_zP_ZxYBnSwpqIt6wX-10wfDEabWJ3utQBs6xEcr_LyjsPlvMMJKORJXFPcHEl76QRTIiEvZR9jAqqRAMUaXNj4EG8jA6Un0bgCXjPVI0lh4Nknt4V4d5rJBIoc8jycIwNe5_PzSMBw5wB',
      fileName: 'design_specs_v2.pdf',
      fileSize: '2.4 MB • PDF Document',
      time: '10:18 AM',
      isMe: false,
      type: 'file'
    },
    {
      id: '3',
      sender: 'Alex Morgan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EXKM643O9Sh618UivgGr8Gh5e6dELofuX1r97cBEkRBpIdkeDeTNgGiGlJA_jWdLfuU12oJBcPl9o54zW4N3uNpaJlD7hmFqonVHKLrQUhPEMOzKJpRVpj2zq5RAwVieZQorOnvV-0_EX3VMqBHGtiImwe9XKa4z1VfirStGM1YYzIoPxxVIheFGv7yF-JOmQuha5MN9rqx3XuiYO2lpUsQMNw-NppV2V0XZRrsvlgbzlQtJpQhT',
      content: "Received! The API architecture looks robust. I'll review the security constraints and wire up the token authentication today.",
      time: '10:30 AM',
      isMe: true,
      type: 'text'
    },
    {
      id: '4',
      sender: 'system',
      avatar: '',
      title: 'Milestone 1: Core API Setup Completed',
      value: 'Contract value: $9,500 • Approved by Sarah Jenkins',
      time: '10:35 AM',
      isMe: false,
      type: 'milestone'
    },
    {
      id: '5',
      sender: 'Sarah Jenkins',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwwNI4D5Aed2YFGHXgmPD5rmnzt8TrE7JE5wYyHnrKqX0udfc4-rJuKrrKlEjd6sWzBUo41SaxW3FMeOublaMAWgFu4QBeXFGmrzk1apxNqXMx0Wsp5QeYr9aSA3kq-fgPp-u1CDtHRcGFG9JIVoY8DcawrcKWhXOeuE0m_HSmjZt9HR04IE_H8RLhwziK6j4kddho56c1BzebfkNPg1h6memosuwpUeCskFTCFigSanIN1Kg53Ecd',
      content: "I've reviewed the architecture diagram. Let's merge the branch.",
      time: '10:42 AM',
      isMe: false,
      type: 'text'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg = {
      id: String(Date.now()),
      sender: 'Alex Morgan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EXKM643O9Sh618UivgGr8Gh5e6dELofuX1r97cBEkRBpIdkeDeTNgGiGlJA_jWdLfuU12oJBcPl9o54zW4N3uNpaJlD7hmFqonVHKLrQUhPEMOzKJpRVpj2zq5RAwVieZQorOnvV-0_EX3VMqBHGtiImwe9XKa4z1VfirStGM1YYzIoPxxVIheFGv7yF-JOmQuha5MN9rqx3XuiYO2lpUsQMNw-NppV2V0XZRrsvlgbzlQtJpQhT',
      content: newMessageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text'
    };

    setMessages([...messages, newMsg]);
    setNewMessageText('');
  };

  return (
    <div className="flex h-[calc(100vh-73px)] overflow-hidden bg-surface w-full relative">
      {chatToast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{chatToast}</p>
        </div>
      )}
      {/* 1. Left Column: Conversations List */}
      <section className="w-80 lg:w-96 border-r border-outline-variant flex flex-col bg-surface-container-low shrink-0">
        <div className="p-4 border-b border-outline-variant flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-headline-sm font-bold text-on-surface">Messages</h1>
            <button
              onClick={() => showToast('Opening directory to start new client conversation thread...')}
              className="p-2 rounded-full bg-primary-container text-on-primary hover:opacity-90 transition-all flex items-center justify-center cursor-pointer shadow-xs"
              title="New message"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-base">
              search
            </span>
            <input
              className="w-full bg-surface text-on-surface pl-9 pr-4 py-2 rounded-lg border border-outline-variant text-body-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Search conversations..."
              type="text"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/40">
          {/* Conversation 1 (Active) */}
          <div
            onClick={() => setActiveContact('sarah')}
            className={`p-3.5 cursor-pointer flex gap-3 transition-all ${
              activeContact === 'sarah' ? 'bg-surface-container-high' : 'hover:bg-surface-container-high/60'
            }`}
          >
            <div className="relative shrink-0">
              <img
                className="w-12 h-12 rounded-full object-cover"
                alt="Sarah Jenkins"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWLmANtwlOdZMg9Zqu4jU60Op-tz5r6D2LtfegIUfSamnbkcv2DZqsvBJaT9KufyVlMaX_ZOdGp0Bq0yExoiJy-0pxrhUe9WNg6yCvqqiJ7lVAaPQtJxCCv7Q0qbrzSECt0FhEa7c8Q5jA1Gst7emETYyO-5pmi4AIJCthf9DSA57cdWXYkHon3H6kiAaG81MHFakE5nvGC46J-G0PX4jLGWeoH0wk6sXdsSSwb0YuEL0KsYCd7BWa"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-surface rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-label-md font-bold text-on-surface truncate">Sarah Jenkins</h3>
                <span className="text-label-sm text-outline">10:42 AM</span>
              </div>
              <p className="text-body-sm font-medium text-secondary truncate">NovaPay FinTech</p>
              <p className="text-body-sm text-on-surface-variant truncate">
                I've reviewed the architecture diagram. Let's merge the branch.
              </p>
            </div>
            <div className="flex flex-col items-end justify-center">
              <span className="w-5 h-5 bg-primary text-on-primary rounded-full text-label-sm flex items-center justify-center font-bold">
                2
              </span>
            </div>
          </div>

          {/* Conversation 2 */}
          <div
            onClick={() => setActiveContact('marcus')}
            className={`p-3.5 cursor-pointer flex gap-3 transition-all ${
              activeContact === 'marcus' ? 'bg-surface-container-high' : 'hover:bg-surface-container-high/60'
            }`}
          >
            <div className="relative shrink-0">
              <img
                className="w-12 h-12 rounded-full object-cover"
                alt="Marcus Vance"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy8mY0Ww-XcyeLcs1ggLB-bWOiqr_E9IoYuB_83IfOJHzqKNyPieU-HByaHcxKW3aa-OM-ZKMJMZ3k4xNtK7XXHZ_X_5ymEraPM4Xjc_HYrqSgtT7yeNkmXanONouAJnN7ECQM0iEbNYhpCX7VEshvc_wkXMc4gY7vhzrai8DZiGi8juKKauEkXA3k_OrLlp1qoJMUx-ul0GLZru1Q1IKgLrf-uljv1oSBy3YKSzRHhFklW3gUUuzs"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-surface rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-label-md font-bold text-on-surface truncate">Marcus Vance</h3>
                <span className="text-label-sm text-outline">Yesterday</span>
              </div>
              <p className="text-body-sm font-medium text-secondary truncate">Apex Global</p>
              <p className="text-body-sm text-on-surface-variant truncate">
                Payment milestone #2 has been successfully released.
              </p>
            </div>
          </div>

          {/* Conversation 3 */}
          <div
            onClick={() => setActiveContact('elena')}
            className={`p-3.5 cursor-pointer flex gap-3 transition-all ${
              activeContact === 'elena' ? 'bg-surface-container-high' : 'hover:bg-surface-container-high/60'
            }`}
          >
            <div className="relative shrink-0">
              <img
                className="w-12 h-12 rounded-full object-cover"
                alt="Elena Rostova"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt3tekJ63Nx58cjIrFdAYReLfuQhaI72lu_7Dhhj6R2_FwpKJRdDt4ooN0QGyYGPKXX1hF1O9JjxDtHHSNxNQbjLJyptz_e302g0kT3yNy547ScOCB0nsbhKkhPWV3zbNQmj45o1akWqkmQ8VF3LhbwrmKpcjuKvryAXrAG_WC_-a6zrHi4oG-H0XSLhteSSaOYzy4tl-o4z1bMWIBAJejyoc0D1eP701U_jbLrTopZVJWFBQsBxS3"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-outline border-2 border-surface rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-label-md font-bold text-on-surface truncate">Elena Rostova</h3>
                <span className="text-label-sm text-outline">Oct 14</span>
              </div>
              <p className="text-body-sm font-medium text-secondary truncate">CyberShield</p>
              <p className="text-body-sm text-on-surface-variant truncate">
                Can we schedule a quick sync on the compliance audit?
              </p>
            </div>
          </div>

          {/* Conversation 4 */}
          <div
            onClick={() => setActiveContact('david')}
            className={`p-3.5 cursor-pointer flex gap-3 transition-all ${
              activeContact === 'david' ? 'bg-surface-container-high' : 'hover:bg-surface-container-high/60'
            }`}
          >
            <div className="relative shrink-0">
              <img
                className="w-12 h-12 rounded-full object-cover"
                alt="David Kim"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA379miPXNzaDr2EQdm3wyCjxDpzGiuWj4dNq11HB6Rw_y8pUKI4LFtL7xFXC3xjm-UN7Fukb5nBwEkPNTCtca-SVY1C0AIq6fqq2eM4vR-GRWD5rENEk97gjzJjG5_upTA0r2uVPcreRz8QboRRIDLrc7Yhk-Z3KPvaQYU8SX8RwcyI7gGPvWuahlDdVqVgZZ0a5b3__HX34D1z2WIuanEKejFfxzpw74w8VFwkB0aMvzBPmtv6APz"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-outline border-2 border-surface rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-label-md font-bold text-on-surface truncate">David Kim</h3>
                <span className="text-label-sm text-outline">Oct 12</span>
              </div>
              <p className="text-body-sm font-medium text-secondary truncate">CloudScale Inc</p>
              <p className="text-body-sm text-on-surface-variant truncate">
                Thanks for the quick turnaround on the bug fix!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Middle Column: Active Chat Thread */}
      <section className="flex-1 flex flex-col bg-surface-container-lowest min-w-0">
        {/* Chat Header */}
        <div className="px-6 py-3.5 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full object-cover"
                alt="Sarah Jenkins"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGUcIFJ0KhXFZKCz-CbU7Hw5VZzu-PN7ybzIwdl_jDQGyhOgNr3uMacYItms7ZxFk5H8g57s8ZAUD7-ba1GEhmPFFvW56WShePbQBs_Qp8xx2LSShitq8m1nLmqC4hqzU15qMHulakQclybqC3H4D-599k-XNwchxKeQRPwE9stRFW3tStNBPCgX3Bg51odSl8Xt5CAJT9jNaOmkSh46X5BSH6t2PHpcX1GubAPEF136tFr1sIKEw9"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-surface rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-label-md font-bold text-on-surface text-base">Sarah Jenkins</h2>
                <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-label-sm rounded-full font-medium">
                  NovaPay FinTech
                </span>
              </div>
              <div className="text-label-sm text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => showToast('Encrypted VoIP audio call connecting to Sarah Jenkins...')}
              className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-all cursor-pointer"
              title="Start Audio Call"
            >
              <span className="material-symbols-outlined">call</span>
            </button>
            <button
              onClick={() => showToast('Secure WebRTC video conference room launching...')}
              className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-all cursor-pointer"
              title="Start Video Call"
            >
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button
              onClick={() => showToast('Conversation options: End-to-end encrypted, Export transcript saved.')}
              className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-all cursor-pointer"
              title="More Options"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface">
          <div className="text-center my-2">
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-label-sm rounded-full font-medium">
              Today
            </span>
          </div>

          {messages.map((m) => {
            if (m.type === 'milestone') {
              return (
                <div
                  key={m.id}
                  className="my-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">task_alt</span>
                    </div>
                    <div>
                      <h4 className="font-label-md font-bold text-on-surface">{m.title}</h4>
                      <p className="text-body-sm text-on-surface-variant">{m.value}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-label-sm rounded-full font-medium">
                    Completed
                  </span>
                </div>
              );
            }

            if (m.type === 'file') {
              return (
                <div key={m.id} className="flex items-end gap-3 max-w-xl">
                  <img
                    className="w-8 h-8 rounded-full object-cover shrink-0 mb-1"
                    alt={m.sender}
                    src={m.avatar}
                  />
                  <div className="space-y-2">
                    <div className="bg-surface-container-high text-on-surface p-3 rounded-xl rounded-bl-sm text-body-md shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-label-md font-bold text-on-surface truncate">{m.fileName}</h4>
                        <p className="text-label-sm text-outline">{m.fileSize}</p>
                      </div>
                      <button
                        onClick={() => showToast('Downloading design_specs_v2.pdf to local downloads folder...')}
                        className="p-2 hover:bg-surface-variant rounded-lg text-primary transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </div>
                    <span className="text-label-sm text-outline block">{m.time}</span>
                  </div>
                </div>
              );
            }

            if (m.isMe) {
              return (
                <div key={m.id} className="flex items-end justify-end gap-3 max-w-xl ml-auto">
                  <div>
                    <div className="bg-primary-container text-on-primary px-4 py-3 rounded-xl rounded-br-sm text-body-md shadow-sm">
                      {m.content}
                    </div>
                    <span className="text-label-sm text-outline mt-1 block text-right">{m.time}</span>
                  </div>
                  <img
                    className="w-8 h-8 rounded-full object-cover shrink-0 mb-1"
                    alt={m.sender}
                    src={m.avatar}
                  />
                </div>
              );
            }

            return (
              <div key={m.id} className="flex items-end gap-3 max-w-xl">
                <img
                  className="w-8 h-8 rounded-full object-cover shrink-0 mb-1"
                  alt={m.sender}
                  src={m.avatar}
                />
                <div>
                  <div className="bg-surface-container-high text-on-surface px-4 py-3 rounded-xl rounded-bl-sm text-body-md shadow-sm">
                    {m.content}
                  </div>
                  <span className="text-label-sm text-outline mt-1 block">{m.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Input Bar */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-lowest">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-surface-container-low rounded-xl p-2 border border-outline-variant focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
            <button
              type="button"
              onClick={() => showToast('Secure file picker ready: PDF, ZIP, image attachments supported.')}
              className="p-2 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-surface-variant cursor-pointer"
              title="Attach File"
            >
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <button
              type="button"
              onClick={() => setNewMessageText((prev) => prev + ' 👍')}
              className="p-2 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-surface-variant cursor-pointer"
              title="Add Emoji"
            >
              <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
            <input
              className="flex-1 bg-transparent border-none text-on-surface text-body-md focus:outline-none px-2"
              placeholder="Type a message..."
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md font-bold flex items-center gap-2 hover:opacity-95 transition-all shadow-sm cursor-pointer"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      </section>

      {/* 3. Right Column: Details & Context */}
      <aside className="w-80 lg:w-96 border-l border-outline-variant bg-surface-container-low flex flex-col overflow-y-auto shrink-0 hidden xl:flex">
        <div className="p-6 border-b border-outline-variant text-center">
          <img
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3 shadow-md"
            alt="Sarah Jenkins"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDONXOYH_ZPxtr7QU3jPrccJWbXBlm1G3nwvOJ-EJs0hBMfGmFRU_AAx-3xQe1RB7NlZJ31Z78ToGn8BT2lU4_cr4OtI28cd2ITLj9-lhKHZoaf1XHsYrzhItNGObz4_UCGm-gmuJTUsYx7QY78gR2bjmO_81KiS68ETPRolEbj9UENbsGpy-A503wTNPHtiGKEfiPIM4IhhRJ0-_zDJTGi9iURwHzoEfZB8op0Pd_EROOFxeoCgigG"
          />
          <h2 className="font-headline-sm font-bold text-on-surface">Sarah Jenkins</h2>
          <p className="text-body-sm text-secondary font-medium">Product Director at NovaPay FinTech</p>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => showToast('Opening Sarah Jenkins public corporate client profile.')}
              className="px-3 py-1.5 bg-surface-container-high text-on-surface rounded-lg text-label-md font-medium hover:bg-surface-variant transition-all cursor-pointer"
            >
              View Profile
            </button>
            <button
              onClick={() => showToast('Contract #NP-8824: Active with $28,500 total escrow budget.')}
              className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-label-md font-medium hover:opacity-90 transition-all cursor-pointer"
            >
              Contract Details
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Active Project Context Card */}
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-label-sm font-bold rounded-md">
                Active Project
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface text-base">
                NextGen Core Banking API
              </h3>
              <p className="text-body-sm text-on-surface-variant mt-1">
                High-performance payment integration &amp; secure transaction ledger.
              </p>
            </div>
            <div className="pt-2 border-t border-outline-variant/60 grid grid-cols-2 gap-4 text-body-sm">
              <div>
                <span className="text-outline block text-label-sm">Contract Value</span>
                <span className="font-bold text-on-surface">$28,500</span>
              </div>
              <div>
                <span className="text-outline block text-label-sm">Deadline</span>
                <span className="font-bold text-on-surface">Nov 30, 2025</span>
              </div>
            </div>
          </div>

          {/* Shared Files / Deliverables list */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-label-md font-bold text-on-surface">Shared Deliverables</h3>
              <span className="text-label-sm text-primary font-medium cursor-pointer hover:underline">
                View All
              </span>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">description</span>
                  <div className="min-w-0">
                    <h4 className="font-label-md font-bold text-on-surface truncate">design_specs_v2.pdf</h4>
                    <span className="text-label-sm text-outline">Uploaded Today</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">code</span>
                  <div className="min-w-0">
                    <h4 className="font-label-md font-bold text-on-surface truncate">api_endpoints_draft.yaml</h4>
                    <span className="text-label-sm text-outline">Oct 12, 2025</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600">security</span>
                  <div className="min-w-0">
                    <h4 className="font-label-md font-bold text-on-surface truncate">security_compliance_audit.docx</h4>
                    <span className="text-label-sm text-outline">Oct 05, 2025</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
