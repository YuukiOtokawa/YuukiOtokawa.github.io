
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
    ProfileImage: "assets/profile-smile.jpg",
    OtokawaEngineCard: "assets/ProjectCard/EngineThumbnail.png",
    AsteroidEngineCard: "projects/AsteroidEngine/Assets/AsteroidEngine_Thumbnail.png",
    Project2Card: "assets/ProjectCard/DogThumbnail.png",
    TeamworkCard: "assets/ProjectCard/Default_White.png",
    Project5Card: "projects/YokaiTantei/Assets/YoukaiTitle.png",
    KemariOnmyoujiCard: "assets/ProjectCard/KemariThumbnail.jpg",
}

const links = {
    OtokawaEngineDetail: "projects/OtokawaEngine.html",
    GitHub: "https://github.com/YuukiOtokawa",
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
                "GitHub",
                "プログラム",
                "C++",
                "DirectX11",
            ],
        },
        {
            title: "AsteroidEngine",
            pageLink: "projects/AsteroidEngine/AsteroidEngine.html",
            cardThumbnail: images.AsteroidEngineCard,
            detail: "OtokawaEngineの経験をもとに制作したDirectX12ベースのカスタムゲームエンジン",
            features: [
                "ゲームエンジン",
                "GitHub",
                "プログラム",
                "C++",
                "DirectX12",
            ],
        },
        {
            title: "祓魔犬",
            pageLink: "projects/Futsumaken/Futsumaken.html",
            cardThumbnail: images.Project2Card,
            detail: "2年の進級制作で制作した2Dアクションゲーム",
            features: [
                "チーム制作",
                "進行管理",
                "GitHub",
                "プログラム",
                "C++",
                "DirectX11",
            ],
        },
        {
            title: "妖怪探偵",
            pageLink: "projects/YokaiTantei/YokaiTantei.html",
            cardThumbnail: images.Project5Card,
            detail: "3年の夏休みから制作したアドベンチャーゲーム",
            features: [
                "チーム制作",
                "プログラム",
                "リポジトリ管理",
                "Unity",
            ],
        },
        {
            title: "蹴鞠陰陽師",
            pageLink: "projects/KemariOnmyouji/KemariOnmyouji.html",
            cardThumbnail: images.KemariOnmyoujiCard,
            detail: "現在制作中のゲームプロジェクトです。詳細は準備中です。",
            features: [
                "プログラム",
                "制作中",
            ],
        },
        {
            title: "チーム開発・進行管理",
            pageLink: "projects/Teamwork/Teamwork.html",
            cardThumbnail: images.TeamworkCard,
            detail: "FormulaXTacticsとハコポス!!!で培った、仕様設計・進行管理・リポジトリ管理の経験",
            features: [
                "チーム制作",
                "進行管理",
                "リポジトリ管理",
                "GitHub",
            ],
        },

    ]
}


