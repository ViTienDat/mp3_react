import icons from "./icons";

const { MdOutlineLibraryMusic, FiDisc, PiMusicNotesPlusFill, GrLineChart } =
  icons;

export const sidebarMenu = [
  {
    path: "",
    text: "Khám Phá",
    end: true,
    icon: <FiDisc size="20.5px" />,
  },
  {
    path: "mymusic",
    text: "Thư Viện",
    icon: <MdOutlineLibraryMusic size="20.5px" />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icon: <GrLineChart size="20.5px" />,
  },
  {
    path: "moi-phat-hanh",
    text: "BXH Nhạc Mới",
    icon: <PiMusicNotesPlusFill size="20.5px" />,
  },
];
