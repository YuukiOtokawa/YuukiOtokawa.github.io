
const contentProperty = {
    character: "#000000",
    background: "#aaaaaa",
    cardWidth: "350px",
    cardBackground: "#dddddd",
    cardBorder: "1px solid #30363d",
    cardBorderRadius: "12px",
    hoveredCardBorder: "3px solid #1f6feb",

    h1FontSize: "3em",
    h2FontSize: "2.5em",
    h3FontSize: "1.5em",

}

const images = {
    ProfileImage: "assets/profile-image.jpg",
    OtokawaEngineCard: "assets/ProjectCard/EngineThumbnail.png",
    Project2Card: "assets/ProjectCard/DogThumbnail.png",
    Project3Card: "assets/ThisIsPicture.png",
    Project4Card: "assets/ProjectCard/HAKOPOSThumbnail.png",
    Project5Card: "assets/ThisIsPicture.png",
}

const links = {
    OtokawaEngineDetail: "projects/OtokawaEngine.html",
    OtokawaEngineRepo: "",
    GitHub: "",
    Email: "yuukiotokawa.2002@gmail.com",

}

const profile = {
    name: "音川 優樹",
    at: "HAL東京 昼間部4年制課程 ゲーム4年制学科 ゲーム製作コース",
    lang: "プログラミング言語: C, C++, C#",
    engine: "ゲームエンジン: Unity, Unreal Engine",
    tool: "ツール: Git",
}

const projectCardData = {
    projects: [
        {
            title: "OtokawaEngine",
            pageLink: "projects/OtokawaEngine/OtokawaEngine.html",
            cardThumbnail: images.OtokawaEngineCard,
            detail: "DirectX11ベースのカスタムゲームエンジン",
            features: [
                "ゲームエンジン",
                "プログラム",
                "C++",
                "DirectX11",
            ],
        },
        {
            title: "祓魔犬(ページ制作中)",
            pageLink: "#",
            cardThumbnail: images.Project2Card,
            detail: "2年の進級制作で制作した2Dアクションゲーム",
            features: [
                "チーム制作",
                "進行管理",
                "プログラム",
                "C++",
                "DirectX11",
            ],
        },
        {
            title: "FormulaXTactics(ページ制作中)",
            pageLink: "#",
            cardThumbnail: images.Project3Card,
            detail: "3年の制作演習で制作したターン制カードゲーム",
            features: [
                "チーム制作",
                "進行管理",
                "Unity",
            ],
        },
        {
            title: "ハコポス!!!(ページ制作中)",
            pageLink: "#",
            cardThumbnail: images.Project4Card,
            detail: "2年にチームを組んで制作した落ちものパズルゲーム",
            features: [
                "チーム制作",
                "リポジトリ管理(GitHub)",
                "Unity",
            ],
        },
        {
            title: "妖怪探偵(ページ制作中)",
            pageLink: "#",
            cardThumbnail: images.Project5Card,
            detail: "3年の夏休みから制作したアドベンチャーゲーム",
            features: [
                "チーム制作",
                "プログラム",
                "リポジトリ管理(GitHub)",
                "Unity",
            ],
        },

    ]
}


