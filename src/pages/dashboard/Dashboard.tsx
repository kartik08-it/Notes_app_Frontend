import { useNavigate } from "react-router-dom";
import { PlusIcon, GridIcon, ListIcon, MoreIcon, EditIcon, PinIcon, FileArchiveIcon, ShareIcon, DownloadIcon, TrashIcon } from "../../components/icons/icons";
import { useState, useEffect, useContext } from "react";
import { NavbarContext } from "../../components/layout/Layout/layout";

const notes = [
    {
        title: "Learning Goals 2025",
        desc: "Advanced React patterns, TypeScript mastery, System design and cloud architecture.",
        tags: ["learning", "goals", "tech"],
        date: "Jan 20",
        color: "border-blue-400",
    },
    {
        title: "Project Ideas for Q2",
        desc: "Mobile redesign, feedback portal, analytics dashboard v2.",
        tags: ["work", "planning", "important"],
        date: "Jan 20",
        color: "border-yellow-400",
    },
    {
        title: "Meeting Notes - Design Review",
        desc: "Decisions approved. Timeline extended by 2 weeks.",
        tags: ["meetings", "design"],
        date: "Jan 18",
        color: "border-indigo-400",
    },
    {
        title: "Shopping List",
        desc: "Milk, Eggs, Bread, Vegetables, Chicken, Rice.",
        tags: ["personal", "shopping"],
        date: "Jan 22",
        color: "border-green-400",
    },
    {
        title: "Travel Plans - Summer 2025",
        desc: "Tokyo (2 weeks), Barcelona (1 week), Cherry blossoms.",
        tags: ["travel", "planning"],
        date: "Jan 21",
        color: "border-purple-400",
    },
    {
        title: "Book Recommendations",
        desc: "The Midnight Library, Atomic Habits, Project Hail Mary.",
        tags: ["books", "reading"],
        date: "Jan 19",
        color: "border-red-400",
    },
];

const Dashboard = () => {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const navigate = useNavigate();
    const setNavbar = useContext(NavbarContext);

    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenu(null);
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        setNavbar({
            showSearch: true,
            actionButton: (
                <button
                    onClick={() => navigate("/notes/new")}
                    className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
                >
                    <PlusIcon size={16} />
                    New Note
                </button>
            ),
        });

        return () => setNavbar({});
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Main Layout */}
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r min-h-[calc(100vh-72px)] p-6">
                    <p className="text-xs text-gray-400 mb-4 uppercase">Views</p>

                    <div className="space-y-2">
                        <div className="bg-orange-100 text-orange-600 px-3 py-2 rounded-lg font-medium cursor-pointer">
                            All Notes
                        </div>
                        <div className=" text-gray-400 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer " >
                            Pinned
                        </div>
                        <div className="text-gray-400 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            Archived
                        </div>
                        <div className="text-gray-400 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            Trash
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 mt-8 mb-4 uppercase">Tags</p>

                    <div className="flex flex-wrap gap-2">
                        {["work", "personal", "important", "planning", "design", "learning"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="text-gray-400 text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-orange-100 hover:text-orange-600 cursor-pointer transition"
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                </aside>

                {/* Notes Section */}
                <main className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                All Notes
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {notes.length} notes
                            </p>
                        </div>

                        <div className="flex gap-3 text-gray-500">
                            <GridIcon
                                onClick={() => setView("grid")}
                                className={`cursor-pointer transition ${view === "grid" ? "text-orange-500" : "hover:text-orange-500"}`}
                            />
                            <ListIcon
                                onClick={() => setView("list")}
                                className={`cursor-pointer transition ${view === "list" ? "text-orange-500" : "hover:text-orange-500"}`}
                            />
                        </div>
                    </div>

                    <div
                        className={
                            view === "grid"
                                ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "flex flex-col gap-4"
                        }
                    >
                        {notes.map((note, index) => (
                            <div
                                key={index}
                                className={`relative w-full bg-white p-5 rounded-xl shadow-sm border-l-4 ${note.color
                                    } hover:shadow-md transition ${view === "list" ? "flex justify-between items-start" : ""
                                    }`}
                            >
                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        {note.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-3">
                                        {note.desc}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {note.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-xs text-gray-400">
                                        {note.date}
                                    </p>
                                </div>

                                {/* Three Dots Button */}
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenu(openMenu === index ? null : index);
                                        }}
                                        className="p-1 rounded-md transition"
                                    >
                                        <MoreIcon size={18} className="text-black" />
                                    </button>

                                    {openMenu === index && (
                                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                                            <ul className="text-sm text-gray-700 py-2">

                                                <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                                                    <EditIcon size={16} className="text-gray-500" />
                                                    <span>Edit</span>
                                                </li>

                                                <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                                                    <PinIcon size={16} className="text-gray-500" />
                                                    <span>Pin / Unpin</span>
                                                </li>

                                                <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                                                    <FileArchiveIcon size={16} className="text-gray-500" />
                                                    <span>Archive</span>
                                                </li>

                                                <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                                                    <ShareIcon size={16} className="text-gray-500" />
                                                    <span>Share</span>
                                                </li>

                                                <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                                                    <DownloadIcon size={16} className="text-gray-500" />
                                                    <span>Export as Markdown</span>
                                                </li>

                                                {/* Separator */}
                                                <div className="my-2 border-t border-gray-200" />

                                                <li className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer transition">
                                                    <TrashIcon size={16} />
                                                    <span>Move to Trash</span>
                                                </li>

                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;